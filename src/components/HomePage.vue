<template>
    <div class="container">
        <NaviBar></NaviBar>
        <div class="body">
            <div class="app">
                <div class="part1">
                    <img src="../../public/icon.png"  alt="" style="margin-left:-100px;margin-top:150px;float:left">
                    <p class="character1">欢迎来到墨书</p>
                    <p class="character2">一个助您高效协作的平台</p>
                    <button class="button1" type="button" @click="judgeJump()" v-show="isShow">开始使用</button>
                </div>
                <div class="clear"></div>
                <div class="part2">
                    <p class="character3">墨书功能介绍:</p>
                    <ul>
                        <li style="font-size:30px;font-weight:bolder;margin-top:50px">管理团队</li>
                        <li style="font-size:30px;font-weight:bolder">执行项目</li>
                    </ul>
                </div>
                <div class="clear"></div>
                <div class="part3">
                    <div class="flip">
                        <div class="front">
                            <img src="../../public/gif1.gif" alt="">
                        </div>
                        <div class="back">
                            <img src="../../public/gif2.gif" alt="" style="width:1000px;height:1000px">
                        </div>
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
        }
    },
    components: {
        NaviBar
    },
    methods: {
        judgeJump(){
            this.$router.push({name:'login'})
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
    top: 60%;
    left: 80%;
    position: absolute;
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
