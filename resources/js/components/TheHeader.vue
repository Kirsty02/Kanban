<template>
    <div v-if="!isMobileView" :class="['header-div', isDarkMode ? 'header-div-dark' : '']">
        <div class="header-flex"> 
            <h1 class="heading-xl">{{ activeBoard?.name || '' }}</h1>    
            <div v-if="activeBoard != null" class="side-flex">            
                <button :class="['btn-primary-s', isDarkMode ? 'btn-dark' : '']" @click="toggleAddTask"> + Add New Task</button>
                <div class="dropdown-click" @click="toggleBoardDropDown"> <img src="/assets/icon-vertical-ellipsis.svg" alt="Board Edit or Delete drop down"></div>
            </div>
        </div>  
    </div>
    <div v-else :class="['mobile-header-div', isDarkMode ? 'mobile-header-div-dark' : '']"> 
        <div class="header-flex mobile-padding"> 
            <div @click="toggleMobileSidebar"  class="side-flex mobile-menu-click" > 
                <img src="/assets/logo-mobile.svg" alt="Mobile Logo">
                <h3 class="heading-l"> Platform Launch</h3>
                <img  src="/assets/icon-chevron-down.svg" alt="Mobile Menu Button">
            </div>
            <div v-if="activeBoard != null"  class="side-flex">
                <button class="btn-primary-s mobile-add-btn" @click="toggleAddTask"> <img src="/assets/icon-add-task-mobile.svg" alt="Mobile Logo"></button>
                <img src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon" @click="toggleBoardDropDown">
            </div>
        </div>
    </div>
    <BoardDropDown v-if="isBoardDropDownVisible" > </BoardDropDown>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import BoardDropDown from './BoardDropDown.vue';

export default {
    components: {
        BoardDropDown
    },
    computed: {
        ...mapGetters(['isDarkMode','isMobileView', 'isMobileSidebarVisible', 'activeBoard', 'isBoardDropDownVisible']),
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        ...mapMutations(['toggleMobileSidebar', 'toggleBoardDropDown', 'toggleAddTask']),
        handleResize() {
            const isMobileView = window.innerWidth <= 680;
            this.$store.commit('updateIsMobileView', isMobileView);
        },


    }
};


</script>

<style  lang="scss">
@import '../../sass/variables';

.header-div{
    position: absolute;
    top: 0;
    left: 300px;
    height: 96px;
    width: calc(100vw - 300px);
    background-color: white;
    border-bottom: 0.25px solid $platinum-lightest;
}
.header-flex{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
}

.header-div-dark{
    background-color: $platinum-darkest;
    border-bottom: 0.25px solid $platinum-dark;
    .heading-xl{
        color: $white-light;
    }
}

.dropdown-click:hover{
    cursor: pointer;
}
// Tablet Design
@media(max-width: 768px){
    .header-div{
        left: 260px;
        height: 80px;
        width: calc(100vw - 260px);
        .heading-xl{
            font-size: 20px;
        
        }
    }
}

// Mobile Design
.mobile-header-div{
    position: absolute;
    top: 0;
    left: 0;
    height: 64px;
    width: 100vw;
    background-color: $white-light;
}


.mobile-header-div-dark{
    background-color: $platinum-darkest;
    .heading-l{
        color: $white-light;
    }
}
.mobile-padding{
    padding-left: 16px;
    padding-right: 16px;
    gap: .5rem;
}

.mobile-add-btn{
    width: 48px;
    height: 32px;
}

.mobile-menu-click{
    cursor: pointer;
}

@media(max-width: 680px){
    .side-flex{
        gap: 0.5rem;
    }
    .add-edit-board-container-dark, .add-edit-board-container{
        max-width: 300px;
    }
}
</style>
