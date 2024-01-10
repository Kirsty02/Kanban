<template>
    <div :class="['content-div', isDarkMode ? 'content-div-dark' : '', isSidebarVisible ? '' : 'content-expanded']">
        <div class="no-boards-div">
            <h2 class="heading-l">This board is empty. Create a new column to get started.</h2>
            <button class="btn-primary-s"> + Add New Column</button>
            <div class="toggle-sidebar-btn" @click="toggleSidebar">
                <img src="/assets/icon-show-sidebar.svg" alt="light theme">
            </div>
        </div>
    </div>
    
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations(['toggleSidebar']),
    },
    computed: {
        ...mapGetters(['isDarkMode', 'isSidebarVisible', 'isMobileView']),
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
.no-boards-div{
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
