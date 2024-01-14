<template>
    <div class="delete-container">
        <h2 class="heading-l">Delete this board? </h2>
        <p class="body-l"> 
            Are you sure you want to delete the ‘Platform Launch’ 
            board? This action will remove all columns and tasks and 
            cannot be reversed.
        </p>
        <div class="button-bottom-flex"> 
            <button class="btn-destructive"> Delete</button>
            <button class="btn-secondary"> Cancel</button>
        </div>

    </div>
    
</template>

<script>

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