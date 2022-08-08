<template>
    <div>
        <header>
            <span>{{title}}</span>
            <div>
        <span class="ret" @click="ret">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"></path></svg>
          <span>返回</span>
        </span>
            </div>
        </header>
        <hr/>
        <p>发送方：{{sender}}</p>
        <p>{{content}}</p>
        <p></p>
        <span class="agree" @click="enterGroup" v-if="type==0">同意</span>
    </div>
</template>

<script>
export default {
    name: 'messageContent',
    data() {
        return {
            form: {
                email: "",
                ID: "",
                groupName: ""
            },
            content: "",
            title: "",
            sender: "",
            type: ""
        }
    },
    methods: {
        getInfo() {
            var that=this;
            this.$axios.post('/message/checkMessageContent/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.content=res.data.content;
                    that.title=res.data.title;
                    that.sender=res.data.sender;
                    that.type=res.data.type;
                    that.form.groupName=that.sender;
                })
        },
        ret() {
            this.$router.push("messageCheck");
        },
        enterGroup() {
            var that=this;
            this.$axios.post('/message/joinTeam/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    if(res.data.result==0)
                      that.$message.success("加入成功!")
                    else that.$message.warning("已经成功加入!")
                })
        }
    },
    created() {
        this.form.email=sessionStorage.getItem("email");
        this.form.ID=this.$route.params.ID;
        this.getInfo();
    }
}
</script>

<style scoped>
svg
{
    height: 18px;
    margin-right: 4px;
}
header
{
    margin-bottom: 20px;
    font-family: Mulish;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
header>span
{
    font-size: 26px;
    font-weight: 700;
}
.ret
{
    display: flex;
    float: left;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    padding: 5px 6px;
    border-radius: 5px;
}
.ret:hover
{
    background-color: rgb(240, 240, 240);
}
div p
{
    text-align: left;
    padding: 20px 20px;
}
div p:nth-child(2)
{
    text-indent: 32px;
    font-size: 16px;
}
.agree
{
    float:left;
    text-align: center;
    margin-left: 25%;
    height: 36px;
    line-height: 36px;
    width: 120px;
    background-color: #00c3ff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}
.agree:active
{
    background-color: rgb(100, 200, 237);
}
</style>
