<template>
    <button class="toggle-switch" :class="{ 'active': isDarkMode }" @click="toggleMode">
      <span class="switch-circle"></span>
    </button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDarkMode: false, // default to light mode
      };
    },
    methods: {
      toggleMode() {
        this.isDarkMode = !this.isDarkMode;
        // Emit an event to notify parent component
        this.$emit('modeChanged', this.isDarkMode);
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
  @import '../../variables'; 
  
  .toggle-switch {
    background-color: $purple-light;
    border: none;
    border-radius: 9999px;
    width: 50px; 
    height: 25px; 
    padding: 5px; 
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
    cursor: pointer;
    &.active {
      background-color: $purple-dark;
    }
  }
  
  .switch-circle {
    background-color: $white-light; 
    border-radius: 50%;
    width: 20px;
    height: 20px; 
    transition: transform 0.3s;
    &.active {
      background-color: $white-dark;
    }
  }

.toggle-switch.active .switch-circle {
  transform: translateX(25px); 
}
  </style>