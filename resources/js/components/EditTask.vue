<template>
    <div class="add-edit-board-container">
      <h2 class="heading-l">Edit Task</h2>
      <form @submit.prevent="createTask">
        <div class="form-group">
          <label for="taskName"><p class="body-m">Title</p></label>
          <input class="body-l" type="text" id="TaskName" v-model="task.name" required placeholder="e.g. Take coffee break">
        </div>
        <div class="form-group">
            <label class="body-m" for="description">Description</label>
            <textarea class="description body-l"  id="description" rows="4"  v-model="task.description" 
            placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
            ></textarea>
        </div>
        <div class="form-group">
          <label><p class="body-m">Subtasks</p></label>
          <div v-for="(subtask, index) in task.subtasks" :key="index" class="subtasks">
            <input class="body-l" type="text" v-model="subtask.name" required>
            <img @click="removeSubtask(index)" src="/assets/icon-cross.svg" alt="delete subtask">
          </div>
          <button class="btn-secondary" type="button" @click="addSubtask">+ Add New Subtask</button>
        </div>
        <div class="form-group">
            <label class="body-m" for="status-select">Status</label>
            <select  id="status-select" v-model="selectedStatus" class="status-select body-l">
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
            </select>
        </div>
        <button class="btn-primary-s" type="submit">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedStatus: 'doing',
        task: {
          name: 'Take Coffe Break',
          subtasks: [{ name: 'Take a shit' }],
          description: 'Off for a coffe break see you guys later!!!',
        }
        };
        },
        methods: {
            addSubtask() {
            this.task.subtasks.push({ name: '' });
        },
            removeSubtask(index) {
            this.task.subtasks.splice(index, 1);
            },
            createTask() {
            // Handle creation of the board
            console.log('Creating task:', this.task);
            // You would typically want to emit an event here or call a Vuex action
        }
     }
    };
  </script>
  
  <style lang="scss">
  @import '../../sass/variables';


  </style>