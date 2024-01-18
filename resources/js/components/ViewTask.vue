<template>
    <div class="grey-box" v-if="activeTask" @click="!activeTask"> </div>
  
    <div class="view-task-modal">

      <div class="add-edit-board-container" v-if="activeTask">
        <div class="side-flex">
            <h2 class="heading-l">Research pricing points of various competitors
            and trial different business models</h2>
            <img src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon">

        </div>
        
        
        <p class="body-l form-group description"> We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use.
             Keep iterating the subtasks until we have a coherent proposition. 
        </p>
    

        <div class="form-group">
            <div class="subtask-header"><p class="body-m">Subtasks ({{ completedSubtasks }} of {{ subtasks.length }})</p></div>
            <ul class="subtasks-list">
                <li v-for="subtask in subtasks" :key="subtask.id" class="subtask-item">
                    <input type="checkbox" :id="`subtask-${subtask.id}`" v-model="subtask.completed">
                    <label class="body-l" :for="`subtask-${subtask.id}`">{{ subtask.title }}</label>
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
  import { mapGetters } from 'vuex';

  export default {

    data() {
      return {
        selectedStatus: 'doing',
        subtasks: [
            { id: 1, title: 'Research competitor pricing and business models', completed: true },
            { id: 2, title: 'Outline a business model that works for our solution', completed: true },
            { id: 3, title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy', completed: false },
        ],
      };
    },
    computed: {
      ...mapGetters(['activeTask']),
      completedSubtasks() {
        return this.subtasks.filter(subtask => subtask.completed).length;
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
    top: -60px;
    left: -80px;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 998;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
</style>