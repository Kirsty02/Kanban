<template>
    <div class="sidebar-div">
        <img class="logo" src="/assets/logo-dark.svg" alt="Top Logo">
        <div class="sidebar-flex">
            <div class="top-box">
                <div class="boards-flex"> 
                    <h2 class="heading-s">  ALL BOARDS (3) </h2>
                    <div class="board-item"> 
                        <img  src="/assets/icon-board.svg" alt="Top Logo">
                        <h2>Board 1</h2>
                    </div>

                </div>

            </div>
            <div>
                
                <h1>bottom</h1>

            </div>

        </div>

    </div>
</template>

<script>

</script>

<style scoped lang="scss">
@import '../../sass/variables';
.sidebar-div{
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background-color: $white-light;
    border-right: 2px solid $white-dark;
}

.logo{
    position: absolute;
    padding-top: 2rem;
    padding-left: 2rem;
}
.sidebar-flex{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 112px;
}

.top-box{
    margin-top: 2rem;
    margin-left:2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;

}

.boards-flex{
    display: flex;
    flex-direction: column;
}

.board-item{
    display: flex;
    background-color: $purple-dark;
    align-content: center;
    padding: 10px;
    color: $white-light;
    gap: 1rem;
}
.board-item h2{
    font-size: 15px;
    margin-bottom: 0;
}
</style>
