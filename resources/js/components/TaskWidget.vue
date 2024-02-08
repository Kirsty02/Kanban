<template>
    <div :class="['task-widget-container', isDarkMode ? 'task-widget-container-dark' : '']" @click="handleClick">
      <h2 class="heading-m">{{ task.title }}</h2>
      <p class="body-m">{{ completedSubtasksCount }} of {{ totalSubtasksCount }} subtasks complete!</p>
    </div>
  </template>
  
  <script>
  import { computed, ref, watch } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    props: {
      task: {
        type: Object,
        required: true
      },
    },
    setup(props) {
      const store = useStore();
      const task = ref(props.task);
  
      // Computed properties using Composition API
      const isDarkMode = computed(() => store.getters.isDarkMode);
      const completedSubtasksCount = computed(() => props.task.subtasks.filter(subtask => subtask.isCompleted).length);
      const totalSubtasksCount = computed(() => props.task.subtasks.length);
  
      // Watch for changes to the task prop
      watch(() => props.task, (newTask) => {
        task.value = newTask;
      });
  
      const handleClick = () => {
        store.commit('toggleViewTask');
        store.dispatch('setActiveTask', task.value);
      };
  
      return {
        task,
        isDarkMode,
        completedSubtasksCount,
        totalSubtasksCount,
        handleClick,
      };
    },
  };
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
