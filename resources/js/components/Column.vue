<template>
    <div class="column-container">

        <div class="column-header-div"> 
            <div class="status-circle"> </div>
            <p class="heading-s"> {{column.name}} ({{ totalTasks }}) </p>
        </div>
        <TaskWidget v-for="task in column.tasks" :key="`${task.task_id}-${task.column_id}`" :task="task"></TaskWidget>
    </div>
    
</template>


<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import TaskWidget from './TaskWidget.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        TaskWidget,
    },
    props: {
        column: {
            type: Object,
            required: true
        },
    },
    setup(props) {
        const store = useStore();
        const column = ref(props.column);
        const activeBoard = computed(() => store.getters.activeBoard);

        watch(activeBoard, (newBoard) => {
            const newColumn = newBoard.columns.find(c => c.column_id === props.column.column_id);
            if (newColumn) {
                column.value = newColumn;
            }
        }, { deep: true });

        return {
            column,
        };
    },
    computed: {
        ...mapGetters(['activeBoard']),
        totalTasks() {
            return this.column.tasks.length;
        },
    },
};
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
