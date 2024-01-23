<template>
    <div class="grey-box"  @click="toggleDeleteBoard" > </div>
    <div class="view-widget-modal"> 
        <div class="delete-container">
            <h2 class="heading-l">Delete this board? </h2>
            <p class="body-l"> 
                Are you sure you want to delete the '{{ activeBoard?.name || '' }}'
                board? This action will remove all columns and tasks and 
                cannot be reversed.
            </p>
            <div class="button-bottom-flex"> 
                <button class="btn-destructive" @click="deleteActiveBoard"> Delete</button>
                <button class="btn-secondary"> Cancel</button>
            </div>

        </div>
    </div>
    
</template>

<script>
import {mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed:{
        ...mapGetters(['activeBoard', 'isMobileView']),
    },
    methods: {
        ...mapMutations(['toggleDeleteBoard']),
        ...mapActions(['fetchBoards']),
        deleteActiveBoard() {
            if (this.activeBoard && this.activeBoard.board_id) {
                this.$store.dispatch('deleteBoard', this.activeBoard.board_id)
                    .then(() => {
                        this.toggleDeleteBoard();
                        this.fetchBoards();
                        
                    });
            }
        },
    },
    mounted() {
    console.log('Active Board:', this.activeBoard);
}

};

</script>

<style lang="scss">
@import '../../sass/variables';

.delete-container{
    display: flex;
    flex-direction: column;
    padding: 2rem;
    border-radius: 6px;
    gap: 24px;
    width: 416px;
    background-color: white;
    .body-l{
        color: $platinum-light;
    }
    .heading-l{
        color:  $salmon-dark;
    }
}

.button-bottom-flex{
    display: flex;
    gap: .5rem;
    justify-content: center;
    align-items: center;
    .btn-destructive, .btn-secondary{
        flex-shrink: 1;
    }
    
}


</style>