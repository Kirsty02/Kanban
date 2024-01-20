import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        isDarkMode: false,
        isSidebarVisible: true,
        isMobileView: false,
        isMobileSidebarVisible: false,
        boards: [], 
        columns: [],
        subtasks: [],
        
        activeBoard: null,
        activeTask: null, 
    },
    mutations:{
        toggleDarkMode(state){
            state.isDarkMode = !state.isDarkMode;
        },
        toggleSidebar(state){
            state.isSidebarVisible = !state.isSidebarVisible;
        },
        updateIsMobileView(state, isMobileView) { 
            state.isMobileView = isMobileView;
            if (isMobileView) {
                state.isSidebarVisible = false;
            }
        },
        toggleMobileSidebar(state){
            state.isMobileSidebarVisible = !state.isMobileSidebarVisible;
        },
        SET_BOARDS(state, boards) {
            state.boards = boards;
        },
        SET_COLUMNS(state, columns) {
            console.log("Setting columns:", columns); 
            state.columns = columns;
        },
        UPDATE_TASK_COLUMN(state, { taskId, columnId }) {
            // Loop through each board
            state.boards.forEach(board => {
                // Loop through each column in the board
                board.columns.forEach(column => {
                    // Find the task within the column
                    const task = column.tasks.find(task => task.task_id === taskId);
                    if (task) {
                        // Update the column_id of the task
                        task.column_id = columnId;
                    }
                });
            });
        },
        SET_SUBTASKS(state, { taskId, subtasks }) {
            const task = state.boards
                .flatMap(board => board.columns)
                .flatMap(column => column.tasks)
                .find(task => task.task_id === taskId);
            if (task) {
                Vue.set(task, 'subtasks', subtasks);
            }
        },
        UPDATE_SUBTASK(state, updatedSubtask) {
            console.log('Updating subtask in Vuex:', updatedSubtask);
            state.boards.forEach(board => {
                board.columns.forEach(column => {
                    column.tasks.forEach(task => {
                        const subtaskIndex = task.subtasks.findIndex(subtask => subtask.subtask_id === updatedSubtask.subtask_id);
                        if (subtaskIndex !== -1) {
                            // Simply assigning the updated subtask for Vue 3 reactivity
                            task.subtasks[subtaskIndex] = updatedSubtask;
                        }
                    });
                });
            });
        },
        SET_ACTIVE_BOARD(state, board) {
            state.activeBoard = board;
        },
        SET_ACTIVE_TASK(state, task){
            state.activeTask = task;
        },
        UPDATE_TASK_COLUMN(state, { taskId, columnId }) {
            console.log('Boards:', state.boards);
            state.boards.forEach(board => {
                console.log('Board Columns:', board.columns);
                board.columns.forEach(column => {
                    console.log('Column Tasks:', column.tasks);
                    // Rest of the code...
                });
            });
        },

    },
    actions:{
        async fetchBoards({ commit }) {
            try {
                const boardsResponse = await axios.get('/api/boards');
                // Assuming your backend returns boards with their columns, tasks, and subtasks
                commit('SET_BOARDS', boardsResponse.data);
            } catch (error) {
                console.error(error);
            }
        },
        setActiveBoard({ commit }, board) {
            commit('SET_ACTIVE_BOARD', board);
        },
        setActiveTask( { commit, dispatch }, task){
            commit('SET_ACTIVE_TASK', task);
            if (task) {
                dispatch('fetchSubtasksForActiveTask', task.task_id);
            }
        },
        fetchSubtasksForActiveTask({ commit }, taskId) {
            axios.get(`/api/tasks/${taskId}/subtasks`) 
                .then(response => {
                    console.log(`Subtasks fetched for task ${taskId}:`, response.data);
                    commit('SET_SUBTASKS', response.data);
                })
                .catch(error => console.error(error));
        },
        fetchSubtasksForTask({ commit }, taskId) {
            axios.get(`/api/tasks/${taskId}/subtasks`)
                .then(response => {
                    commit('SET_SUBTASKS', { taskId, subtasks: response.data });
                })
                .catch(error => console.error(error));
        },
        updateSubtask({ commit }, subtask) {
            axios.patch(`/api/subtasks/${subtask.subtask_id}`, { isCompleted: subtask.isCompleted })
                .then(response => {
                    commit('UPDATE_SUBTASK', response.data); // Update Vuex store
                    console.log('Subtask updated:', response.data);
                })
                .catch(error => console.error('Error updating subtask:', error));
        },
        updateTaskColumn({ commit }, { taskId, columnId }) {
            axios.patch(`/api/tasks/${taskId}/updateColumn`, { column_id: columnId })
                .then(() => {
                    commit('UPDATE_TASK_COLUMN', { taskId, columnId });
                })
                .catch(error => console.error('Error updating task column:', error));
        },
        setColumns({ commit}, columns){
            commit('SET_COLUMNS', columns);
        },

    },
    getters: {
        isDarkMode(state){
            return state.isDarkMode;
        },
        isSidebarVisible(state){
            return state.isSidebarVisible;
        },
        isMobileView(state) { 
            return state.isMobileView;
        },
        isMobileSidebarVisible(state){
            return state.isMobileSidebarVisible;
        },
        boards(state) {
            return state.boards;
        },
        subtasks(state) {
            return state.subtasks;
        },
        activeBoard(state){
            return state.activeBoard;
        },
        activeTask(state) {
            return state.activeTask;
        }
    },
    
});