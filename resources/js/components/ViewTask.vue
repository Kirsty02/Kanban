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
                <li v-for="subtask in subtasks" :key="subtask.task_id" class="subtask-item">
                    <input type="checkbox" :id="`subtask-${subtask.task_id}`" v-model="subtask.completed">
                    <label class="body-l" :for="`subtask-${subtask.task_id}`">{{ subtask.title }}</label>
                </li>
            </ul>
        </div>
        <div class="form-group">
            <label class="body-m" for="status-select">Status</label>
            <select  id="status-select" v-model="selectedStatus" class="status-select body-l">
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
            </select>
        </div>
    </div>

    </div>
    
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';

  export default {

    data() {
      return {
        selectedStatus: 'doing',
      };
    },
    computed: {
      ...mapGetters(['activeTask', 'subtasks']),
      completedSubtasksCount() {
          return this.subtasks.filter(subtask => subtask.isCompleted).length;
      },
      totalSubtasksCount() {
          return this.subtasks.length;
      },
      
      
    },
    methods:{
      ...mapActions(['setActiveTask']),
    }
    
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