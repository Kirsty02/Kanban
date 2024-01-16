import { createStore } from 'vuex';

export default createStore({
    state: {
        isDarkMode: false,
        isSidebarVisible: true,
        isMobileView: false,
        isMobileSidebarVisible: false,
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
        }
    }
});