<template>
  <div class="grey-box" @click="toggleEditTask"> </div>
  <div class="view-widget-modal">
    <div :class="['add-edit-board-container', isDarkMode ? 'add-edit-board-container-dark' : '']" >
      <h2 class="heading-l">Edit Task</h2>
      <form @submit.prevent="submitTaskUpdate">
        <div class="form-group">
          <label for="taskName"><p class="body-m">Task Title</p></label>
          <input class="body-l" type="text" id="taskName" v-model="task.title" required>
        </div>
        <div class="form-group">
          <label for="description"><p class="body-m">Task Description</p></label>
          <textarea class="description body-l" id="description" rows="4" v-model="task.description"></textarea>
        </div>
        <div class="form-group">
          <label><p class="body-m">Subtasks</p></label>
          <div v-for="(subtask, index) in task.subtasks" :key="subtask.subtask_id || index" class="subtasks">
            <input class="body-l" type="text" v-model="subtask.title" required>
            <img @click="deleteSubtask(index)" src="/assets/icon-cross.svg" alt="delete subtask">
          </div>
          <button class="btn-secondary" type="button" @click="addSubtask">+ Add New Subtask</button>
        </div>
        <button class="btn-primary-s" type="submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      task: {
        title: '',
        description: '',
        subtasks: [],
      },
    };
  },
  computed: {
    ...mapGetters(['activeTask', 'isDarkMode']),
  },
  methods: {
    ...mapActions(['updateTask', 'fetchBoards']),
    ...mapMutations(['toggleEditTask']),
    addSubtask() {
      this.task.subtasks.push({ title: '', isNew: true });
    },
    deleteSubtask(index) {
      const subtask = this.task.subtasks[index];
      if (subtask && !subtask.isNew) {
        axios.delete(`/api/subtasks/${subtask.subtask_id}`)
          .then(() => {
            this.task.subtasks.splice(index, 1);
          })
          .catch(error => {
            console.error('Error deleting subtask:', error);
          });
      } else {
        this.task.subtasks.splice(index, 1);
      }
    },
    submitTaskUpdate() {
      const updatePromises = [];
      // Update the task itself
      updatePromises.push(this.updateTask({
        ...this.activeTask,
        ...this.task,
      }));

      // Handle subtasks
      this.task.subtasks.forEach(subtask => {

        const payload = {
          title: subtask.title,
          isCompleted: subtask.isCompleted || false,
        }

        if (subtask.isNew) {
          updatePromises.push(axios.post('/api/subtasks', {
            ...payload,
            task_id: this.activeTask.task_id,
          }));
        } else {updatePromises.push(axios.patch(`/api/subtasks/${subtask.subtask_id}`, payload));}
      });

      Promise.all(updatePromises)
        .then(() => {
          this.fetchBoards();
          this.toggleEditTask();
        })
        .catch(error => {
          console.error('Error updating task or subtasks:', error);
        });
    },
  },
  created() {
    if (this.activeTask) {
      // Cloning activeTask to ensure reactivity and prevent direct mutation
      this.task = JSON.parse(JSON.stringify(this.activeTask));
    }
  },
};
</script>

<style lang="scss">
@import '../../sass/variables';
/* Your styles here */
</style>
