<template>
    <div :class="['task-widget-container', isDarkMode ? 'task-widget-container-dark' : '']"  @click="selectTask">
        <h2 class="heading-m">{{task.title}}</h2>
        <p class="body-m">{{ completedSubtasksCount }} of {{ totalSubtasksCount }}  subtasks complete</p>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
import { ref, watch } from 'vue';
export default {
    computed: {
        ...mapGetters(['isDarkMode','isMobileView', 'isMobileSidebarVisible', 'subtasks', 'activeTask']),
        completedSubtasksCount() {
            return this.task.subtasks.filter(subtask => subtask.isCompleted).length;
        },
        totalSubtasksCount() {
            return this.task.subtasks.length;
        },
    },
    props: {
        task: {
            type: Object,
            required: true
        },
    },
    setup(props) {
    // Reactive reference to the task prop
    const task = ref(props.task);

    // Watch for changes to the task prop
    watch(() => props.task, (newTask) => {
      task.value = newTask;
    });

    return {
      // ... other reactive properties
      task,
    };
    },
    methods:{
        selectTask(){
            this.$store.dispatch('setActiveTask', this.task);
        }
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

.task-widget-container:hover{
    cursor: pointer;
}
.task-widget-container-dark{
    background-color: $platinum-darkest;
    .heading-m{
        color: $white-light;
    }
}

</style>
