<template>
  <div class="grey-box"  @click="toggleEditTask" > </div>
  <div class="view-widget-modal"> 
    <div class="add-edit-board-container">
      <h2 class="heading-l">Edit Task</h2>
      <form @submit.prevent="submitTaskUpdate">
        <div class="form-group">
          <label for="taskName"><p class="body-m">Title</p></label>
          <input class="body-l" type="text" id="TaskName" v-model="task.title" required :placeholder="activeTask.title">
        </div>
        <div class="form-group">
            <label class="body-m" for="description">Description</label>
            <textarea class="description body-l"  id="description" rows="4"  v-model="task.description" 
            :placeholder="activeTask.description"
            ></textarea>
        </div>
        <div class="form-group">
          <label><p class="body-m">Subtasks</p></label>
          <div v-for="(subtask, index) in task.subtasks" :key="index" class="subtasks">
            <input class="body-l" type="text" v-model="subtask.title" required>
            <img @click="removeSubtask(index)" src="/assets/icon-cross.svg" alt="delete subtask">
          </div>
          <button class="btn-secondary" type="button" @click="addSubtask">+ Add New Subtask</button>
        </div>
        <button class="btn-primary-s" type="submit">Save Changes</button>
      </form>
    </div>
  </div>
  </template>
  
<script>
import axios from 'axios';
import { mapMutations, mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        selectedStatus: '',
        task: {
          title: '',
          subtasks: [],
          description: '',
          status: '',
        },
        showDeleteConfirmation: false,
        subtaskIndexToDelete: null,

      };
    },
    computed: {
      ...mapGetters(['activeTask']),
      columns() {
        if (this.activeTask) {
            const board = this.$store.state.boards.find(b => b.board_id === this.activeTask.board_id);
            console.log("Found board:", board); 
            return board ? board.columns : [];
        }
        return [];
      },
    },
    watch: {
      activeTask(newTask, oldTask) {
        if (newTask) {
          this.selectedStatus = newTask.column_id;
        }
      } ,
    },
    methods: {
      ...mapActions(['updateTask', 'fetchBoards', 'setActiveTask']),
      ...mapMutations(['toggleEditTask', 'toggleViewTask']),
      addSubtask() {
        this.task.subtasks.push({ name: '' });
      },
      updateSubtask(subtask) {
        console.log('Updating subtask:', subtask);
        this.$store.dispatch('updateSubtask', { ...subtask, isCompleted: !subtask.isCompleted, title: subtask.title });
      },
      onChangeColumn() {
          if (this.activeTask && this.selectedStatus) {
            this.$store.dispatch('updateTaskColumn', {
              taskId: this.activeTask.task_id,
              columnId: this.selectedStatus
            }).then(() => {
              this.$emit('columnChanged');
              console.log('Column change dispatched');
            }).catch(error => {
              console.error('Failed to change column:', error);
            });
          }
        },
      prepareSubtaskDeletion(index) {
        this.showDeleteConfirmation = true;
        this.subtaskIndexToDelete = index;
      },
      deleteActiveSubtask() {
        const subtaskId = this.task.subtasks[this.subtaskIndexToDelete].subtask_id;
        axios.delete(`/api/subtasks/${subtaskId}`)
        .then(() => {
            this.task.subtasks.splice(this.subtaskIndexToDelete, 1);
            this.showDeleteConfirmation = false;
            this.subtaskindexToDelete = null;
                })
                .catch(error => {
                    console.error('Error deleting subtask:', error);
                });
      },
      removeSubtask(index) {
        this.task.subtasks.splice(index, 1);
      },
    },
    async submitTaskUpdate() {
        this.updateTask(this.task)
          .then(() => {
            //new subtasks
            let newSubtaskPromises = this.task.subtasks
              .filter(subtask => !subtask.subtask_id)
              .map(newSubtask => {
                return axios.post('/api/subtasks', {
                  title: newSubtask.title,
                  task_id: this.task.task_id,
                });
              });

            //existing subtasks
            let updateTaskPromises = this.task.subtasks
              .filter(subtask => subtask.subtask_id)
              .map(existingsubtask => {
                return axios.patch(`/api/subtasks/${existingsubtask.subtask_id}`, { title: existingsubtask.title });
              });

            return Promise.all([...newSubtaskPromises, ...updateSubtaskPromises]);
          })
          .then(() => {
            this.fetchBoards();
            this.toggleEditTask();
          })
          .catch(error => {
            console.error('Error updating task or subtasks:', error);
          });
        },

      
  created(){
      if (this.activeTask){
        this.task = { ...this.activeTask};
        this.selectedStatus = this.activeTask.status;
      }
    },
};
  </script>
  
  <style lang="scss">
  @import '../../sass/variables';


  </style>