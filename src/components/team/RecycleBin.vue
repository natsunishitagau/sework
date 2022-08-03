<template>
  <div>
    <header>回收站</header>
    <hr/>

    <div>
      <el-table :data="tableData" height="550" borderstyle="width:100%">
        <el-table-column label="项目名" width="400">
          <template #default="scope">
            <a :title="scope.row.name"
              @click="lookInfo(scope.row)">
            {{scope.row.name}}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="删除时间"></el-table-column>

        <el-table-column fixed="right" width="300" label="操作">
          <template #default="scope">
            <div @mouseenter="op(scope.row.name)">
              <span class="op" @click="reNew">恢复</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="op" @click="realDel">彻底删除</span>
            </div>
          </template>
        </el-table-column>

      </el-table>

    </div>

  </div>

</template>

<script>
export default {
  name: "recycleBin",
  data() {
    return {
      form: {
        email: "",
        groupName: "",
        proName: ""
      },
      tableData: []
    }
  },
  methods: {
    getInfo() {
      var that=this;
      this.tableData=[];
      this.$axios.post('/group/checkRecycleBin/',this.$qs.stringify(this.form))
      .then(res =>{
        console.log(res);
        var i;
        for(i=0;i<res.data.proNames.length;i++)
        {
          var pro={name:"",time:""};
          pro.name=res.data.proNames[i];
          pro.time=res.data.deleteTimes[i];
          that.tableData.push(pro);
        }
      })
    },
    op(name) {
      this.form.proName=name;
    },
    reNew() {
      var that=this;
      this.$axios.post('/group/recoverProject/',this.$qs.stringify(this.form))
      .then(res =>{
        console.log(res);
        that.$message.success("恢复项目成功！");
        that.getInfo();
      })
    },
    realDel() {
      var that=this;
      this.$axios.post('/group/removeProject/',this.$qs.stringify(this.form))
      .then(res =>{
        console.log(res);
        that.$message.success("删除项目成功！");
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
  hr
  {
    border: none;
    height: 1px;
    background-color: var(--el-border-color);
  }
  .op
  {
    font-size: 13px;
    cursor: pointer;
  }
  .op:hover
  {
    color: rgb(0, 162, 255);
    text-underline-offset: 1px;
    text-decoration: underline;
  }
</style>