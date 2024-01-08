<template>
    <div :class="['content-div', isDarkMode ? 'content-div-dark' : '']">
        <div class="no-boards-div">
            <h2 class="heading-l">This board is empty. Create a new column to get started.</h2>
            <button class="btn-primary-s"> + Add New Column</button>

        </div>

    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isDarkMode']),
  },
};


</script>

<style scoped lang="scss">
@import '../../sass/variables';

.content-div{
    position: absolute;
    width: calc(100vw - 300px);
    height: calc(100vh - 96px);
    top: 96px;
    left: 300px;
    display: flex;
    align-content: center;
    justify-content: center;
}
.heading-l{
       color: $platinum-light;
}
.no-boards-div{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    text-align: center;
    justify-content: center;
}

//Dark styles
.content-div-dark{
    background-color: $navy-light;
    
}

</style>
