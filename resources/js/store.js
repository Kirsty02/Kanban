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
        isTaskDropdownVisible: false,
        isDeleteBoardVisible: false,
        isAddTaskVisible: false,
        isEditBoardVisible: false,
        isViewTaskVisible: false,
        isEditTaskVisible: false,
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
        toggleTaskDropdown(state){
            state.isTaskDropdownVisible = !state.isTaskDropdownVisible;

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
        toggleViewTask(state){
            state.isViewTaskVisible = !state.isViewTaskVisible;
        },
        toggleEditTask(state){
            state.isEditTaskVisible = !state.isEditTaskVisible;
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
        UPDATE_TASK_COLUMN(state, { taskId, columnId, status }) {
            const taskToUpdate = state.activeBoard.columns
              .flatMap(column => column.tasks)
              .find(task => task.task_id === taskId);
              
            if (taskToUpdate) {
              taskToUpdate.column_id = columnId;
              taskToUpdate.status = status;
            }
        },
        UPDATE_TASK(state, updatedTask) {
            const board = state.boards.find(b => b.board_id === updatedTask.board_id);
            if (board) {
                const column = board.columns.find(c => c.column_id === updatedTask.column_id);
                if (column) {
                    const taskIndex = column.tasks.findIndex(t => t.task_id === updatedTask.task_id);
                    if (taskIndex !== -1) {
                        column.tasks.splice(taskIndex, 1, updatedTask);
                    } else {
                        console.error('Task to update not found in column');
                    }
                } else {
                    console.error('Column for the task not found');
                }
            } else {
                console.error('Board for the task not found');
            }
        },
        UPDATE_SUBTASK(state, updatedSubtask) {
            console.log('Updating subtask in Vuex:', updatedSubtask);
            state.boards.forEach(board => {
                board.columns.forEach(column => {
                    column.tasks.forEach(task => {
                        const subtaskIndex = task.subtasks.findIndex(subtask => subtask.subtask_id === updatedSubtask.subtask_id);
                        if (subtaskIndex !== -1) {

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
        REMOVE_TASK(state, taskId) {
            state.boards.forEach(board => {
                board.columns.forEach(column => {
                    const taskIndex = column.tasks.findIndex(task => task.task_id === taskId);
                    if (taskIndex !== -1) {
                        column.tasks.splice(taskIndex, 1);
                    }
                    column.tasks.forEach(task => {
                        const subtaskIndex = task.subtasks.findIndex(subtask => subtask.task_id === taskId);
                        if (subtaskIndex !== -1) {
                            task.subtasks.splice(subtaskIndex, 1);
                        }
                    });
                });
            });
           
        },
        DELETE_SUBTASK(state, subtaskId) {
            state.boards.forEach(board => {
                board.columns.forEach(column => {
                    column.tasks.forEach(task => {
                        const subtaskIndex = task.subtasks.findIndex(subtask => subtask.subtask_id === subtaskId);
                        if (subtaskIndex !== -1) {
                            task.subtasks.splice(subtaskIndex, 1);
                        }
                    });
                });
            });
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
        async refreshBoardData({ commit, state }) {
            try {
              const response = await axios.get('/api/boards');
              commit('SET_BOARDS', response.data); // Assuming 'SET_BOARDS' replaces all board data

              // If you want to keep the currently selected board active, find it in the refreshed list
              if (state.activeBoard) {
                const activeBoard = response.data.find(board => board.board_id === state.activeBoard.board_id);
                commit('SET_ACTIVE_BOARD', activeBoard || null);
              }
        
            } catch (error) {
              console.error('Failed to refresh boards:', error);
            }
        },
        async deleteTask({ commit, state }, taskId) {
            try {
                await axios.delete(`/api/tasks/${taskId}`);
                commit('REMOVE_TASK', taskId);
            } catch (error) {
                console.error('Error deleting task:', error);
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
        async updateTask({ commit }, taskData) {
            try {
                const response = await axios.patch(`/api/tasks/${taskData.task_id}`, taskData);
                commit('UPDATE_TASK', response.data); 
                return response.data;
            } catch (error) {
                console.error('Error updating task:', error);
                throw error;
            }
        },
        async updateSubtask({ commit }, subtaskData) {
            try {
                const response = await axios.patch(`/api/subtasks/${subtaskData.subtask_id}`, {
                    title: subtaskData.title,
                    isCompleted: subtaskData.isCompleted
                });
                commit('UPDATE_SUBTASK', response.data);
                dispatch('fetchBoards');
            } catch (error) {
                console.error('Error updating subtask:', error);
            }
        },
        async updateTaskColumn({ commit, dispatch }, { taskId, columnId, status }) {
            try {
              const response = await axios.patch(`/api/tasks/${taskId}`, {
                task_id: taskId,
                status: status,
                column_id: columnId,
              });
              commit('UPDATE_TASK_COLUMN', {
                taskId: response.data.task_id,
                columnId: response.data.column_id,
                status: response.data.status,
              });
              dispatch('fetchBoards'); 
            } catch (error) {
              console.error('Error updating task column:', error);
            }
        },
        async deleteSubtask({ commit }, subtaskId) {
            try {
                await axios.delete(`/api/subtasks/${subtaskId}`);
                commit('DELETE_SUBTASK', subtaskId);
            } catch (error) {
                console.error('Error deleting subtask:', error);
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
        },
        isViewTaskVisible(state){
            return state.isViewTaskVisible;
        },
        isEditTaskVisible(state){
            return state.isEditTaskVisible;
        },
        isTaskDropdownVisible(state){
            return state.isTaskDropdownVisible;
        }
      
   

    },
    
});