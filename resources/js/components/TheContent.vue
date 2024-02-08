<template>
    <div :class="['content-div', isDarkMode ? 'content-div-dark' : '', isSidebarVisible ? '' : 'content-expanded']">
        <board v-if="activeBoard" :key="activeBoard.id" :board="activeBoard"></board>
        <div v-if="!activeBoard" class="boards-div">
            <h2 class="heading-l">No have not seclted a board. click on the sidebar to view or create a board.</h2>
            <button class="btn-primary-s" @click="toggleAddBoardForm"> + Add New Board</button>
        </div>
      <div class="toggle-sidebar-btn" @click="toggleSidebar">
        <img src="/assets/icon-show-sidebar.svg" alt="light theme">
      </div>
    </div>
    <AddBoard v-if="isAddBoardVisible"> </AddBoard>
  </template>
  

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Board from './Board.vue';
import AddBoard from './AddBoard.vue';


export default {
    components: {
        Board,
        AddBoard
    },
    created(){
        this.fetchBoards();

    },
    methods: {
        ...mapActions(['fetchBoards']), 
        ...mapMutations(['toggleSidebar','toggleAddBoardForm']),
    },
    computed: {
        ...mapGetters(['isDarkMode', 'isSidebarVisible', 'isMobileView', 'boards', 'activeBoard', 'isAddBoardVisible']),
    },
};


</script>

<style scoped lang="scss">
@import '../../sass/variables';

.content-div{
    position: absolute;
    width: calc(100vw - 300px);
    height: calc(100vh - 96px);
    top: 96px;
    left: 300px;
    display: flex;
    align-content: center;
    justify-content: center;
}
.heading-l{
       color: $platinum-light;
}
.boards-div{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 2rem;
}


//Toggle Sidebar
.toggle-sidebar-btn{
    display: none;
    position: absolute;
    left: 0;
    bottom: 50px;
    background-color: $purple-dark;
    width: 70px;
    height: 50px;
    border-radius: 2rem;
    align-items: center;
    justify-content: center;
    padding-left: 1rem;
    transform: translateX(-20px);
    overflow: hidden;
    :hover{
        cursor: pointer;
    }
}
.content-expanded {
  width: 100vw;
  left: 0;
  overflow: hidden;
  .toggle-sidebar-btn{
    display: flex;
  }
}
//Dark styles
.content-div-dark{
    background-color: $navy-light;
}


// Tablet Design
@media(max-width: 768px){
    .content-div{
        width: calc(100vw - 260px);
        height: calc(100vh - 80px);
        top: 80px;
        left: 260px;
    }
    .content-expanded{
        width: 100vw;
        left: 0;
    }
}

@media(max-width: 680px) {
    .content-expanded{
        height: calc(100vh - 64px);
        top: 64px;

        .toggle-sidebar-btn{
            display: none;
        }
    }

    
}


</style>
