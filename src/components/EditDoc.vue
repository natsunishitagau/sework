<template>
  <div>
      <el-header style="display: block">
          <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              background-color="#FFF"
              style="padding-left: 10%; padding-right: 10%">

              <el-menu-item @click="goBack"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></svg></el-menu-item>
              <el-menu-item index="myProject" >项目名称: {{form.proName}}</el-menu-item>
<!--              <el-menu-item index="2">文档名称: {{form.docName}}</el-menu-item>-->
<!--              <el-menu-item index="3" @click="newDoc">创建文档</el-menu-item>-->
<!--              <el-menu-item @click="gotoCenter()">个人中心</el-menu-item>-->
              <el-menu-item index="avatar" style="float: right;margin-right: -60px">
                  <el-avatar :src="oldAvatar"></el-avatar>
              </el-menu-item>
              <el-menu-item @click="gotoProto" style="margin-left: 400px">项目原型</el-menu-item>
              <el-menu-item >项目文档</el-menu-item>
              <el-menu-item @click="gotoUml">UML图</el-menu-item>
              <el-menu-item @click="logout" style="float: right;margin-left: 200px">退出登录</el-menu-item>
          </el-menu>
      </el-header>
      <svg class="icon1" style="width: 15px;height: 15px;position: absolute; top:22px;left:30px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></svg>
      <div style="position: absolute;left: 400px;top: 20px">文档名称：{{form.docName}}</div>
      <header>
        <div class="floatWindow" style="position: absolute; z-index: 5;top: 70px">
            <template>
                <el-table
                    height="600"
                    :data="docNames"
                    style="width: 230px">
                    <el-table-column
                        label="文档"
                        width="150">
                        <template slot-scope="scope">
                            <span class="tableRow" @click="chooseDoc(scope.row)">{{scope.row}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="" width="80">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="sign1" @click="newDoc"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"></path></svg></div>
            </template>
        </div>


      <span style="margin-left: 300px">文档编辑</span>

      <div>

        <span class="mess" @click="saveText">
          <i class="el-icon-s-order"></i>
          <span>保存文档</span>
        </span>

        <span class="export">
          <el-dropdown trigger="click" @command="exportText">
            <el-button type="text" size="medium">
              <i class="el-icon-printer"></i>&nbsp;导出为
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">word</el-dropdown-item>
              <el-dropdown-item command="b">pdf</el-dropdown-item>
              <el-dropdown-item command="c">markdown</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>


      </div>
    </header>

    <div v-if="form.docName!==' '" style="border: 1px solid #ccc; margin-top: 10px;margin-left: 300px;margin-right: 20px">
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
      <el-dialog class="dialog2" title="创建文档" v-if="dialogVisible" :visible.sync="dialogVisible" width="35%" :modal-append-to-body="false" center @close="dialogClosed" style="display: flex;height: 450px">
          <el-form :model="insertData" label-width="120px">
              <el-form-item label="文档名称：">
                  <el-input v-model="insertData.docName" />
              </el-form-item>

              <el-form-item label="文档模板：">
                <el-select v-model="model" placeholder="无模板">
                  <el-option label="无模板" value="0"></el-option>
                  <el-option label="产品需求文档模板" value="a"></el-option>
                  <el-option label="工作周报模板" value="b"></el-option>
                  <el-option label="会议纪要模板" value="c"></el-option>
                  <el-option label="项目规划模板" value="d"></el-option>
                  <el-option label="项目管理模板" value="e"></el-option>
                </el-select>
              </el-form-item>

          </el-form>
          <div style="text-align: center;">
              <el-button type="danger" @click="dialogClosed" circle style="width: 40px;height: 40px;-webkit-border-radius: 80px;float: left; margin-left: 100px;">取消</el-button>
              <el-button type="primary" @click="createDocument()" style="width: 80px; height: 40px;margin:0 auto;">保存</el-button>
          </div>
      </el-dialog>

    <div v-html="printContent" style="display:none" id="print-pdf">
    </div>

  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import htmlDocx from 'html-docx-js/dist/html-docx';
import saveAs from 'file-saver';
import htmlPdf from '../utils/pdf.js';

export default {
  name: 'editDoc',
  components: { Editor, Toolbar },
  data() {
    return {
        insertData:{
            protoName: '',
            canvasHeight: 1200,
            canvasWidth: 1200,
        },
        dialogVisible:false,
        isWindowShow:true,
        docNames:[],
        activeIndex: 'myProject',
        oldAvatar: window.sessionStorage.getItem('src'),
      form: {
        email: "",
        groupName: "",
        proName: "",
        docName: " ",
        content: "",
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
      },
      editTime: null,
      printContent: "",
      model: "0",
      model1:
      "<p><strong>产品需求文档</strong></p><p style='text-align: left;'><strong>前言</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='1134'>在空行输入'/高亮块' 插入高亮块，突出显示重点信息</td></tr></tbody></table><p style='text-align: left;'><strong>一、 版本信息</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='378'></td><td colSpan='1' rowSpan='1' width='378'></td><td colSpan='1' rowSpan='1' width='378'></td></tr><tr><td colSpan='1' rowSpan='1' width='346'>版本号：</td></tr><tr><td colSpan='1' rowSpan='1' width='346'>创建日期</td></tr><tr><td colSpan='1' rowSpan='1' width='346'>审核人</td></tr></tbody></table><p style='text-align: left;'><strong>二、 变更日志</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='166'>时间</td><td colSpan='1' rowSpan='1' width='180'>版本号</td><td colSpan='1' rowSpan='1' width='178'>变更人</td><td colSpan='1' rowSpan='1' width='610'>主要变更内容</td></tr><tr><td colSpan='1' rowSpan='1' width='166'></td><td colSpan='1' rowSpan='1' width='180'></td><td colSpan='1' rowSpan='1' width='178'></td><td colSpan='1' rowSpan='1' width='610'></td></tr><tr><td colSpan='1' rowSpan='1' width='166'></td><td colSpan='1' rowSpan='1' width='180'></td><td colSpan='1' rowSpan='1' width='178'></td><td colSpan='1' rowSpan='1' width='610'></td></tr><tr><td colSpan='1' rowSpan='1' width='166'></td><td colSpan='1' rowSpan='1' width='180'></td><td colSpan='1' rowSpan='1' width='178'></td><td colSpan='1' rowSpan='1' width='610'></td></tr></tbody></table><p style='text-align: left;'><strong>三、 文档说明</strong></p><p style='text-align: left;'><strong>名词解释</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='226'>术语 / 缩略词</td><td colSpan='1' rowSpan='1' width='908'>说明</td></tr><tr><td colSpan='1' rowSpan='1' width='226'>CMS</td><td colSpan='1' rowSpan='1' width='908'>XXX 系统的简称</td></tr><tr><td colSpan='1' rowSpan='1' width='226'></td><td colSpan='1' rowSpan='1' width='908'></td></tr><tr><td colSpan='1' rowSpan='1' width='226'></td><td colSpan='1' rowSpan='1' width='908'></td></tr></tbody></table><p style='text-align: left;'><strong>四、 需求背景</strong></p><p style='text-align: left;'><strong>产品 / 数据现状</strong></p><p style='text-align: left;'> </p><p style='text-align: left;'><strong>用户调研</strong></p><p style='text-align: left;'><em>简要说明调研方法、样本情况及关键结论，输入 @ 在此附上详细的数据分析报告并添加在【附录】中</em></p><p style='text-align: left;'> </p><p style='text-align: left;'><strong>竞品分析</strong></p><p style='text-align: left;'><em>列出竞品对比的主要信息和关键结论，可输入 @ 在此附上详细的竞品分析报告并添加在【附录】中</em></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='92'></td><td colSpan='1' rowSpan='1' width='278'>主要信息</td><td colSpan='1' rowSpan='1' width='288'>关键结论</td><td colSpan='1' rowSpan='1' width='478'>截图或视频</td></tr><tr><td colSpan='1' rowSpan='1' width='92'>竞品1</td><td colSpan='1' rowSpan='1' width='278'></td><td colSpan='1' rowSpan='1' width='288'></td><td colSpan='1' rowSpan='1' width='478'>建议尽量把图片横向排布，精简文档篇幅</td></tr><tr><td colSpan='1' rowSpan='1' width='92'>竞品2</td><td colSpan='1' rowSpan='1' width='278'></td><td colSpan='1' rowSpan='1' width='288'></td><td colSpan='1' rowSpan='1' width='478'></td></tr><tr><td colSpan='1' rowSpan='1' width='92'></td><td colSpan='1' rowSpan='1' width='278'></td><td colSpan='1' rowSpan='1' width='288'></td><td colSpan='1' rowSpan='1' width='478'></td></tr></tbody></table><p style='text-align: left;'><strong>五、 需求范围</strong></p><p style='text-align: left;'><em>可条理性地罗列需求范围或信息架构</em></p><p style='text-align: left;'><strong>PC 端</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='230'>需求</td><td colSpan='1' rowSpan='1' width='752'>简要说明</td><td colSpan='1' rowSpan='1' width='150'>优先级</td></tr><tr><td colSpan='1' rowSpan='1' width='230'></td><td colSpan='1' rowSpan='1' width='752'></td><td colSpan='1' rowSpan='1' width='150'>P0</td></tr><tr><td colSpan='1' rowSpan='1' width='230'></td><td colSpan='1' rowSpan='1' width='752'></td><td colSpan='1' rowSpan='1' width='150'>P1</td></tr><tr><td colSpan='1' rowSpan='1' width='230'></td><td colSpan='1' rowSpan='1' width='752'></td><td colSpan='1' rowSpan='1' width='150'>P2</td></tr></tbody></table><p style='text-align: left;'><strong>移动端</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='230'>需求</td><td colSpan='1' rowSpan='1' width='752'>简要说明</td><td colSpan='1' rowSpan='1' width='150'>优先级</td></tr><tr><td colSpan='1' rowSpan='1' width='230'></td><td colSpan='1' rowSpan='1' width='752'></td><td colSpan='1' rowSpan='1' width='150'>P0</td></tr><tr><td colSpan='1' rowSpan='1' width='230'></td><td colSpan='1' rowSpan='1' width='752'></td><td colSpan='1' rowSpan='1' width='150'>P1</td></tr><tr><td colSpan='1' rowSpan='1' width='230'></td><td colSpan='1' rowSpan='1' width='752'></td><td colSpan='1' rowSpan='1' width='150'>P2</td></tr></tbody></table><p style='text-align: left;'> </p><p style='text-align: left;'><strong>六、 功能详细说明</strong></p><p style='text-align: left;'><strong>产品流程图</strong></p><p style='text-align: left;'><strong>交互原型图</strong></p><p style='text-align: left;'><strong>功能说明</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='156'>序号</td><td colSpan='1' rowSpan='1' width='156'>模块</td><td colSpan='1' rowSpan='1' width='206'>功能</td><td colSpan='1' rowSpan='1' width='338'>功能详细说明</td><td colSpan='1' rowSpan='1' width='280'>交互图</td></tr><tr><td colSpan='1' rowSpan='1' width='156'>1</td><td colSpan='1' rowSpan='1' width='156'>资料编辑</td><td colSpan='1' rowSpan='1' width='206'>• 更换头像</td><td colSpan='1' rowSpan='1' width='338'></td><td colSpan='1' rowSpan='1' width='280'></td></tr><tr><td colSpan='1' rowSpan='1' width='156'></td><td colSpan='1' rowSpan='1' width='156'>.</td><td colSpan='1' rowSpan='1' width='206'></td><td colSpan='1' rowSpan='1' width='338'></td><td colSpan='1' rowSpan='1' width='280'></td></tr><tr><td colSpan='1' rowSpan='1' width='156'></td><td colSpan='1' rowSpan='1' width='156'></td><td colSpan='1' rowSpan='1' width='206'></td><td colSpan='1' rowSpan='1' width='338'></td><td colSpan='1' rowSpan='1' width='280'></td></tr><tr><td colSpan='1' rowSpan='1' width='156'></td><td colSpan='1' rowSpan='1' width='156'></td><td colSpan='1' rowSpan='1' width='206'></td><td colSpan='1' rowSpan='1' width='338'></td><td colSpan='1' rowSpan='1' width='280'></td></tr></tbody></table><p style='text-align: left;'> </p><p style='text-align: left;'><strong>七、 非功能需求</strong></p><p style='text-align: left;'><em>可以列举产品营销需求、运营需求、财务需求、法务需求、使用帮助、问题反馈等</em></p><p style='text-align: left;'> </p><p style='text-align: left;'> </p><p style='text-align: left;'><strong>八、 埋点</strong></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='350'>参数名</td><td colSpan='1' rowSpan='1' width='356'>参数说明</td><td colSpan='1' rowSpan='1' width='428'>参数值</td></tr><tr><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='356'></td><td colSpan='1' rowSpan='1' width='428'></td></tr><tr><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='356'></td><td colSpan='1' rowSpan='1' width='428'></td></tr><tr><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='356'></td><td colSpan='1' rowSpan='1' width='428'></td></tr></tbody></table><p style='text-align: left;'> </p><p style='text-align: left;'><strong>九、 项目规划</strong></p><p style='text-align: left;'> </p><p style='text-align: left;'> </p><p style='text-align: left;'><strong>附录</strong></p><p style='text-align: left;'><em>输入 @ 把正文提及的具体文档，或需求相关的其他说明文档附在此处以供查阅</em></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='378'>• 此处插入数据分析报告</td><td colSpan='1' rowSpan='1' width='378'>• 此处插入用户调研报告</td><td colSpan='1' rowSpan='1' width='378'>• 此处插入设计分析报告</td></tr><tr><td colSpan='1' rowSpan='1' width='346'>数据分析报告</td></tr><tr><td colSpan='1' rowSpan='1' width='346'>用户调研报告</td></tr><tr><td colSpan='1' rowSpan='1' width='346'>设计分析报告</td></tr></tbody></table><p> </p><p><br></p>",
      model2:
      "<h1><strong>工作周报</strong></h1><p>· 一、本周工作回顾</p><p>o 列出本周重点数据</p><p>· 二、工作内容</p><p>o 产品研发</p><p>§ 输入工作内容并@相应人员，可使用@插入工作成果文档</p><p>§ ......</p><p>o 运营</p><p>§ 输入工作内容并@相应人员，可使用@插入工作成果文档</p><p>§ ......</p><p>o 市场</p><p>§ 输入工作内容并@相应人员，可使用@插入工作成果文档</p><p>§ ......</p><p>· 三、下周工作计划</p><p>o 列出下周的工作重点内容</p><p style='text-align: left;'><span style='font-family: 宋体;'> </span></p><p> </p>",
      model3:
      "<h1><strong>会议纪要</strong></h1><p>· 基本信息</p><p>o 会议时间</p><p>o 会议地点</p><p>o 参会人</p><p>o 相关文档<br>可以把需要提前阅读的文档粘贴到这里哦</p><p>· 议题 1：输入具体议题 </p><p>o 发言人：@ 提及发言人</p><p>o 会后相关行动</p><p>§ 行动 1<br>你还可以在这里 @ 提及此行动负责人</p><p>§ 行动 2 </p><p>· 议题 2：输入具体议题</p><p>o 发言人：@ 提及发言人</p><p>o 会后相关行动</p><p>§ 行动 1</p><p>§ 行动 2</p><p>· 其他事项</p><p style='text-align: left;'><span style='font-family: 宋体;'> </span></p><p> </p>",
      model4:
      "<p><span style='color: rgb(31, 35, 41); background-color: rgb(255, 255, 255); font-family: Arial;'>项目规划</span></p><p>· 项目背景</p><p>o 介绍项目成立的背景，输入 @ 插入相关云文档 </p><p>o ......</p><p>· 项目目标</p><p>o 目标 1：具体、细化、可拆解</p><p>o 目标 2：......</p><p>· 项目成员</p><p>o 项目负责人：输入'@+人名'提及相关人员</p><p>o 设计负责人：......</p><p>o 开发负责人：......</p><p>o ......</p><p>· 项目拆解与分工</p><p>o 任务 1：描述任务内容，输入'@+人名'提及相关人员</p><p>o 任务 2：......</p><p style='text-align: left;'><span style='font-family: 宋体;'> </span></p><p> </p>",
      model5:
      "<p><tr><p><br></p></tr></p><table style='width: auto;'><tbody><tr><td colSpan='1' rowSpan='1' width='350'>部门</td><td colSpan='1' rowSpan='1' width='350'>部门名称</td><td colSpan='1' rowSpan='1' width='350'>项目负责人</td><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='350'>输入'@+人名'提及负责人</td><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='350'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'>启动日期 (更改后自动更新）</td><td colSpan='1' rowSpan='1' width='auto'>2022/03/17</td><td colSpan='1' rowSpan='1' width='auto'>完成时间</td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'>2022/11/30</td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'>当前日期</td><td colSpan='1' rowSpan='1' width='auto'>2022/08/09</td><td colSpan='1' rowSpan='1' width='auto'>剩余时间</td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'>113</td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='2' width='auto'>任务</td><td colSpan='1' rowSpan='2' width='auto'>负责人</td><td colSpan='1' rowSpan='2' width='auto'>状态</td><td colSpan='1' rowSpan='2' width='auto'>预计开始时间</td><td colSpan='1' rowSpan='2' width='auto'>预计结束时间</td><td colSpan='1' rowSpan='2' width='auto'>实际开始时间</td><td colSpan='1' rowSpan='2' width='auto'>实际结束时间</td></tr><tr></tr><tr><td colSpan='1' rowSpan='1' width='350'>一、项目筹备与启动</td><td colSpan='1' rowSpan='1' width='auto'>输入'@+人名'提及负责人</td><td colSpan='1' rowSpan='1' width='auto'>使用下拉列表显示任务状态</td><td colSpan='2' rowSpan='1' width='700'>使用日期提醒可定时提醒负责人</td><td colSpan='2' rowSpan='1' width='700'></td></tr><tr><td colSpan='1' rowSpan='1' width='350'>方案设计</td><td colSpan='1' rowSpan='1' width='auto'>@小唐</td><td colSpan='1' rowSpan='1' width='auto'>待启动 </td><td colSpan='1' rowSpan='1' width='auto'>2022/3/18</td><td colSpan='1' rowSpan='1' width='auto'>2022/4/13</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/18</td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'>竞品调研</td><td colSpan='1' rowSpan='1' width='auto'>@小王</td><td colSpan='1' rowSpan='1' width='auto'>进行中 </td><td colSpan='1' rowSpan='1' width='auto'>2022/3/10</td><td colSpan='1' rowSpan='1' width='auto'>2022/4/14</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/10</td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'>已完成 &nbsp;</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/24</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/24</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/24</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/31</td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'>已延期 &nbsp;</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/3</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/10</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/3</td><td colSpan='1' rowSpan='1' width='auto'>2022/3/11</td></tr><tr><td colSpan='1' rowSpan='1' width='350'>二、项目执行</td><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'>输出方案</td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='350'>三、项目上线</td><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='350'>四、项目复盘</td><td colSpan='1' rowSpan='1' width='350'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr><tr><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td><td colSpan='1' rowSpan='1' width='auto'></td></tr></tbody></table><p><br></p>"
    }
  },
  methods: {
      gotoUml(){
          this.$router.push({name: 'uml'})
      },
      newDoc(){
          const that = this
          that.dialogVisible = true
      },
      dialogClosed() {
          const that = this
          that.dialogVisible = false
      },
      createDocument(){
          const that = this
          if(that.insertData.docName.length!==0)
          {
              switch(that.model)
              {
                case "a":
                  this.form.content=this.model1;
                  break;
                case "b":
                  this.form.content=this.model2;
                  break;
                case "c":
                  this.form.content=this.model3;
                  break;
                case "d":
                  this.form.content=this.model4;
                  break;
                case "e":
                  this.form.content=this.model5;
                  break;

                default:
                  this.form.content="";
              }
              that.model=""
              this.$axios.post('/project/createDocument/',this.$qs.stringify({
                  email: sessionStorage.getItem('email'),
                  URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'+that.insertData.docName,
                  content:that.form.content
              })).then(res => {
                  console.log(res)
                  if(res.data.result === 0){
                      that.$message.success("创建成功")
                      this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
                          email: sessionStorage.getItem('email'),
                          URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'
                      })).then(res => {
                          console.log(res)
                          if(res.data.result === 0){
                              that.docNames = res.data.docNames
                          }
                      })
                      that.dialogVisible = false
                  }else if(res.data.result === 1){
                      that.$message.error("错误的请求")
                  }else{
                      that.$message.error("文档名称已存在")
                  }
              })
          }
      },
      handleDelete(index, docName){
          const that = this
          this.$axios.post('/project/removeDocument/', this.$qs.stringify({
              email: sessionStorage.getItem("email"),
              URL: sessionStorage.getItem('group') +'/项目文件夹/'+sessionStorage.getItem('project')+'/'+docName,
          })).then(res =>{
              console.log(res)
              if(res.data.result === 0){
                  that.$message.success("删除文档成功")
              }else{
                  that.$message.error("请求错误")
              }
              this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
                  email: sessionStorage.getItem('email'),
                  URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'
              })).then(res =>{
                  console.log(res)
                  if(res.data.result === 0){
                      if(res.data.docNames.length ===0){
                          that.form.docName=' '
                          that.docNames = res.data.docNames
                      }
                      else{
                          that.docNames = res.data.docNames
                          that.form.docName = res.data.docNames[0]
                          that.getInfo()
                      }
                  }
              })
          })
      },
      showWindow(){
          this.isWindowShow=true
      },
      closeWindow(){
          this.isWindowShow=false
      },
      gotoProto(){
          this.$router.push({name:'prototype'})
      },
      logout() {
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$message({
                  type: 'success',
                  message: '已退出登录!'
              });
              window.sessionStorage.clear();
              this.$router.push({path: '/login'});
          }).catch(() => {

          });
      },
      handleSelect(key, keyPath) {
          if (key === '/workSpace/manageMember' || key === '/home' || key === '/workSpace/groupProject'
              || key === '/workSpace') {
              this.$router.push({ path: key })
          }
      },
      goBack() {
          this.$router.push({ path: '/workSpace' })
      },
      gotoCenter(){
          this.$router.push({name:'userInfo'})
      },
      getInfo(){
          const that = this
          this.form.proName=sessionStorage.getItem("project");
          // this.form.docName=sessionStorage.getItem("document");
          this.printContent=this.form.content;
          this.$axios.post('/project/checkDocument/',this.$qs.stringify({
              email: sessionStorage.getItem('email'),
              URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'+ that.form.docName
          }))
              .then(res =>{
                  that.form.content=res.data.content;
                  that.html=res.data.content;
                  that.printContent=that.form.content;
              })
      },
      onCreated(editor) {
          this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
      },
      onChange(editor) {
          //console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
      },
      saveText() {
          const that=this;
          const editor = this.editor;
          this.form.content=editor.getHtml();
          this.printContent=this.form.content;
          console.log(this.printContent)
          // alert(that.form.groupName+'/项目文件夹/'+that.form.proName+'/'+that.form.docName)
          this.$axios.post('/project/saveDocument/',this.$qs.stringify({
              email: that.form.email,
              URL: that.form.groupName+'/项目文件夹/'+that.form.proName+'/'+that.form.docName,
              content: that.form.content
          })).then(res =>{
              that.$message.success("保存成功")
          })
      },
      back() {
          this.$router.push({name:'proInterface'})
      },
      chooseDoc(item){
          const that = this
          that.form.docName = item
          this.$axios.post('/project/checkDocument/',this.$qs.stringify({
              email: sessionStorage.getItem('email'),
              URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'+this.form.docName
          }))
              .then(res =>{
                  this.form.content=res.data.content;
                  this.html=res.data.content;
              })
      },
      /*
      initWebSocket(){
          this.websock=new WebSocket("ws://81.70.16.241:8001/saveDocument/"+this.form.groupName+"_项目文件夹_"+this.form.proName+'_'+this.form.docName+"/");
          this.websock.onmessage=this.websocketOnMessage;
          this.websock.onopen =this.websocketOnOpen;
          this.websock.onerror=this.websocketOnError;
          this.websock.onclose=this.websocketClose;
      },
      sendWebSocketMessage(msg){
          this.websock.send(JSON.stringify(msg))
      },
      websocketOnMessage(e){
          let msg=JSON.parse(e.data);
          this.html=msg.content;
      },
      websocketOnOpen(e){
          console.log(e);

      },
      websocketOnError(e){
          console.log(e);
      },
      websocketClose(e){
          console.log(e);
      },
      */
      exportText(cmd) {
        switch(cmd) {
          case "a":
            this.printWORD();
            break;
          case "b":
            this.printPDF();
            break;
          case "c": this.printMD();
        }
      },
      printPDF() {
        var Opdf=document.getElementById('print-pdf');
        Opdf.setAttribute('style','display:block');
        htmlPdf.getPdf(sessionStorage.getItem("document"), document.querySelector('#print-pdf'));
        Opdf.setAttribute('style','display:none');
      },
      printWORD() {
        let htmlStr = this.printContent;
        let page = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${htmlStr}
            </body></html>`
        saveAs(
            htmlDocx.asBlob(page, {
                orientation: "landscape"
            }),
            sessionStorage.getItem("document")+".doc"
        )
      },
      printMD() {
        var that=this;
        this.$axios.post('/project/htmlToMarkdowm/',this.$qs.stringify({
            htmlContent: that.printContent
        })).then(res =>{
          console.log(res.data);
          saveAs(
            new Blob([res.data.markdownContent]),
            sessionStorage.getItem("document")+".md"
          )
        })
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
    //this.initWebSocket();
  },
  created() {
      const that = this
    this.form.email=sessionStorage.getItem("email");
    this.form.groupName=sessionStorage.getItem("group");
    this.form.proName=sessionStorage.getItem("project");
      this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
          email: sessionStorage.getItem('email'),
          URL: sessionStorage.getItem('group')+'/项目文件夹/'+sessionStorage.getItem('project')+'/'
      })).then(res => {
          console.log(res)
          if(res.data.result === 0 && res.data.docNames.length!==0){
              that.docNames = res.data.docNames
              that.form.docName = res.data.docNames[0]
              this.editTime=new Date();
              this.getInfo();
          }
      })
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null)
        return editor.destroy() // 组件销毁时，及时销毁 editor
  },
  /*
  watch: {
    html(newValue, oldValue)
    {
      this.form.content=newValue;
      var nowTime=new Date();

      if(this.websock.readyState===1&&(nowTime-this.editTime>=1200))
      {
        this.editTime=nowTime;
        this.sendWebSocketMessage({
          email: this.form.email,
          URL: this.form.groupName+'/项目文件夹/'+this.form.proName+'/'+this.form.docName,
          content: this.form.content
        });
      }
    },
  },
  */
}
</script>

<style scoped>
/*.icon1:hover{*/
/*    cursor: pointer;*/
/*}*/
.sign1{
    position: absolute;
    z-index: 5;
    width: 24px;
    height: 40px;
    top:7px;
    left: 175px;
}
.sign1:hover{
    cursor: pointer;
}
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
   .export
  {
    margin-left: 20px;
    height: 28.4px;
    line-height: 28.4px;
  }
  ::v-deep .el-button--text{
    font-size: 15px;
    color: black;
  }
  ::v-deep .el-button--medium{
    padding: 0;
  }
.tableRow:hover{
    cursor: pointer;
    color: #00c3ff;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>
