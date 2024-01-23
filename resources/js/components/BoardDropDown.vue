<template> 
    <div class="drop-down-conatiner"> 
        <p class="body-l edit-p"> Edit Board</p>
        <p class="body-l delete-p" @click="toggleDeleteBoard(); toggleBoardDropDown();" > Delete Board</p>
    </div>

</template>

<script>
import {mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations(['toggleDeleteBoard', 'toggleBoardDropDown']),
    }
};
</script>

<style lang="scss">
@import '../../sass/variables';


.drop-down-conatiner{
    position: absolute;
    right: 2rem;
    top: 7rem;
    border-radius: 8px;
    width: 128px;
    height: 62px;
    padding: 16px;
    background-color: $white-light;
    z-index: 999;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.edit-p{
    color: $platinum-light;
}

.delete-p{
    color: $salmon-dark;
}


.edit-p:hover, .delete-p:hover{
    font-weight: bolder;
    cursor: pointer;
}

</style>