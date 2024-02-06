<template>
    <div class="grey-box" @click=toggleViewTask> </div>
    <div class="view-widget-modal">
      <div class="add-edit-board-container">
        <div class="side-flex space-bottom">
            <h2 class="heading-l"> {{ activeTask.title }}</h2>
            <img @click="dropdownVisible=true" src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon">
        </div>
        <p class="body-l form-group description"> {{ activeTask.description }}</p>
  
        <div class="form-group">
            <div class="subtask-header"><p class="body-m">Subtasks ({{ completedSubtasksCount }} of {{ totalSubtasksCount }})</p></div>
            <ul class="subtasks-list">
              <li v-for="subtask in activeTaskSubtasks" :key="subtask.subtask_id" class="subtask-item">
                  <input type="checkbox" :id="`subtask-${subtask.subtask_id}`" v-model="subtask.isCompleted" @change="updateSubtask(subtask)">
                  <label :for="`subtask-${subtask.subtask_id}`">{{ subtask.title }}</label>
              </li>
          </ul>
        </div>
        <div class="form-group">
            <label class="body-m" for="status-select" >Status</label>
            <select v-model="selectedColumn"  @change="onChangeColumn(activeTask.column_id)" class="column-drop">
                <option v-for="column in columns" :key="column.column_id" :value="column.column_id">
                    {{ column.name }}
                </option>
            </select>
        </div>
    </div>
    </div>
    <div v-if="dropdownVisible"> 
      <div class="drop-down-conatiner-task"> 
        <p class="body-l edit-p" @click="toggleEditTask(), dropdownVisible=false, toggleViewTask()"> Edit Task</p>
        <p class="body-l delete-p" > Delete Task</p>
      </div>
    </div>
    
  </template>
  
  <script>
  import { mapGetters, mapActions, mapMutations } from 'vuex';
  import axios from 'axios';

  export default {
    emits: ['columnChanged'],
  
    data() {
        return {
            selectedColumn: null,
            dropdownVisible: false,
        };
    },
    computed: {
      ...mapGetters(['activeTask', 'subtasks']),
      activeTaskSubtasks() {
        return this.activeTask ? this.activeTask.subtasks : [];
      },
      completedSubtasksCount() {
        return this.activeTaskSubtasks.filter(subtask => subtask.isCompleted).length;
      },
      totalSubtasksCount() {
        return this.activeTaskSubtasks.length;
      },
      taskCompleted() {
        return this.completedSubtasksCount === this.totalSubtasksCount && this.totalSubtasksCount > 0;
      },
      columns() {
        if (this.activeTask) {
            const board = this.$store.state.boards.find(b => b.board_id === this.activeTask.board_id);
            console.log("Found board:", board); 
            return board ? board.columns : [];
        }
        return [];
      },
      
      activeTask() {
        return this.$store.state.activeTask;
      },
    },
    watch: {
    activeTask(newTask, oldTask) {
      if (newTask) {
        this.selectedColumn = newTask.column_id;
      }
    },
      activeTask(newTask, oldTask) {
          if (newTask && newTask !== oldTask) {
            this.selectedColumn = newTask.column_id;
          }
      },
    },
    methods:{
      ...mapActions(['setActiveTask','fetchBoards']),
      ...mapMutations(['toggleEditTask', 'toggleViewTask']),
      updateSubtask(subtask) {
        console.log('Updating subtask:', subtask);
        this.$store.dispatch('updateSubtask', { ...subtask, isCompleted: !subtask.isCompleted, title: subtask.title });
      },
      onChangeColumn() {
          if (this.activeTask && this.selectedColumn) {
            this.$store.dispatch('updateTaskColumn', {
              taskId: this.activeTask.task_id,
              columnId: this.selectedColumn
            }).then(() => {
              this.$emit('columnChanged');
              console.log('Column change dispatched');
            }).catch(error => {
              console.error('Failed to change column:', error);
            });
          }
        },
      },
      mounted(){
      this.$store.dispatch('fetchBoards');
      console.log("Active task hre:", this.activeTask);
      if (this.activeTask) {
        this.selectedColumn = this.activeTask.column_id;
      }
    },
  
 
    };  
  
  </script>
  
  <style lang="scss">
  @import '../../sass/variables';

  .subtask-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.subtasks-list {
  list-style-type: none;
  padding: 0;
}

.subtask-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: $white-dark;
  border-radius: 8px;
  padding-left: 10px;
  font-weight: bolder;
}

.subtask-item input[type="checkbox"] {
  margin-right: 10px;
}

.subtask-item input[type="checkbox"]:checked + label {
text-decoration: line-through;
color: #aaa;
}

.space-bottom{
  margin-bottom: 1rem;
}

.column-drop{
  width: 100%;
  padding: 5px;
  padding-right: 10px;
  border-radius:8px;
}


.drop-down-conatiner-task{
    position: absolute;
    right: 11rem;
    top: 7rem;
    border-radius: 8px;
    width: 128px;
    height: 62px;
    padding: 16px;
    background-color: $white-light;
    z-index: 999;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

</style>