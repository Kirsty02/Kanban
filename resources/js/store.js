import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        isDarkMode: false,
        isSidebarVisible: true,
        isMobileView: false,
        isMobileSidebarVisible: false,
        boards: [], 
        activeBoard: null,
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
        SET_ACTIVE_BOARD(state, board) {
            state.activeBoard = board;
        },

    },
    actions:{
        fetchBoards({ commit }) {
            axios.get('/api/boards') // Adjust the URL as needed for your API
                .then(response => {
                    commit('SET_BOARDS', response.data);
                })
                .catch(error => console.error(error)); 
        },
        setActiveBoard({ commit }, board) {
            commit('SET_ACTIVE_BOARD', board);
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
        activeBoard(state){
            return state.activeBoard;
        }
    },
    
});