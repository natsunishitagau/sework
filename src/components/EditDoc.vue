<template>
  <div>

    <header>
      <span>文档编辑</span>
      <div>

        <span class="mess" @click="saveText">
          <i class="el-icon-s-order"></i>
          <span>保存文档</span>
        </span>

        <span class="mess" @click="back">
          <i class="el-icon-refresh-left"></i>
          <span>返回</span>
        </span>

      </div>
    </header>

    <div style="border: 1px solid #ccc; margin-top: 10px;">
      <!-- 工具栏 -->
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
      />
      <!-- 编辑器 -->
      <Editor
        style="height: 550px; overflow-y: hidden;"
        :defaultConfig="editorConfig"
        v-model="html"
        @onChange="onChange"
        @onCreated="onCreated"
      />
    </div>

  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  name: 'editDoc',
  components: { Editor, Toolbar },
  data() {
    return {
      form: {
        email: "",
        groupName: "",
        proName: "",
        docName: "",
        content: ""
      },
      editor: null,
      html: '',
      toolbarConfig: {
          // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
          // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
        placeholder: '请输入内容...',
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {}
      }
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
      console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
    },
    saveText() {
      const editor = this.editor;
      console.log(editor.getHtml());
      this.form.content=editor.getHtml();
      var that=this;
      this.$axios.post('/project/saveDocument/',this.$qs.stringify(this.form))
      .then(res =>{
        that.$message.success("保存成功")
      })
    },
    back() {
      this.$router.push({name:'proInterface'})
    }
  },
  mounted() { //ctrl+s保存
    var that=this;
    document.onkeydown = function(e) {
    let key = window.event.keyCode;
    if (key== 83 && e.ctrlKey) {//== 83 && event.ctrlKey
          window.event.preventDefault() //关闭浏览器快捷键
          that.saveText()//;saveProject
        }
    };
  },
  created() {
    this.form.email=sessionStorage.getItem("email");
    this.form.groupName=sessionStorage.getItem("group");
    this.form.proName=sessionStorage.getItem("project");
    this.form.docName=sessionStorage.getItem("document"); //名称对没
    this.$axios.post('/project/checkDocument/',this.$qs.stringify(this.form))
    .then(res =>{
      this.form.content=res.data.content;
      this.html=res.data.content;
    })
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁 editor
  },
}
</script>

<style scoped>
  i
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
    font-size: 30px;
    font-weight: 700;
  }
  .mess
  {
    display: flex;
    float: left;
    align-items: center;
    margin-left: 10px;
    cursor: pointer;
    padding: 5px 6px;
    border-radius: 5px;
  }
  .mess:hover
  {
    background-color: rgb(240, 240, 240);
  }
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
