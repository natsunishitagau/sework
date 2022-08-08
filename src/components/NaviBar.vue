<template>

    <div class="naviBar">
        <div class="flex-grow">
            <img src="../../public/icon.png" style="width: 50px;height: 50px;"/>
        </div>
        <div class="avatar" @mouseenter="LookIn" @mouseleave="LookOut">
            <img :src="avatarSrc" :style="imgSize" alt=""/>
        </div>
        <div class="info" @mouseenter="LookIn" @mouseleave="LookOut" v-show="isLookInfo">
            <div class="userInfo">
                <div>{{userName}}</div>
                <div @click="userClick"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"></path></svg>
                    &nbsp;个人中心
                    <svg class="arow" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"></path></svg>
                </div>
                <hr/>
                <div @click="logOut"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512z"></path><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path></svg>
                    &nbsp;注销账号
                </div>
            </div>
        </div>
        <ul v-if="isLogin">
            <li v-for="v of items.length" :key="v" @click="enter(v-1)">
                <span>{{items[v-1]}}</span>
            </li>
        </ul>
        <div v-else>
            <div class="login" @click="logIn">登录&nbsp;/&nbsp;注册</div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'NaviBar',
    data() {
        return {
            isLogin: false,
            userName: "user",
            defaultSrc: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            avatarSrc: '',
            isLookInfo: false,
            imgSize: "height:45px;width:45px",
            links: ["workSpace"],
            items: ["消息"],
            DialogVisible: false,
            newAvatarSrc: '',
        }
    },
    components: {
    },
    methods: {
        getInfo() {
            this.isLogin=sessionStorage.getItem("isLogin");
            if(this.isLogin)
            {
                this.avatarSrc=sessionStorage.getItem('src');
                this.userName =sessionStorage.getItem("nickname");
            }
            else this.avatarSrc=this.defaultSrc;
        },
        LookIn() {
            if(this.isLogin)
            {
                this.isLookInfo=true;
                this.imgSize="margin-top:60px;height:70px;width:70px";
            }
        },
        LookOut() {
            this.isLookInfo=false;
            this.imgSize="height:45px;width:45px";
        },
        logIn() {
            this.$router.push("login");
        },
        logOut() {
            this.isLogin=false;
            this.LookOut();
            this.avatarSrc=this.defaultSrc;
            this.$message.success("注销成功！")
            sessionStorage.setItem("isLogin","");
            location.reload();
        },
        userClick() {
            sessionStorage.setItem('destination',"userinfo")
            this.$router.push("workSpace/recentLook");
        },
        enter(i) {
            if(i==0){
                sessionStorage.setItem('destination',"message")
            }
            this.$router.push(this.links[i]);
        }
    },
    created() {
        this.getInfo();
    },
    watch: {
        $route: {
            handler: function(val){
                if(val.path==="/home")
                    this.getInfo();
            },
            deep: true
        },
    }
}
</script>

<style scoped>
.flex-grow {
    float: left;
    font-size: 30px;
    margin-left: 20px;
    color: #303133;
    font-weight: bolder;
}
.flex-grow:hover {
    cursor: pointer;
}
svg
{
    height: 18px;
    width: 18px;
}
.naviBar
{
    position: fixed;
    top: 0;
    display: flex;
    height: 70px;
    align-items: center;
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    width: 100%;
    min-width: 1500px;
}
.flex-grow
{
    flex-grow: 1;
}
.avatar
{
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 70px;
}
.avatar img
{
    height: 45px;
    width: 45px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s ease;
    z-index: 1000;
}
/*
.avatar img:hover
{
  padding-top: 60px;
  height: 70px;
  width: 70px;
  transition: all 0.3s ease;
}
*/
.info
{
    position: fixed;
    border: 1px solid rgb(222, 222, 222);
    background-color: white;
    padding: 45px 20px 15px 20px;
    top: 70px;
    right: 20px;
    margin-top: -6px;
    width: 260px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: 600;
    z-index: 900;
    cursor: pointer;
}
.userInfo div
{
    display: flex;
    align-items: center;
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    padding: 10px;
    margin: 2px 8px;
    border-radius: 8px;
}
.userInfo div:nth-child(1)
{
    display: block;
    text-align: center;
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 10px;
}
.userInfo div:nth-child(2):hover,
.userInfo div:nth-child(4):hover
{
    background-color: rgb(240, 240, 240);
}
.login
{
    font-weight: 300;
    font-size: 17px;
    width: 160px;
    margin-right: 20px;
    cursor: pointer;
    user-select: none;
    -webkit-user-select:none;
}
.login:hover
{
    text-decoration: underline;
    text-underline-offset: 2px;
}
.arow
{
    height: 15px;
    width: 15px;
    padding-left: 60px;
}
ul{margin-right:20px}
li
{
    float: left;
    padding: 0 20px;
    text-align: center;
    height: 70px;
    line-height: 70px;
    cursor: pointer;
}
li:hover
{
    background-color: rgb(222, 222, 222);
}
</style>
