<template>
    <div class="board-div" v-if="board && shouldColumnsRefresh" >

      <div v-for="column in board.columns" :key="column.column_id" class="column">
        <Column :column="column" :selectedColumn="selectedColumn" ></Column>
      </div>

      
 
  
      <div :class="['add-column-div', isDarkMode ? 'add-column-div-dark' : '']"> 
          <h2 class="heading-xl"> + New Column</h2>
      </div>
    </div>
    <ViewTask v-if="activeTask" @columnChanged="onColumnChanged"></ViewTask>
    <AddBoard v-if="isAddBoardVisible"> </AddBoard>
    <DeleteBoard v-if="isDeleteBoardVisible"> </DeleteBoard>
    <AddTask v-if="isAddTaskVisible"> </AddTask>
    <EditBoard v-if="isEditBoardVisible"> </EditBoard>

    
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import Column from './Column.vue';
  import ViewTask from './ViewTask.vue';
  import AddBoard from './AddBoard.vue';
  import DeleteBoard from './DeleteBoard.vue';
  import AddTask from './AddTask.vue';
  import EditBoard from './EditBoard.vue';
  
  export default {
      components: {
          Column,
          ViewTask,
          AddBoard,
          DeleteBoard,
          AddTask,
          EditBoard
      },
      props: {
        board: {
          type: Object,
          required: true
        }
      },
      data() {
        return {
          selectedColumn: null, // Initialize selectedColumn as null
        };
      },
      computed: {
          ...mapGetters(['isDarkMode','isMobileView', 'isMobileSidebarVisible', 'activeTask', 'isAddBoardVisible', 'isDeleteBoardVisible', 'isAddTaskVisible', 'shouldColumnsRefresh', 'isEditBoardVisible']),
      },
 
      methods:{
        ...mapActions(['fetchBoards']),
        onColumnChanged() {
          this.$store.dispatch('fetchBoards').then(() => {
            console.log('Boards re-fetched after column change');
          });
        },
        updateTaskColumn(activeTask, newColumn) {
          if (activeTask && newColumn !== null) {
            // Update the task's column based on the newColumn value
            this.$store.dispatch('updateTaskColumn', {
              taskId: activeTask.task_id,
              columnId: newColumn,
          });
        }
    },

      },
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
