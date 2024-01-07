<template>
    <div class="header-div">
        <div class="header-flex"> 
            
            <h1 class="heading-xl">Platform Launch</h1>
           
            <div class="side-flex">
                <button class="btn-primary-s"> + Add New Item</button>
                <img src="/assets/icon-vertical-ellipsis.svg" alt="Board Icon">
            </div>
        </div>  
    </div>
</template>

<script>

</script>

<style scoped>
.header-div{
    position: absolute;
    top: 0;
    left: 300px;
    height: 96px;
    width: calc(100vw - 300px);
    background-color: white;
}

.header-flex{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 32px;
    padding-right: 32px;
}
.side-flex{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
}

.btn-primary-s{
    width: 164px;
}
</style>
