<template>
    <div class="add-edit-board-container">
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
  </template>
  
  <script>
  export default {
    data() {
      return {
        board: {
          name: '',
          columns: [{ name: '' }, { name: '' }]
        }
        };
        },
        methods: {
            addColumn() {
            this.board.columns.push({ name: '' });
        },
            removeColumn(index) {
            this.board.columns.splice(index, 1);
            },
            createBoard() {
            // Handle creation of the board
            console.log('Creating board:', this.board);
            // You would typically want to emit an event here or call a Vuex action
        }
     }
    };
  </script>
  
  <style lang="scss">
  @import '../../sass/variables';


  </style>