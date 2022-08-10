<template>
  <div class="desk">
    <div class="fileTree">

      <el-tree :data="data" :props="defaultProps" @node-expand="openDir" @node-collapse="closeDir"
      :expand-on-click-node="false">

        <span class="custom-tree-node" slot-scope="{ node, data }" @click="nodeClick(node,data)">
          <span @click="handleClick()" class="fileInfo">
            <span v-if="node.label.charAt(node.label.length-1)=='/'">
              <i class="el-icon-folder" v-if="!data.unfold"></i>
              <i class="el-icon-folder-opened" v-else></i>
              &nbsp;
              <span>{{ node.label.substr(0,node.label.length-1) }}</span>
            </span>
            <span v-else @click="edit(node)">
              <i class="el-icon-document"></i>
              <!--
                <i class="el-icon-edit" v-else></i>
              -->
              &nbsp;
              <span>{{ node.label }}</span>
            </span>
            &nbsp;&nbsp;
          </span>
          <span v-show="showNum==data.$treeNodeId" @mouseenter="isLookOp=true" @mouseleave="isLookOp=false">
            <i class="el-icon-more-outline" @click="preOp(node)" v-if="!isInPro||isInText||isText"></i>
            <div v-show="open" @mouseenter="isOperate=true" @mouseleave="isOperate=false" class="operations">
              
              <div @click="newFile" v-if="node.label.charAt(node.label.length-1)=='/'">
                新建文档
              </div>
              <div @click="newDir" v-if="!isInPro&&node.label.charAt(node.label.length-1)=='/'">
                新建文件夹
              </div>
              <div @click="changeName(data)" v-if="isText||(!isInRoot&&!isInPro)">
                重命名
              </div>
              <div @click="remove" v-if="isText||(!isInRoot&&!isInPro)">
                删除
              </div>

            </div>

          </span>

        </span>
      </el-tree>

      <el-dialog :visible.sync="isNewFile" title="新建文件" width="350px">
        <el-form :model="form" label-width="78px">
          <el-form-item label="文件名称:" >
            <el-input v-model="newFileName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="文档模板:">
            <el-select v-model="model" placeholder="请选择文档模板">
              <el-option label="无模板" value="0"></el-option>
              <el-option label="产品需求文档模板" value="a"></el-option>
              <el-option label="工作周报模板" value="b"></el-option>
              <el-option label="会议纪要模板" value="c"></el-option>
              <el-option label="项目规划模板" value="d"></el-option>
              <el-option label="项目管理模板" value="e"></el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isNewFile = false">取消</el-button>
            <el-button type="primary" @click="appendFile()"
            >确认</el-button>
          </span>
        </template>
      </el-dialog>


      <el-dialog :visible.sync="isNewDir" title="新建文件夹" width="400px">
        <el-form :model="form">
          <el-form-item label="文件夹名称">
            <el-input v-model="newFileName" autocomplete="off" />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isNewDir = false">取消</el-button>
            <el-button type="primary" @click="appendDir()"
            >确认</el-button>
          </span>
        </template>
      </el-dialog>


      <el-dialog :visible.sync="isRename" title="重命名" width="400px">
        <el-form :model="form">
          <el-form-item label="新名称">
            <el-input v-model="newFileName" autocomplete="off" />
          </el-form-item>
        </el-form>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="isRename = false">取消</el-button>
            <el-button type="primary" @click="rename()"
            >确认</el-button>
          </span>
        </template>
      </el-dialog>

    </div>
    <div class="vim-place">
      <div v-if="!docName" class="slogan"></div>
      <edit-doc2 v-else v-bind:url="form.URL"></edit-doc2>
    </div>
  </div>
</template>

<script>
import EditDoc2 from '../EditDoc2.vue';
export default {
  name: 'docCenter',
  data() {
    return {
      form: {
        email: "",
        groupName: "myteam",
        URL: "",
        oldURL: "",
        newURL: "",
        content: ""
      },
      model: "",
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
      ,
      docName: "",
      showNum: -1,
      isLookOp: false,
      isOperate: false,
      open: false,
      isInRoot: false,
      isInPro: false,
      isInText: false,
      isText: false,
      newFileName: "",
      isNewFile:false,
      isNewDir: false,
      symbol: "",
      isRename: false,
      data: [],
      tarNode: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  components: {
    EditDoc2
  },
  methods: {
    getInfo() {
      var that=this;
      this.$axios.post('/project/checkFileTree/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              that.data=res.data.fileTree;
              that.data=[ {
                  label: that.form.groupName+'/',
                  children: that.data
                }
              ]
          })
    },
    openDir(data,node) {
      if(!data.unfold)
        this.$set(data, 'unfold', 1);
      else data.unfold=0;
      this.showNum=data.$treeNodeId;
      var i=node;
      if(i.data.label===this.form.groupName+'/')
        this.isInRoot=true;
      var that=this;
      var use=0;
      while(i.data.label)
      {
        if(i.data.label==='项目文件夹/')
        {
          that.isInPro=true;
          if(use==1) that.isInText=true;
          else that.isInText=false;
          if(use==2) that.isText=true;
          else that.isText=false;
          return ;
        }
        i=i.parent;
        use++;
      }
      
      that.isInText=false;
      that.isInPro=false;
    },
    closeDir(data) {
      data.unfold=0;
    },
    nodeClick(node,data) {
      this.showNum=data.$treeNodeId;
      var i=node;
      if(i.data.label===this.form.groupName+'/')
        this.isInRoot=true;
      else this.isInRoot=false;
      var that=this;
      var use=0;
      while(i.data.label)
      {
        if(i.data.label==='项目文件夹/')
        {
          that.isInPro=true;
          if(use==1) that.isInText=true;
          else that.isInText=false;
          if(use==2) that.isText=true;
          else that.isText=false;
          return ;
        }
        i=i.parent;
        use++;
      }
      that.isInText=false;
      that.isInPro=false;
    },
    edit(node) {
      sessionStorage.setItem("document",node.data.label);
      this.docName=sessionStorage.getItem("document");
      this.preOp(node);
    },
    preOp(node) {
      this.open=true;
      this.newFileName=node.data.label;
      if(this.newFileName.charAt(node.label.length-1)=='/')
      {
        this.newFileName=this.newFileName.substr(0,this.newFileName.length-1)
      }
      //获取url
      var url="";
      var parUrl="";
      var i=node;
      var time=1;
      while(i.parent.data.label)
      {
        url=i.data.label+url;
        if(time==1) time=2;
        else parUrl=i.data.label+parUrl;

        i=i.parent;
      }
      url=i.data.label+url;
      this.form.URL=url;
      this.form.oldURL=url;
      if(time==1)
        this.form.newURL=parUrl;
      else 
        this.form.newURL=i.data.label+parUrl;

      this.tarNode=node;

    },
    newFile() {
      this.isNewFile=true;
      this.newFileName="";
    },
    appendFile() {
      this.form.URL=this.form.URL+this.newFileName;
      var that=this;

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

      this.$axios.post('/project/createDocument/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              if(res.data.result==0)
              {
                //this.getInfo();
                const newChild = { label: that.newFileName, children: [] };
                if (!that.tarNode.data.children) {
                  that.$set(that.tarNode.data, 'children', []);
                }
                that.tarNode.data.children.push(newChild);

                this.newFileName="";
                this.isNewFile=false;
              }
              else that.$message.error(res.data.message);
          })
    },
    newDir() {
      this.isNewDir=true;
      this.newFileName="";
    },
    appendDir() {
      this.form.URL=this.form.URL+this.newFileName+'/';
      var that=this;
      this.$axios.post('/project/createDocument/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              if(res.data.result==0)
              {
                //this.getInfo();
                const newChild = { label: that.newFileName+'/', children: [] };
                if (!that.tarNode.data.children) {
                  that.$set(that.tarNode.data, 'children', []);
                }
                that.tarNode.data.children.unshift(newChild);

                this.newFileName="";
                this.isNewDir=false;
              }
              else that.$message.error(res.data.message);
          })
    },
    changeName(data) {
      var that=this;
      if(data.label.charAt(data.label.length-1)=='/')
        that.symbol="/";
      else that.symbol="";
      that.isRename=true;
    },
    rename() {
      this.form.oldURL=this.form.oldURL+this.symbol;
      this.form.newURL=this.form.newURL+this.newFileName+this.symbol;
      var that=this;
      this.$axios.post('/project/changeDocumentInfo/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              if(res.data.result==0)
              {
                that.$message.success("修改成功!");
                //that.getInfo();
                that.tarNode.data.label=that.newFileName;

                that.isRename=false;
              }
              else that.$message.error(res.data.message);
          })
    },
    remove() {
      var that=this;
      this.$axios.post('/project/removeDocument/',this.$qs.stringify(this.form))
          .then(res =>{
              console.log(res);
              that.$message.success("删除成功!");
              //that.getInfo();
              const parent=that.tarNode.parent;
              for(var i in parent.data.children)
              {
                if(parent.data.children[i].label==that.tarNode.data.label)
                  break;
              }
              const children = parent.data.children || parent.data;
              children.splice(i, 1);
          })
    },
    handleClick() {
      //save
      if(!this.isOperate)
      {
        this.open = false;
      }

      if(!this.isLookOp)
      {
        this.showNum = -1;
      }
    }
  },
  created() {
    this.form.email=sessionStorage.getItem("email");
    this.form.groupName=sessionStorage.getItem("group");
    this.docName="";
    this.getInfo();
  },
  mounted() {
    window.addEventListener('click',this.handleClick)
  },
  destroyed() {
    window.removeEventListener('click',this.handleClick)
  }
}
</script>


<style scoped>
  .desk
  {
    display: flex;
  }
  .fileTree
  {
    width: 220px;
    min-width: 220px;
    height: 100%;
    margin-right: 20px;
  }
  .custom-tree-node 
  {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
  }
  .fileInfo
  {
    flex: 1;
  }
  .operations
  {
    position: absolute;
    background-color: white;
    border-radius: 8px;
    padding: 8px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    left: 144px;
    width: 120px;
    z-index: 1000;
  }
  .operations div
  {
    padding: 8px 30px;
    font-size: 10px;
    text-align: center;
  }
  .operations div:hover
  {
    background-color: rgb(240, 240, 240);
  }
  .slogan
  {
    flex: 1;
    text-align: center;
    font-size: 50px;
  }
  .vim-place
  {
    max-width: 100%;
  }
  .el-select
  {
    display: block;
  }
</style>