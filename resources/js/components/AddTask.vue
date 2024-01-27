<template>
  <div class="grey-box"  @click="toggleAddTask" > </div>
  <div class="view-widget-modal"> 
    <div class="add-edit-board-container">
      <h2 class="heading-l">Add New Task</h2>
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label for="taskName"><p class="body-m">Title</p></label>
          <input class="body-l" type="text" id="TaskName" v-model="newTask.title" required placeholder="e.g. Take coffee break">
        </div>
        <div class="form-group">
            <label class="body-m" for="description">Description</label>
            <textarea  v-model="newTask.description" type="text" class="description body-l"  id="description" rows="4" 
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            ></textarea>
        </div>
        <div class="form-group">
          <label><p class="body-m">Subtasks</p></label>
          <div v-for="(subtask, index) in newTask.subtasks" :key="index" class="subtasks">
            <input class="body-l" type="text" v-model="subtask.title" required>
            <img @click="removeSubtask(index)" src="/assets/icon-cross.svg" alt="delete subtask">
          </div>
          <button class="btn-secondary" type="button" @click="addSubtask">+ Add New Subtask</button>
        </div>
        <div class="form-group">
            <label class="body-m" for="status-select" >Status</label>
            <select v-model="selectedColumn"  class="status-select body-l" >
                <option v-for="column in columns" :key="column.column_id" :value="column.column_id">
                    {{ column.name }}
                </option>
            </select>
        </div>
        <button class="btn-primary-s" type="submit">Create New Task</button>
      </form>
    </div>
    </div>
  </template>
  
  <script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        subtasks: [{ title: '' , isCompleted: false}],
        column_id: 1, 
        status: "",
        board_id: null,
      },
      selectedColumn: null, 
    };
  },
  computed: {
    ...mapGetters(['activeBoard']),
    columns() {
      return this.activeBoard ? this.activeBoard.columns : [];
    }
  },
  methods: {
    ...mapMutations(['toggleAddTask', 'toggleColumnrefresh']),
    ...mapActions(['addTask', 'fetchBoards','setActiveBoard']),
    addSubtask() {
      this.newTask.subtasks.push({ title: '' });
    },
    removeSubtask(index) {
      this.newTask.subtasks.splice(index, 1);
    },
    async submitTask() {
      const selectedColumnObj = this.columns.find(column => column.column_id === this.selectedColumn);

      if (!selectedColumnObj) {
        console.error("Selected column not found");
        return;
      }
      
      this.newTask.status = selectedColumnObj.name;
      this.newTask.column_id = this.selectedColumn;
      this.newTask.board_id = this.activeBoard.board_id;
      

      try {
        let response = await axios.post('/api/tasks', this.newTask);
        let taskId = response.data.task_id;

        for (let subtask of this.newTask.subtasks) {
          await axios.post('/api/subtasks', {
            title: subtask.title,
            task_id: taskId,
            isCompleted: false,
          });
        }


        await this.fetchBoards(); 
        await this.setActiveBoard(this.activeBoard);
        console.log("thias is the active board", this.activeBoard);
        this.toggleColumnrefresh();
        this.toggleColumnrefresh();
        this.toggleAddTask(false); 
      
        
      } catch (error) {
        console.error('Error creating task and subtasks:', error);
      }
    },
  }
};
</script>
  
  <style lang="scss">
  @import '../../sass/variables';


  </style>