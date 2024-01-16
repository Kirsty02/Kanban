<template>
    <div :class="['task-widget-container', isDarkMode ? 'task-widget-container-dark' : '']">
        <h2 class="heading-m"> Build UI for onboarding flow</h2>
        <p class="body-m"> 0 of 1 subtasks complete</p>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isDarkMode','isMobileView', 'isMobileSidebarVisible']),
    }
}
</script>

<style lang="scss">
@import '../../sass/variables';

.task-widget-container{
    display: flex;
    flex-direction: column;
    gap: .5rem;  
    width: 260px;
    padding: 1rem;
    background-color: $white-light;
    border-radius: 8px;
    text-align: left;
    height: fit-content;
    box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.10);
    .body-m{
        color: $platinum-light;
    }
}

.task-widget-container-dark{
    background-color: $platinum-darkest;
    .heading-m{
        color: $white-light;
    }
}

</style>
