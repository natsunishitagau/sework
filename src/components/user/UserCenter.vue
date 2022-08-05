<template>
<div>
    <div class="navi" :style="width">
        <ul>
            <li v-for="v of items.length" :key="v" @click="enter(v-1)">
                <svg v-if="v==4" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 64a64 64 0 0 1 64 64v64H448v-64a64 64 0 0 1 64-64z"></path><path fill="currentColor" d="M256 768h512V448a256 256 0 1 0-512 0v320zm256-640a320 320 0 0 1 320 320v384H192V448a320 320 0 0 1 320-320z"></path><path fill="currentColor" d="M96 768h832q32 0 32 32t-32 32H96q-32 0-32-32t32-32zm352 128h128a64 64 0 0 1-128 0z"></path></svg>
                {{items[v-1]}}
            </li>
        </ul>
        <span class="indicator" :style="indicate"></span>
        <span class="separate"></span>
        <span class="avatar">
      <img :src="avatarSrc"/>
    </span>
        <div @click="logOut" class="logout">注销</div>
    </div>
    <div class="back">
        <div class="white">
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'UserCenter',
    data() {
        return {
            avatarSrc: "",
            items: ["工作台","个人信息","修改密码","消息"],
            links: ["workSpace","userInfo","changePwd","messageCheck"],
            indPos: ["display:none","left:548px;width:94px","left:688px;width:94px","left:832px;width:80px"],
            indicate: "",
            width: ""
        }
    },
    components: {

    },
    methods: {
        getInfo() {
            this.avatarSrc=sessionStorage.getItem("src");
            this.width="min-width: "+window.innerWidth+"px";
        },
        logOut() {
            sessionStorage.setItem("isLogin","");
            this.$router.push("/home");
        },
        enter(i) {
            this.indicate=this.indPos[i];
            if(this.$router.currentRoute.path !== ('/userCenter/'+this.links[i])) {
                if (i == 0) {
                    sessionStorage.setItem('mode', '0')
                }
                this.$router.push({ name: this.links[i] });
            }
        }
    },
    created() {
        this.getInfo();
    },
    watch: {
        $route: {
            handler: function(val){
                if(val.path=="/userCenter/userInfo")
                    this.getInfo();
            },
            deep: true
        },
    }
}
</script>

<style scoped>
svg
{
    height: 17px;
    padding-right: 4px;
}
.navi
{
    position: fixed;
    top: 0px;
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    width: 100%;
}
li
{
    float: left;
    line-height: 60px;
    padding: 0 20px;
    margin: 0 20px;
    font-size: 15px;
    color: #4d4c4c;
    cursor: pointer;
}
li:hover,.logout:hover
{
    color: black;
}
ul li:nth-child(4)
{
    display: flex;
    align-items: center;
}
.indicator
{
    position: absolute;
    bottom: 0;
    border-bottom: 2px solid rgb(59, 89, 238);
    display: inline-block;
    transition: all 0.2s ease-out;
}
.separate
{
    border-left: 1px solid rgb(220,223,230);
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    margin-left: 6%;
    margin-right: 20px;
    cursor: default;
    height: 70%;
}
.avatar
{
    display: flex;
    align-items: center;
}
.avatar img
{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.logout
{
    margin-left:20px;
    font-size: 15px;
    color: #4d4c4c;
    cursor: pointer;
}
.back
{
    margin-top: 60px;
    display: flex;
    justify-content: center;
    background-color: #f5f5f5;
    min-height: 660px;
}
.white
{
    border-radius: 10px;
    width: 1000px;
    margin: 20px 0 20px;
    padding: 30px 40px;
    background-color: white;
    box-shadow: #27364e14 0px 2px 7px 0px
}
</style>
