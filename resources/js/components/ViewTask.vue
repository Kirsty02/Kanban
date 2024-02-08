<template>
    <div class="grey-box" @click="toggleViewTask(), refreshBoardData()"> </div>
    
    <div class="view-widget-modal">
      <div :class="['add-edit-board-container', isDarkMode ? 'add-edit-board-container-dark' : '']" >
        <div class="side-flex space-bottom">
            <h2 class="heading-l"> {{ activeTask?.title }}</h2>
            <img @click="toggleTaskDropdown" src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon" class="drop-btn">
        </div>
        <div v-if="isTaskDropdownVisible"> 
          <div :class="['drop-down-conatiner-task', isDarkMode ? 'drop-down-conatiner-task-dark' : '']"> 
            <p class=" edit-p" @click="toggleEditTask(), toggleTaskDropdown, toggleViewTask()"> Edit Task</p>
            <p class=" delete-p"  @click="showDeleteConfirmation=true" > Delete Task</p>
          </div>
        </div>
        <p class="body-l form-group description"> {{ activeTask?.description }}</p>
  
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
            <select v-model="selectedColumn" @change="updateTaskColumn" class="status-select body-l">
                <option disabled value="" selected v-if="!selectedColumn">
                  {{ activeTask.status }}
                </option>
                <option v-for="column in columns" :key="column.column_id" :value="column.column_id">
                    {{ column.name }}
                </option>
            </select>
        </div>
    </div>
    </div>
    
    <div v-if="showDeleteConfirmation"> 
    <div class="grey-box higher"  @click="showDeleteConfirmation = false"></div>
    <div class="view-widget-modal"> 
        <div class="delete-container">
            <h2 class="heading-l">Delete this Task?</h2>
            <p class="body-l"> 
                Are you sure you want to delete the '{{ activeTask.title || '' }}' Task? This action will remove all subtasks within the task and cannot be reversed.
            </p>
            <div class="button-bottom-flex"> 
                <button class="btn-destructive" @click="deleteActiveTask(activeTask)"> Delete</button>
                <button class="btn-secondary" @click="showDeleteConfirmation = false"> Cancel</button>
            </div>
        </div>
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
            showDeleteConfirmation: false,
        };
    },
    computed: {
      ...mapGetters(['activeTask', 'subtasks', 'isDarkMode', 'isTaskDropdownVisible', 'activeBoard', 'boards']),
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
      ...mapActions(['setActiveTask','fetchBoards', 'setActiveBoard', 'refreshBoardData']),
      ...mapMutations(['toggleEditTask', 'toggleViewTask', 'toggleTaskDropdown']),
      deleteActiveTask(activeTask) {
            if (this.activeTask && this.activeTask.task_id) {
                this.$store.dispatch('deleteTask', this.activeTask.task_id)
                    .then(() => {
                        this.fetchBoards();
                        this.showDeleteConfirmation = false;
                        this.setActiveTask(null);
                        this.fetchBoards(); 
                        this.toggleViewTask();
                    });
            }
      },
      updateSubtask(subtask) {
        console.log('Updating subtask:', subtask);
        this.$store.dispatch('updateSubtask', { ...subtask, isCompleted: !subtask.isCompleted, title: subtask.title });
      },
      updateTaskColumn() {
        
        if (this.activeTask && this.selectedColumn) {
          const updatedTaskData = {
            taskId: this.activeTask.task_id,
            columnId: this.selectedColumn,
         
            status: this.columns.find(column => column.column_id === this.selectedColumn)?.name,
          };

          console.log('Dispatching updateTaskColumn with:', updatedTaskData);
          this.$store.dispatch('updateTaskColumn', updatedTaskData)
            .then(() => {
              console.log('Task update dispatched successfully.');
              this.refreshBoardData();
            })
            .catch(error => {
              console.error('Error updating task column:', error);
            });
        } else {
          console.error('Active task or selected column not properly set.');
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
  padding: 0px;

}

.subtask-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: $white-dark;
  border-radius: 5px;
  font-weight: bold;
  width: 100%;
  padding: 5px;
  padding-left: 10px;
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
    top: 4rem;
    right: 0rem;
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
.drop-down-conatiner-task-dark{
    background-color: $platinum-darkest;
}

.drop-btn:hover{
  cursor: pointer;
}



</style>