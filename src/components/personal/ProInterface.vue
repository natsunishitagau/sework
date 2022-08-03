<template>
  <div>
    <button class="prototypeButton" type="button" @click="getPrototype()">项目原型</button>
    <hr>
    <button class="createButton" type="button" @click="newPrototype" v-show="showPrototype">创建原型</button>
    <el-table :data="prototypes.protoNames" style="width: 100%" v-show="showPrototype">
      <el-table-column label="创建日期" width="400">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ prototypes.createTimes[scope.$index] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="原型名称" width="400">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>名称: {{ scope.row }}</div>
              <div>创建日期: {{ prototypes.createTimes[scope.$index]}}</div>
            </template>
            <template #reference>
              <el-tag>{{ scope.row }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="创建原型" v-model="dialogVisible" width="35%" :modal-append-to-body="false" center @close="dialogClosed" style="display: flex">
    <el-form :model="insertData" label-width="120px">
      <el-form-item label="原型名称：">
        <el-input v-model="insertData.protoName" />
      </el-form-item>
      <el-form-item label="画布高：">
        <el-input v-model="insertData.canvasHeight" />
      </el-form-item>
      <el-form-item label="画布宽：">
        <el-input v-model="insertData.canvasWidth"/>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="danger" @click="dialogClosed" :icon="Delete" circle style="width: 40px;height: 40px;-webkit-border-radius: 80px;float: left; margin-left: 100px">删除</el-button>
      <el-button type="primary" @click="createPrototype()" style="width: 80px; height: 40px;margin:0 auto">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ProInterface",
  components: {
  },
  data(){
    return{
      insertData:{
        protoName: '',
        canvasHeight: 1200,
        canvasWidth: 1200,
      },
      prototypes:{
        protoNames:['a'],
        createTimes:['1999-02-02']
      },
      showPrototype:false,
      dialogVisible:false
    }
  },
  methods:{
    getPrototype(){
      const that = this
      this.$axios.post('/project/checkPrototypes/',this.$qs.stringify({
        email: "1055045278@qq.com",
        groupName: sessionStorage.getItem('group'),
        proName: sessionStorage.getItem('project')
      })).then(res => {
        console.log(res)
        if(res.data.result === 0){
          that.prototypes.protoNames = res.data.protoNames
          that.prototypes.createTimes = res.data.createTimes
          that.showPrototype = true
        }
      })
    },
    dialogClosed(){
      const that = this
      that.dialogVisible = false
    },
    newPrototype(){
      const that = this
      that.dialogVisible = true
    },
    createPrototype(){
      const that = this
      if(that.insertData.protoName.length!==0){
        this.$axios.post('/project/createPrototype/',this.$qs.stringify({
          email: sessionStorage.getItem('email'),
          groupName: sessionStorage.getItem('group'),
          proName: sessionStorage.getItem('project'),
          protoName:that.insertData.protoName,
          canvasData:"",
          canvasStyle:"",
          canvasHeight:that.insertData.canvasHeight,
          canvasWidth:that.insertData.canvasWidth
        })).then(res => {
          console.log(res)
          if(res.data.result === 0){
            that.$message.success("创建成功")
            this.$axios.post('/project/checkPrototypes/',this.$qs.stringify({
              email: sessionStorage.getItem("email"),
              groupName: sessionStorage.getItem('group'),
              proName: sessionStorage.getItem('project')
            })).then(res => {
              console.log(res)
              if(res.data.result === 0){
                that.prototypes.protoNames = res.data.protoNames
                that.prototypes.createTimes = res.data.createTimes
                that.showPrototype = true
              }
            })
            that.dialogVisible = false
          }else if(res.data.result === 1){
            that.$message.error("错误的请求")
          }else{
            that.$message.error("原型名称已存在")
          }
        })
      }
    },
    // handleEdit(index,protoName){
    //   const that = this
    //   this.$axios.post('project/checkPrototype/', this.$qs.stringify({
    //     email: sessionStorage.getItem('email'),
    //     groupName: sessionStorage.getItem('group'),
    //     proName: sessionStorage.getItem('project'),
    //     protoName: protoName
    //   })).then(res => {
    //     console.log(res)
    //     if(res.data.result === 0){
    //       sessionStorage.setItem("canvasData", res.data.canvasData)
    //
    //     }
    //   })
    // },
    handleDelete(index, protoName){
      const that = this
      this.$axios.post('/project/removePrototype/', this.$qs.stringify({
        email: sessionStorage.getItem('email'),
        groupName: sessionStorage.getItem('group'),
        proName: sessionStorage.getItem('project'),
        protoName: protoName
      })).then(res => {
        console.log(res)
        if(res.data.result === 0){
          that.$message.success("删除项目成功")
        }else{
          that.$message.error("请求错误")
        }
        this.$axios.post('/project/checkPrototypes/',this.$qs.stringify({
          email: sessionStorage.getItem("email"),
          groupName: sessionStorage.getItem('group'),
          proName: sessionStorage.getItem('project')
        })).then(res => {
          console.log(res)
          if(res.data.result === 0){
            that.prototypes.protoNames = res.data.protoNames
            that.prototypes.createTimes = res.data.createTimes
            that.showPrototype = true
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.prototypeButton
{
  background: none;
  float: top;
  text-align: left;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
  font-family: Mulish;
  border: none;
}
.prototypeButton:hover ,.createButton:hover{
  cursor: pointer;
  background: rgb(222, 222, 222);
}
.createButton{
  background: none;
  float: right;
  font-family: Mulish;
  font-size: 15px;
  border: none;
}
hr
{
  border: none;
  height: 1px;
  background-color: var(--el-border-color);
}
.main{
  float: top;
}
.left-part{
  float: left;
  height: 100vh;
  width: 10vw;
}
.main-part{
  float: right;
  width: 40vw;
  height: 100vh;
  background: rgb(247, 247, 249);
}
.main-top{
  width: 100%;
  height: 80px;
  background: #00c3ff;
  margin-bottom: 10px;
}
.main-bottom{
  width: 100%;
  height: fit-content;
  background: red;
}
</style>