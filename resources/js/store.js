import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        isDarkMode: false,
        isSidebarVisible: true,
        isMobileView: false,
        isMobileSidebarVisible: false,
        isAddBoardVisible: false,
        isBoardDropDownVisible: false,
        isDeleteBoardVisible: false,
        isAddTaskVisible: false,
        isEditBoardVisible: false,
        boards: [], 
        columns: [],
        subtasks: [],
        activeBoard: null,
        activeTask: null, 
        shouldColumnsRefresh: true,
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
        toggleAddBoardForm(state){
            state.isAddBoardVisible = !state.isAddBoardVisible;
        },
        toggleBoardDropDown(state){
            state.isBoardDropDownVisible = !state.isBoardDropDownVisible;
        },
        toggleDeleteBoard(state){
            state.isDeleteBoardVisible = !state.isDeleteBoardVisible;

        },
        toggleAddTask(state){
            state.isAddTaskVisible = !state.isAddTaskVisible;
        },
        toggleColumnrefresh(state){
            state.shouldColumnsRefresh = !state.shouldColumnsRefresh;
        },
        toggleEditBoard(state){
            state.isEditBoardVisible = !state.isEditBoardVisible;
        },

        SET_BOARDS(state, boards) {
            state.boards = boards;
        },
        UPDATE_BOARD(state, updatedBoard) {
            const index = state.boards.findIndex(board => board.board_id === updatedBoard.board_id);
            if (index !== -1) {
                state.boards.splice(index, 1, updatedBoard);
            } else {
                console.error('Board to update not found');
            }
        },
        SET_COLUMNS(state, columns) {
            console.log("Setting columns:", columns); 
            state.columns = columns;
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
        UPDATE_TASK_COLUMN(state, { taskId, columnId }) {
            let taskFound = false;
            for (const board of state.boards) {
              for (const column of board.columns) {
                const taskIndex = column.tasks.findIndex(task => task.task_id === taskId);
                if (taskIndex !== -1) {
                  const [task] = column.tasks.splice(taskIndex, 1);
                  task.column_id = columnId;
                  const targetColumn = board.columns.find(c => c.column_id === columnId);
                  if (targetColumn) {
                    targetColumn.tasks.push(task);
                    taskFound = true;
                  }
                  break;
                }
              }
              if (taskFound) break;
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
        REMOVE_BOARD(state, boardId) {
            if (state.activeBoard && state.activeBoard.id === boardId) {
            }
            state.boards = state.boards.filter(board => board.id !== boardId);
        },


    },
    actions:{
        async fetchBoards({ commit }) {
            try {
                const boardsResponse = await axios.get('/api/boards');
                commit('SET_BOARDS', boardsResponse.data);
            } catch (error) {
                console.error(error);
            }
        },
        async addBoard({ commit }, boardData) {
            try {
                await axios.post('/api/boards', boardData);
            } catch (error) {
                throw error;
            }
        },
        async updateBoard({ commit }, boardData) {
            try {
                const response = await axios.patch(`/api/boards/${boardData.board_id}`, boardData);
                commit('UPDATE_BOARD', response.data); 
                return response.data; 
            } catch (error) {
                console.error('Error updating board:', error);
                throw error;
            }
        },
        async deleteBoard({ commit, state }, boardId) {
            try {
                await axios.delete(`/api/boards/${boardId}`);
                commit('REMOVE_BOARD', boardId);
            } catch (error) {
                console.error('Error deleting board:', error);
            }
        },
        async addColumn({ dispatch }, { columnData }) {
            try {
                const response = await axios.post('/api/columns', columnData);
                dispatch('fetchBoards'); 
                return response.data;
            } catch (error) {
                console.error('Error adding column:', error);
                throw error;
            }
        },
        async addTask({ dispatch }, { taskData}) {
            try {
                await axios.post('/api/tasks', taskData);
                dispatch('fetchBoards'); 
            } catch (error) {
                console.error('Error adding task:', error);
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
        setColumns({ commit}, columns){
            commit('SET_COLUMNS', columns);
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
            console.log("subtask is completed data here",subtask.isCompleted);
            axios.patch(`/api/subtasks/${subtask.subtask_id}`, { isCompleted: !subtask.isCompleted })
                .then(response => {
                    commit('UPDATE_SUBTASK', response.data);
                })
                .catch(error => console.error('Error updating subtask:', error));
        },
        async updateTaskColumn({ commit }, { taskId, columnId }) {
            try {
              await axios.patch(`/api/tasks/${taskId}/updateColumn`, { column_id: columnId });
              commit('UPDATE_TASK_COLUMN', { taskId, columnId });
            } catch (error) {
              console.error('Error updating task column:', error);
            }
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
        columns(){
            return state.columns;
        },
        subtasks(state) {
            return state.subtasks;
        },
        activeBoard(state){
            return state.activeBoard;
        },
        activeTask(state) {
            return state.activeTask;
        },
        isAddBoardVisible(state){
            return state.isAddBoardVisible;
        },
        isBoardDropDownVisible(state){
            return state.isBoardDropDownVisible;
        },
        isDeleteBoardVisible(state){
            return state.isDeleteBoardVisible;
        },
        isAddTaskVisible(state){
            return state.isAddTaskVisible;
        },
        shouldColumnsRefresh(state){
            return state.shouldColumnsRefresh;
        },
        isEditBoardVisible(state){
            return state.isEditBoardVisible;
        }
   

    },
    
});