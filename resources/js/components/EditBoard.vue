<template>
  <div class="grey-box"  @click="toggleEditBoard" > </div>
  <div class="view-widget-modal"> 
    <div class="add-edit-board-container">
      <h2 class="heading-l">Edit Board</h2>
      <form @submit.prevent="submitBoardUpdate">
        <div class="form-group">
          <label for="boardName"><p class="body-m">Board Name</p></label>
          <input class="body-l" type="text" id="boardName" v-model="board.name" required :placeholder="activeBoard.name">
        </div>
        <div class="form-group">
          <label><p class="body-m">Columns</p></label>
          <div v-for="(column, index) in board.columns" :key="index" class="columns">
            <input class="body-l" type="text" v-model="column.name" required>
            <img @click="removeColumn(index), this.showDeleteConfirmation=true" src="/assets/icon-cross.svg" alt="light theme">
          </div>
          <button class="btn-secondary" type="button" @click="addColumn">+ Add New Column</button>
        </div>
        <button class="btn-primary-s" type="submit">Save Changes</button>
      </form>
    </div>
  </div>
  <div v-if="showDeleteConfirmation"> 
    <div class="grey-box higher"  @click="showDeleteConfirmation = false"></div>
    <div class="view-widget-modal"> 
        <div class="delete-container">
            <h2 class="heading-l">Delete this column?</h2>
            <p class="body-l"> 
                Are you sure you want to delete the '{{ board.columns[columnIndexToDelete]?.name || '' }}' Column? This action will remove all tasks within the column and cannot be reversed.
            </p>
            <div class="button-bottom-flex"> 
                <button class="btn-destructive" @click="deleteActiveColumn"> Delete</button>
                <button class="btn-secondary" @click="showDeleteConfirmation = false"> Cancel</button>
            </div>
        </div>
    </div>
  </div>
  </template>
  
<script>
import axios from 'axios';
import { mapMutations, mapActions, mapGetters } from 'vuex';
  export default {
    data() {
      return {
        board: {
          name: '',
          columns: []
        },
        showDeleteConfirmation: false,
        columnIndexToDelete: null,
      };
    },
    computed: {
      ...mapGetters([  'activeBoard']),
    },
    methods: {
      ...mapActions(['updateBoard', 'fetchBoards']),
      ...mapMutations(['toggleEditBoard']),
      addColumn() {
        this.board.columns.push({ name: '' });
      },
      prepareColumnDeletion(index) {
        this.showDeleteConfirmation = true;
        this.columnIndexToDelete = index;
      },
      deleteActiveColumn() {
        const columnId = this.board.columns[this.columnIndexToDelete].column_id;
        axios.delete(`/api/columns/${columnId}`)
        .then(() => {
            this.board.columns.splice(this.columnIndexToDelete, 1);
            this.showDeleteConfirmation = false;
            this.columnIndexToDelete = null;
                })
                .catch(error => {
                    console.error('Error deleting column:', error);
                });
      },
      submitBoardUpdate() {
        this.updateBoard(this.board)
          .then(() => {
            //new columns
            let newColumnPromises = this.board.columns
              .filter(column => !column.column_id)
              .map(newColumn => {
                return axios.post('/api/columns', {
                  name: newColumn.name,
                  board_id: this.board.board_id,
                });
              });

            //existing columns
            let updateColumnPromises = this.board.columns
              .filter(column => column.column_id)
              .map(existingColumn => {
                return axios.patch(`/api/columns/${existingColumn.column_id}`, { name: existingColumn.name });
              });

            return Promise.all([...newColumnPromises, ...updateColumnPromises]);
          })
          .then(() => {
            this.fetchBoards();
            this.toggleEditBoard();
          })
          .catch(error => {
            console.error('Error updating board or columns:', error);
          });
        }
    },
    created(){
      if (this.activeBoard){
        this.board = { ...this.activeBoard};
      }
    },
  };
</script>
  
<style lang="scss">
@import '../../sass/variables';
.delete-container{
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border-radius: 6px;
    gap: 24px;
    width: 416px;
    background-color: white;
    .body-l{
        color: $platinum-light;
    }
    .heading-l{
        color:  $salmon-dark;
    }
}

.button-bottom-flex{
    display: flex;
    gap: .5rem;
    justify-content: center;
    align-items: center;
    .btn-destructive, .btn-secondary{
        flex-shrink: 1;
    }
    
}

.higher{
  z-index: 999;
}

</style>