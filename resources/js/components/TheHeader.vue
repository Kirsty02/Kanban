<template>
    <div :class="['header-div', isDarkMode ? 'header-div-dark' : '']">
        <div class="header-flex"> 
            <h1 class="heading-xl">Platform Launch</h1>          
            <div class="side-flex">            
                <button :class="['btn-primary-s', isDarkMode ? 'btn-dark' : '']"> + Add New Item</button>
                <img src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon">
            </div>
        </div>  
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isDarkMode']),
    },
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

</style>
