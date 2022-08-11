<template>
    <div class="container">
        <NaviBar style="position: absolute;z-index: 5;background: white"></NaviBar>
        <div class="body">
            <div class="app">
                <div class="part1">
                    <img src="../../public/icon.png" alt="" style="margin-left:-100px;margin-top:100px;float:left">
                    <img src="../../public/pic1.png" alt="" v-if="loc===0" style="width: 100%;height: 100%;position: absolute;width: 576px;height: 300px;left: 750px;top: 200px;">
                    <img src="../../public/pic2.png" alt="" v-else-if="loc===1" style="width: 100%;height: 100%;position: absolute;width: 576px;height: 300px;left: 750px;top: 200px;">
                    <img src="../../public/pic3.png" alt="" v-else-if="loc===2" style="width: 100%;height: 100%;position: absolute;width: 576px;height: 300px;left: 750px;top: 200px;">
                    <img src="../../public/pic4.png" alt="" v-else-if="loc===3" style="width: 100%;height: 100%;position: absolute;width: 576px;height: 300px;left: 750px;top: 200px;">
                    <button class="button1" type="button" @click="judgeJump()" v-show="isShow">开始使用</button>
                    <div class="leftRow" @click="moveLeft" v-show="loc!==0">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"></path></svg>
                    </div>
                    <div class="rightRow" @click="moveRight" v-show="loc!==3">
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NaviBar from "./NaviBar.vue";
export default {
    name: 'HomePage',
    data() {
        return {
            email: "",
            isShow: false,
            loc:0
        }
    },
    components: {
        NaviBar
    },
    methods: {
        judgeJump(){
            this.$router.push({name:'login'})
        },
        moveLeft(){
            if(this.loc>0){
                this.loc--;
            }
        },
        moveRight(){
            if(this.loc<3){
                this.loc++
            }
        }
    },
    created() {
        if(sessionStorage.getItem('isLogin')){
            this.isShow=false
        }else{
            this.isShow=true
        }
    }
}
</script>

<style scoped>
.leftRow{
    position: absolute;
    z-index: 5;
    top: 340px;
    left: 750px;
    width: 30px;
    height: 30px;
}
.rightRow{
    position: absolute;
    z-index: 5;
    top: 340px;
    left: 1295px;
    width: 30px;
    height: 30px;
}
.leftRow:hover,.rightRow:hover{
    background-color: gray;
}
.welcomePart{
    width: 100vw;
    height: 100vh;
    background: url("../../public/pic1.png") no-repeat;
    background-size: 100vw 100vh;
}
.container {
    overflow-y: auto;
    height: 100%;
    display: flex;
}
.container{
    position: absolute;
}
.character1{
    padding-left: 500px;
    padding-top: 250px;
    font-size: 50px;
    font-weight: bolder;
}
.character2{
    padding-left: 500px;
    padding-top: 30px;
    font-size: 30px;
    font-weight: lighter;
}
.character3{
    font-size: 50px;
    font-weight: bolder;
    padding-left: -100px;
    padding-top: 50px;
}
.button1{
    font-size: 20px;
    font-weight: lighter;
    color: white;
    background: #303133;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    border: none;
    top: 75%;
    left: 45%;
    position: relative;

}
.button1:hover{
    cursor: pointer;
    background: #606266;
}
div {
    display: block;
}
.body {
    overflow-y: auto;
    width: 100vw;
    height: 100%;
    display: block;
    margin: 0;
    padding: 0;
    background: rgba(68,138,255,.05);
}
.app{
    height: 100%;
    overflow-y: auto;
    font-family: Avenir,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
}
.part1{
    padding-top: 10vh;
    padding-left: 20vw;
    position: relative;
    float: left;
    height: 100%;
}
.part2{
    position: relative;
    float: left;
    padding-top: 10vh;
    padding-left: 50vw;
    height: 100%;
    background: url("../../public/icon.png") no-repeat;
}
.top-part{
    padding-top: 30px;
    padding-left: 30px;
    z-index: 10;
    position: fixed;
}
.clear{
    clear: both;
}
.part3 {
    perspective: none;
    transform-style: preserve-3d;
}
.part3,.front,.back {
    width: 1000px;
    height: 1000px;
}
.flip{
    position: relative;
    transition: 0.6s;
    transform-style: preserve-3d;
}
.front,.back{
    position: absolute;
    top: 0px;
    left: 0px;
    backface-visibility: hidden;
}
.front{
    z-index: 2;
}
.back{
    transform: rotateY(-180deg);
}
.part3:hover .flip{
    transform: rotateY(180deg);
}
</style>
