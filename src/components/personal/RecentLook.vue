<template>

  <div>
    <header>最近浏览</header>
    <hr/>
    <div v-if="tableData.length == 0">
      <el-empty description="暂无项目"></el-empty>
    </div>

    <div v-else>
      <el-table :data="tableData" height="500" borderstyle="width:100%">
        <el-table-column label="项目名称" width="360">
          <template #default="scope">
            <a :title="scope.row.proName" target="_self"
              @click="lookPro(scope.row)">
            {{scope.row.proName}}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="group" label="所属团队" width="320"></el-table-column>
        <el-table-column prop="time" label="浏览时间" sortable sort-by="time"></el-table-column>
        
      </el-table>
    </div>

  </div>

</template>

<script>
export default {
  name: 'recentLook',
  data() {
    return {
      form: {
        email: "",

      },
      tableData: [
        {
          proName:"12",
          group:"myteam",
          time:"20220319"
        }
      ]
    }
  },
  methods: {
    lookPro(pro) {
      //
      console.log(pro)
    }
  },
  created() {
    this.form.email=sessionStorage.getItem("email");
    var that=this;
    this.$axios.post('/user/checkBrowseProject/',this.$qs.stringify(this.form))
    .then(res =>{
      console.log(res);
      var i;
      for(i=0;i<res.data.groups.length;i++)
      {
        var group={proName:"",group:"",time:""};
        group.proName=res.data.proNames[i];
        group.group =res.data.groups[i];
        group.time =res.data.checkTimes[i];
        that.tableData.push(group);
      }
    })
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

</style>
