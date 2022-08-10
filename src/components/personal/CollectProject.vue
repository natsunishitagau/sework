<template>
    <div>
        <header>我的收藏</header>
        <hr/>

        <div v-if="tableData.length == 0">
            <el-empty :image="noRes" description="暂无项目"></el-empty>
        </div>

        <div v-else>

            <el-table :data="tableData" max-height="550" borderstyle="width:100%">
                <el-table-column label="项目名称" width="400">
                    <template #default="scope">
                        <a :title="scope.row.name"
                           @click="lookPro(scope.row)">
                            {{scope.row.name}}
                        </a>
                    </template>
                </el-table-column>
                <el-table-column prop="team" label="所属团队"></el-table-column>

                <el-table-column fixed="right" width="300" label="操作">
                    <template #default="scope">
                        <div @mouseenter="op(scope.row)">
                            <span class="op" @click="cancel">
                              <i class="el-icon-star-on"></i>取消收藏
                            </span>
                        </div>
                    </template>
                </el-table-column>

            </el-table>

        </div>

    </div>

</template>

<script>
import noResult from "../../../public/noResult.png";
export default {
    name: "collectProject",
    data() {
        return {
            form: {
                email: "",
                groupName: "",
                proName: ""
            },
            tableData: [],
            noRes: noResult,
        }
    },
    methods: {
        getInfo() {
            var that=this;
            this.tableData=[];
            this.$axios.post('/user/checkCollections/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    var i;
                    for(i=0;i<res.data.proNames.length;i++)
                    {
                        var pro={name:"",team:""};
                        pro.name=res.data.proNames[i];
                        pro.team=res.data.groups[i];
                        that.tableData.push(pro);
                    }
                })
        },
        op(item) {
            this.form.proName=item.name;
            this.form.groupName=item.team;
        },
        lookPro(pro) {
            const that = this
            sessionStorage.setItem('project',pro.name)
            sessionStorage.setItem('group', pro.team)
            that.$router.push({name:'prototype'})
        },
        cancel() {
            var that=this;
            this.$axios.post('/group/cancelCollection/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    that.$message.success("取消收藏成功！");
                    that.getInfo();
                })
        }
    },
    created() {
        this.form.email=sessionStorage.getItem("email");
        this.form.groupName=sessionStorage.getItem("group");
        this.getInfo();
    }
}
</script>

<style scoped>
    header
    {
        text-align: left;
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 20px;
        font-family: Mulish;
    }
    i
    {
        font-size: 15px;;
        height: 20px;
        width: 20px;
    }
    a:hover{
        color: #00c3ff;
        cursor: pointer;
    }
    .op
    {
        font-size: 13px;
        cursor: pointer;
    }
    .op:hover
    {
        color: rgb(0, 162, 255);
    }

</style>
