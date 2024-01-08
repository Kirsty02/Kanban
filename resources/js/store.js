import { createStore } from 'vuex';

export default createStore({
    state: {
        isDarkMode: false,
        isSidebarVisible: true,
        isMobileView: false,
    },
    mutations:{
        toggleDarkMode(state){
            state.isDarkMode = !state.isDarkMode;
        },
        toggleSidebar(state){
            state.isSidebarVisible = !state.isSidebarVisible;
        },
        setIsMobileView(state, value) { 
            state.isMobileView = value;
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
    }
});