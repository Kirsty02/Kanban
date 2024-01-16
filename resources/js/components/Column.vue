<template>
    <div class="column-container">

        <div class="column-header-div">
            <div class="status-circle"> </div>
            <p class="heading-s"> To Do (5) </p>
        </div>
        <TaskWidget></TaskWidget>
        <TaskWidget></TaskWidget>
        <TaskWidget></TaskWidget>
    </div>
    
</template>

<script>
import TaskWidget from './TaskWidget.vue';

export default {
    components: {
        TaskWidget,
    }
}
</script>

<style lang="scss">
@import '../../sass/variables';
.column-container{
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.column-header-div{
    display: flex;
    gap: 1rem;
    align-content: center;
}

.status-circle{
    background-color: green;
    height: 15px;
    width: 15px;
    border-radius: 50%;
}


</style>
