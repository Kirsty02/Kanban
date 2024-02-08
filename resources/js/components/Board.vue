<template>
    <div class="board-div" v-if="activeBoard">

      <div v-for="column in activeBoard.columns" :key="`${column.column_id}-${column.board_id}`" class="column">
        <Column :column="column" ></Column>
      </div>



      
 
  
      <div :class="['add-column-div', isDarkMode ? 'add-column-div-dark' : '']"> 
          <h2 class="heading-xl" @click="toggleEditBoard();"> + New Column</h2>
      </div>
    </div>
    <ViewTask v-if="isViewTaskVisible"></ViewTask>
    
    <DeleteBoard v-if="isDeleteBoardVisible"> </DeleteBoard>
    <AddTask v-if="isAddTaskVisible"> </AddTask>
    <EditBoard v-if="isEditBoardVisible"> </EditBoard>
    <EditTask v-if="isEditTaskVisible"> </EditTask>

    
  </template>
  
  <script>
  import { mapActions, mapGetters, mapMutations } from 'vuex';
  import Column from './Column.vue';
  import ViewTask from './ViewTask.vue';
  import DeleteBoard from './DeleteBoard.vue';
  import AddTask from './AddTask.vue';
  import EditBoard from './EditBoard.vue';
  import EditTask from './EditTask.vue';
  import { watch, reactive } from 'vue';
  
  export default {
    props: {
      board: {
        type: Object,
        required: true
      }
    },
      components: {
          Column,
          ViewTask,
          DeleteBoard,
          AddTask,
          EditBoard,
          EditTask
      },
      computed: {
          ...mapGetters(['isDarkMode','isMobileView', 'isMobileSidebarVisible', 'activeTask', 'isAddBoardVisible', 'isDeleteBoardVisible', 'isAddTaskVisible', 'shouldColumnsRefresh', 'isEditBoardVisible','isViewTaskVisible', 'isEditTaskVisible', 'activeBoard']),
      },
 
      methods:{
        ...mapActions(['fetchBoards']),
        ...mapMutations(['toggleEditBoard']),
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

.add-column-div:hover, .add-column-div-dark:hover{
  cursor: pointer;

}

</style>
