<template>
    <div class="board-div" v-if="board">
 
      <div v-for="column in board.columns" :key="column.id" class="column">
        <Column :column="column"></Column>
      </div>
 
  
      <div :class="['add-column-div', isDarkMode ? 'add-column-div-dark' : '']"> 
          <h2 class="heading-xl"> + New Column</h2>
      </div>
    </div>
    <ViewTask v-if="activeTask"></ViewTask>
  </template>
  
  <script>
   import { mapGetters } from 'vuex';
  import Column from './Column.vue';
  import ViewTask from './ViewTask.vue';
 
  
  export default {
      components: {
          Column,
          ViewTask,
      },
      props: {
        board: {
          type: Object,
          required: true
        }
      },
      computed: {
          ...mapGetters(['isDarkMode','isMobileView', 'isMobileSidebarVisible', 'activeTask']),
      }
  };
  </script>

<style lang="scss">
@import '../../sass/variables';
.board-div{
    width: 100%;
    height: 100%; 
    display: flex; 
    gap: 24px;      
    justify-content: flex-start;
    padding: 24px;
    overflow: scroll;
    overflow-y: hidden;
}

.add-column-div{
    min-width: 280px;
    border-radius: 6px;
    background-color: rgb($platinum-lightest, 0.5);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    text-align: center;

    .heading-xl{
        color: $platinum-light;
    }
}

.add-column-div-dark{
    background-color: rgb($platinum-darkest, 0.2);
}

</style>
