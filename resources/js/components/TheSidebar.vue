<template>
    <div class="sidebar-div">
        <div class="sidebar-flex">
            <img class="logo" src="/assets/logo-dark.svg" alt="Top Logo">
            <div class="top-box">
                <div class="boards-flex"> 
                    <h1 class="heading-s">  ALL BOARDS (3) </h1>
                    <div class="board-item" :class="{ active: activeBoard === 'Board 1' }" @click="setActiveBoard('Board 1')"> 
                        <svg class="board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>Board 1</h2>
                    </div>
                    <div class="board-item" :class="{ active: activeBoard === 'Board 2' }" @click="setActiveBoard('Board 2')"> 
                        <svg class="board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>Board 2</h2>
                    </div>
                    <div class="board-item" :class="{ active: activeBoard === 'Board 3' }" @click="setActiveBoard('Board 3')"> 
                        <svg class="board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>Board 3</h2>
                    </div>
                    <div class="create-board-div"> 
                        <svg class="create-board-icon" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" /></svg>
                        <h2>+ Create New Board</h2>
                    </div>
                </div>
            </div>
            <div class="bottom-div">

                <div class="toggle-theme-div"> 
                    <img src="/assets/icon-light-theme.svg" alt="Top Logo">
                    <button class="toggle-switch" @click="toggleSwitch">
                        <span class="switch-circle"></span>
                    </button>
                    <img  src="/assets/icon-dark-theme.svg" alt="Top Logo">

                </div>
                <h1>bottom</h1>

            </div>

        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      activeBoard: 'Board 1',
    };
  },
  methods: {
    setActiveBoard(boardName) {
      this.activeBoard = boardName;
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../sass/variables';
.sidebar-div{
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background-color: $white-light;
    border-right: 2px solid $white-dark;
}

.logo{
    position: absolute;
    padding-top: 2rem;
    padding-left: 2rem;
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
        gap: 0.25rem;
    }
}


</style>

