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
            <textarea class="description body-l"  id="description" rows="4" 
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

export default {
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        subtasks: [{ title: '' }],
        column_id: 1, 
        status: "",
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
    ...mapMutations(['toggleAddTask']),
    ...mapActions(['addTask']),
    addSubtask() {
      this.newTask.subtasks.push({ title: '' });
    },
    removeSubtask(index) {
      this.newTask.subtasks.splice(index, 1);
    },
    submitTask() {
      this.newTask.column_id = this.selectedColumn; 
      this.addTask({ taskData: this.newTask, column_id: this.newTask.column_id });
      this.toggleAddTask(); 
    },
  }
};
</script>
  
  <style lang="scss">
  @import '../../sass/variables';


  </style>