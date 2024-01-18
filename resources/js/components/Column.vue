<template>
    <div class="column-container">

        <div class="column-header-div"> 
            <div class="status-circle"> </div>
            <p class="heading-s"> {{column.name}} </p>
        </div>
        <TaskWidget v-for="taskWithSubtasks in tasksWithSubtasks" :key="taskWithSubtasks.id" :task="taskWithSubtasks" :subtasks="taskWithSubtasks.subtasks"></TaskWidget>

    </div>
    
</template>

<script>
import TaskWidget from './TaskWidget.vue';
import axios from 'axios';

export default {
    components: {
        TaskWidget,
    },
    props: {
        column: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            tasksWithSubtasks: [],
        };
    },
    methods: {
        async fetchSubtasks(task) {
            try {
                const response = await axios.get(`/api/tasks/${task.task_id}/subtasks`);
                console.log(`Fetched subtasks for task ${task.id}:`, response.data); // Debugging line
                return response.data;
            } catch (error) {
                console.error("Error fetching subtasks for task " + task.id + ":", error);
                return [];
            }
        },
        async loadTasksAndSubtasks() {
            this.tasksWithSubtasks = await Promise.all(this.column.tasks.map(async (task) => {
                const subtasks = await this.fetchSubtasks(task);
                return { ...task, subtasks };
            }));
            console.log("Tasks with subtasks:", this.tasksWithSubtasks); // Debugging line
        },
    },
    mounted() {
        this.loadTasksAndSubtasks();
    },
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
