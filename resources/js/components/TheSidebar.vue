<template>
    <div v-if="isSidebarVisible && !isMobileView" :class="['sidebar-div', isDarkMode ? 'sidebar-div-dark' : '']">
        <div class="sidebar-flex">
            <img class="logo" :src="logoUrl" alt="Top Logo">
            <div class="top-box">
                <div class="boards-flex"> 
                    <h1 :class="['heading-s', {'heading-l': isDarkMode}]">  ALL BOARDS ({{ boards.length }}) </h1>

                    <div class="board-item" v-for="board in boards" :key="board.board_id" :class="{ active: activeBoard?.board_id === board.board_id }" @click="handleBoardSelection(board)">  
                        <svg class="board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>{{board.name}}</h2>
                    </div>
                    <div class="create-board-div" @click="toggleAddBoardForm"> 
                        <svg class="create-board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>+ Create New Board</h2>
                    </div>
                </div>
            </div>
            <div class="bottom-div">
                <div class="toggle-theme-div"> 
                    <img src="/assets/icon-light-theme.svg" alt="light theme">
                    <button class="toggle-switch" :class="{ 'active': isDarkMode }" @click="toggleTheme">
                        <span class="switch-circle"></span>
                    </button>
                    <img  src="/assets/icon-dark-theme.svg" alt="Dark Theme">
                </div>
                <div class="toggle-sidebar-div" @click="toggleSidebar"> 
                    <img  src="/assets/icon-hide-sidebar.svg" alt="Toggle Sidebar">
                    <h2 class="heading-m"> Hide Sidebar</h2>
                </div>
            </div>
        </div>
    </div>
    <div v-else-if="!isSidebarVisible && !isMobileView" :class="['sidebar-div-collapsed', isDarkMode ? 'sidebar-collapsed-dark' : '']">
        <img class="logo" :src="logoUrl" alt="Top Logo">
    </div>
    <div v-else-if="isMobileView && isMobileSidebarVisible"> 
        <div class="grey-box"  @click="toggleMobileSidebar">
            <div  :class="['mobile-menu', isDarkMode ? 'mobile-menu-dark' : '']"  @click.stop>
                <div class="boards-flex"> 
                    <h1 :class="['heading-s', {'heading-l': isDarkMode}]">  ALL BOARDS (2) </h1>
                    <div class="board-item" :class="{ active: activeBoard === activeBoard }" @click="setActiveBoard('Board 1')"> 
                        <svg class="board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>Board 1</h2>
                    </div>
                    <div class="create-board-div"> 
                        <svg class="create-board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>+ Create New Board</h2>
                    </div>
                </div>
                <div class="bottom-div">
                <div class="toggle-theme-div"> 
                    <img src="/assets/icon-light-theme.svg" alt="light theme">
                    <button class="toggle-switch" :class="{ 'active': isDarkMode }" @click="toggleTheme">
                        <span class="switch-circle"></span>
                    </button>
                    <img  src="/assets/icon-dark-theme.svg" alt="Dark Theme">
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';

export default {
    watch: {
        isSidebarVisible(newVal) {
            if (newVal) {
                this.fetchBoards();
            }
        },
    },
    computed: {
        ...mapGetters(['isDarkMode', 'isSidebarVisible', 'isMobileView', 'isMobileSidebarVisible', 'boards', 'activeBoard']),
        logoUrl(){
            return this.isDarkMode ? '/assets/logo-light.svg' : '/assets/logo-dark.svg';
        }
    },
    created() {
        this.fetchBoards(); 
     },
    methods: {
        ...mapMutations(['toggleDarkMode', 'toggleSidebar', 'toggleMobileSidebar', 'toggleAddBoardForm']),
        ...mapActions(['fetchBoards', 'setActiveBoard']),
        handleBoardSelection(board) {
            this.setActiveBoard(board);
        },
        toggleTheme(){
            this.toggleDarkMode();
            this.$emit('themeToggled');
        },
 
    }
};

</script>

<style  lang="scss">
@import '../../sass/variables';

.sidebar-div{
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background-color: $white-light;
    border-right: 0.25px solid $platinum-lightest;
    z-index: 99;
}

.sidebar-div-collapsed{
    position: absolute;
    top: 0;
    left: 0;
    height: 96px;
    width: 300px;
    border-bottom: 0.25px solid $platinum-lightest;
    background-color: $white-light;

}

.logo{
    position: absolute;
    top: 2rem;
    left: 2rem;
}
.sidebar-flex{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.top-box{
    display: flex;
    flex-direction: column;
    padding-top: 112px;
    padding-left: 2rem;
}

.boards-flex{
    display: flex;
    flex-direction: column;
    .heading-s{
        padding-bottom: .5rem;

    }
    :hover{
        cursor: pointer;
    }
}

.board-item{
    align-items: center;
    display: flex;
    justify-content: center;
    background-color: transparent;
    border-radius: 2rem;
    padding: 0.75rem;
    gap: 0.75rem;
    width: 150%;
    transform: translateX(-40%);

    .board-icon{
        fill: $platinum-light;
    }
    
    h2{
        color: $platinum-light;
        font-size: 15px;
        margin-bottom: 0px;
    }
    &.active {
    background-color: $purple-dark; 
    fill: $white-light;
    h2 {
      color: $white-light; 
    }
    .board-icon{
        fill: $white-light;
    }
  }
}
.create-board-div{
    margin-top: 0.75rem;
    align-items: center;
    display: flex;
    color: $purple-dark;
    gap: 0.75rem;
    h2{
        font-size: 15px;
        margin-bottom: 0px;
        font-weight: 700;
    }
    .create-board-icon{
        fill: $purple-dark;
    }
}

.bottom-div{
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-bottom: 2rem;
    .toggle-theme-div{
        background-color: $white-dark;
        border-radius: 0.25rem;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
    }
}

/// Toggle switch

.toggle-switch {
    position: relative;
    background-color: $purple-light;
    border: none;
    border-radius: 9999px;
    width: 50px; 
    height: 25px; 
    padding: 5px; 
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
    cursor: pointer;
    .switch-circle {
        position: absolute;
        left: 5px;
        background-color: $white-light; 
        border-radius: 50%;
        width: 20px;
        height: 20px; 
        transition: transform 0.3s;
    }
    &.active .switch-circle {
    transform: translateX(20px); 
  }
}

//Toggle Sidebar
.toggle-sidebar-div{
    display: flex;
    align-content: center;
    gap: .5rem;
    padding-left: 1rem;
    padding-top: 1rem;
    .heading-m{
        color: $platinum-light;
    }
    :hover{
        cursor: pointer;
    }
}

///Dark Mode
.sidebar-div-dark{
    background-color: $platinum-darkest;
    border-right: 0.25px solid $platinum-dark;
    .toggle-theme-div{
        background-color: $navy-light;
    } 
}
.sidebar-collapsed-dark{
    background-color: $platinum-darkest;
    border-bottom: 0.25px solid $platinum-dark

}

// Tablet Design
@media(max-width: 768px){
    .sidebar-div-collapsed, .sidebar-div{
        width: 260px;
    }
    .sidebar-div-collapsed{
        height: 80px;
    }
    .logo{
        top: 1.5rem;
        left: 1.5rem;
    }
}
.grey-box{
    position: absolute;
    top: 64px;
    width: 100vw;
    height: calc(100vh - 60px);
    background-color: rgb(0, 0, 0, 0.5);
    z-index: 998;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
.mobile-menu{
    position: relative;
    margin-top: 16px;
    background-color: $white-light;
    border-radius: 8px;
    z-index: 999;
    height: fit-content;
    width: 261px;
    padding: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 123, 255, 0.1);
}

.mobile-menu-dark{
    background-color: $platinum-dark;
    .toggle-theme-div{
        background-color: $navy-light;
    } 
}

// Mobile Design
@media(max-width: 680px){
    .sidebar-div-collapsed, .sidebar-div{
        width: 260px;
    }
    .bottom-div{
        margin-top: 2rem;
        padding-bottom: 0;
        padding: 0;
    }
    .board-item {
        transform: translateX(-37.5%);
    }
}




</style>

