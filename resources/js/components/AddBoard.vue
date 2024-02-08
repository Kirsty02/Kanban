<template>
  <div class="grey-box"  @click="toggleAddBoardForm" > </div>
  <div class="view-widget-modal"> 
    <div :class="['add-edit-board-container', isDarkMode ? 'add-edit-board-container-dark' : '']" >
      <h2 class="heading-l">Add New Board</h2>
      <form @submit.prevent="createBoard">
        <div class="form-group">
          <label for="boardName"><p class="body-m">Board Name</p></label>
          <input class="body-l"  type="text" id="boardName" v-model="board.name" required placeholder="e.g. Web Design">
        </div>
        <div class="form-group">
          <label><p class="body-m">Columns</p></label>
          <div v-for="(column, index) in board.columns" :key="index" class="columns">
            <input class="body-l" type="text" v-model="column.name" required>
            <img @click="removeColumn(index)" src="/assets/icon-cross.svg" alt="light theme">
          </div>
          <button class="btn-secondary" type="button" @click="addColumn">+ Add New Column</button>
        </div>
        <button class="btn-primary-s" type="submit">Create New Board</button>
      </form>
    </div>
  </div>
    
  </template>
  
  <script>
  import { mapMutations, mapActions, mapGetters} from 'vuex';
  import axios from 'axios';
  export default {
    data() {
      return {
        board: {
          name: '',
          columns: [{ name: '' }, { name: '' }],
  
        }
        };
        },
        computed: {
          ...mapGetters(['isDarkMode', 'boards']),
        },
        methods: {
          ...mapActions(['fetchBoards', 'addBoard', 'setActiveBoard', 'refreshBoardData']), 
          ...mapMutations(['toggleAddBoardForm']),
          addColumn() {
            this.board.columns.push({ name: '' });
          },
          removeColumn(index) {
            this.board.columns.splice(index, 1);
          },
          async createBoard() {
            try{
              let boardResponse = await axios.post('/api/boards', { name: this.board.name });
              let boardId = boardResponse.data.board_id;

              for(let column of this.board.columns){
                if(column.name.trim() !== ''){
                  await axios.post('/api/columns', {
                  name: column.name,
                  board_id: boardId,
                });
                }
              }
              this.refreshBoardData();
              this.toggleAddBoardForm();
              this.setActiveBoard();
            }catch(error){
              console.error('Error creating board and columns:', error);
            }

          }
     },
    };
  </script>
  
  <style lang="scss">
  @import '../../sass/variables';
  .grey-box{
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 998;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}

  </style>