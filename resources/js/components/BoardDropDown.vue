<template> 
    <div class="grey-box light" @click=toggleBoardDropDown()> </div> 
    <div class="drop-down-conatiner"> 
        <p class="body-l edit-p"  @click="toggleEditBoard(); toggleBoardDropDown();"> Edit Board</p>
        <p class="body-l delete-p" @click="toggleDeleteBoard(); toggleBoardDropDown();" > Delete Board</p>
    </div>

</template>

<script>
import {mapMutations } from 'vuex';

export default {
    methods: {
        ...mapMutations(['toggleDeleteBoard', 'toggleBoardDropDown', 'toggleEditBoard']),
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
    font-size: 13px;
    margin-bottom: 0.25rem
}

.delete-p{
    color: $salmon-dark;
    font-size: 13px;
    margin-bottom: 0.25rem
}
 .light{
    opacity: 0.1;
 }
.edit-p:hover, .delete-p:hover{
    font-weight: bolder;
    cursor: pointer;
}

</style>