<template>
    <div v-if="!isMobileView" :class="['header-div', isDarkMode ? 'header-div-dark' : '']">
        <div class="header-flex"> 
            <h1 class="heading-xl">Platform Launch</h1>    
            <span v-if="isMobileView">Mobile View</span> 
            <div class="side-flex">            
                <button :class="['btn-primary-s', isDarkMode ? 'btn-dark' : '']"> + Add New Item</button>
                <img src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon">
            </div>
        </div>  
    </div>
    <div v-else class="mobile-header-div"> 
        <div class="header-flex mobile-padding"> 
            <div class="side-flex"> 
                <img src="/assets/logo-mobile.svg" alt="Mobile Logo">
                <h3 class="heading-l"> Platform Launch</h3>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isDarkMode','isMobileView']),
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
        const isMobileView = window.innerWidth <= 680;
        this.$store.commit('updateIsMobileView', isMobileView);
        }
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
.side-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}
.header-div-dark{
    background-color: $platinum-darkest;
    border-bottom: 0.25px solid $platinum-dark;
    .heading-xl{
        color: $white-light;
    }
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

.mobile-padding{
    padding-left: 16px;
    padding-right: 16px;
}
</style>
