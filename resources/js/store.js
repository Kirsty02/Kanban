import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        isDarkMode: false,
        isSidebarVisible: true,
        isMobileView: false,
        isMobileSidebarVisible: false,
        boards: [], 
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
        SET_SUBTASKS(state, subtasks) {
            state.subtasks = subtasks;
        },
        SET_ACTIVE_BOARD(state, board) {
            state.activeBoard = board;
        },
        SET_ACTIVE_TASK(state, task){
            state.activeTask = task;
        },

    },
    actions:{
        fetchBoards({ commit }) {
            axios.get('/api/boards') 
                .then(response => {
                    commit('SET_BOARDS', response.data);
                })
                .catch(error => console.error(error)); 
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