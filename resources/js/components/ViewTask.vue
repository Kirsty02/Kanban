<template>
    <div class="grey-box" v-if="activeTask" @click=setActiveTask(null)> </div>
  
    <div class="view-task-modal">

      <div class="add-edit-board-container" v-if="activeTask">
        <div class="side-flex">
            <h2 class="heading-l"> {{ activeTask.title }}</h2>
            <img src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon">
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
            <label class="body-m" for="status-select">Status</label>
            <select v-model="selectedColumn" @change="onChangeColumn">
                <option v-for="column in columns" :key="column.column_id" :value="column.column_id">
                    {{ column.name }}
                </option>
            </select>
        </div>
    </div>

    </div>
    
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import axios from 'axios';

  export default {
    data() {
        return {
            selectedStatus: null, 
            selectedColumn: null,
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
        console.log("Active task:", this.activeTask);
        console.log("Active task's board ID:", this.activeTask?.board_id);
        console.log("Boards from Vuex:", this.$store.state.boards)
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
    methods:{
      ...mapActions(['setActiveTask']),
      updateSubtask(subtask) {
            this.$store.dispatch('updateSubtask', { ...subtask, isCompleted: !subtask.isCompleted });
      },
      onChangeColumn() {
        if (this.activeTask && this.selectedColumn) {
            this.$store.dispatch('updateTaskColumn', {
                taskId: this.activeTask.task_id,
                columnId: this.selectedColumn
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
    watch: {
      activeTask(newTask, oldTask) {
          if (newTask && newTask !== oldTask) {
            this.selectedColumn = newTask.column_id;
          }
        },
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
}

.subtask-item input[type="checkbox"] {
  margin-right: 10px;
}

.subtask-item input[type="checkbox"]:checked + label {
text-decoration: line-through;
color: #aaa;
}

.view-task-modal {
    position: fixed; /* Fixed position */
    top: 50%; /* Center vertically */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Adjust to exact center */
    z-index: 999; /* Make sure it's above other elements */
    /* Add more styling as needed */
}

.grey-box{
    position: absolute;
    top: -96px;
    left: -300px;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 998;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
</style>