<template>
    <div>
    <div>
        <button class="prototypeButton" type="button" @click="getPrototype()">项目原型</button>
        <button class="prototypeButton" type="button" @click="getDocument()" style="margin-left: 250px;">项目文档</button>
        <button class="prototypeButton" type="button" @click="getUml()" style="margin-left: 250px;">绘制UML图</button>
        <hr>
        <button class="createButton" type="button" @click="newPrototype" v-show="showPrototype">创建原型</button>
        <button class="createButton" type="button" @click="newDocument" v-show="showDocument">创建文档</button>
        <el-table :data="prototypes.protoNames" style="width: 100%;" v-show="showPrototype">
            <el-table-column label="创建日期" width="400">
                <template #default="scope">
                    <div style="display: flex; align-items: center;">
                        <svg class="clock" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path><path fill="currentColor" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path></svg>
                        <span style="margin-left: 10px;">{{ prototypes.createTimes[scope.$index] }}</span>
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
                    <el-button size="small" @click="handleEdit1(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete1(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="documents.docNames" style="width: 100%;" v-show="showDocument">
            <el-table-column label="创建日期" width="400">
                <template #default="scope">
                    <div style="display: flex; align-items: center;">
                        <svg class="clock" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path><path fill="currentColor" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path></svg>
                        <span style="margin-left: 10px;">{{ documents.createTimes[scope.$index] }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="文档名称" width="400">
                <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                        <template #default>
                            <div>名称: {{ scope.row }}</div>
                            <div>创建日期: {{ documents.createTimes[scope.$index]}}</div>
                        </template>
                        <template #reference>
                            <el-tag>{{ scope.row }}</el-tag>
                        </template>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit2(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete2(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
        <el-dialog class="dialog" title="创建原型" v-if="dialog1Visible" :visible.sync="dialog1Visible" width="35%" :modal-append-to-body="false" center @close="dialog1Closed" style="display: flex;">
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
            <div style="text-align: center;">
                <el-button type="danger" @click="dialog1Closed" circle style="width: 40px;height: 40px;-webkit-border-radius: 80px;float: left; margin-left: 100px;">取消</el-button>
                <el-button type="primary" @click="createPrototype()" style="width: 80px; height: 40px;margin:0 auto;">保存</el-button>
            </div>
        </el-dialog>
        <el-dialog class="dialog2" title="创建文档" v-if="dialog2Visible" :visible.sync="dialog2Visible" width="35%" :modal-append-to-body="false" center @close="dialog2Closed" style="display: flex;">
            <el-form :model="insertData" label-width="120px">
                <el-form-item label="文档名称：">
                    <el-input v-model="insertData.docName" />
                </el-form-item>
            </el-form>
            <div style="text-align: center;">
                <el-button type="danger" @click="dialog2Closed" circle style="width: 40px;height: 40px;-webkit-border-radius: 80px;float: left; margin-left: 100px;">取消</el-button>
                <el-button type="primary" @click="createDocument()" style="width: 80px; height: 40px;margin:0 auto;">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import generateID from '@/utils/generateID'
export default {
    name: "ProInterface",
    components: {
    },
    data(){
        return{
            defaultComponentData:[{
                animations:[],
                events:{},
                groupStyle:{},
                isLock:false,
                component:"Picture",
                label:"图片",
                icon:"tupian",
                propValue:{
                    url:"img/title.ac55a42f.jpg",
                    flip:{
                        horizontal:false,
                        vertical:false
                    }
                },
                style:{
                    rotate:0,
                    opacity:1,
                    width:300,
                    height:200,
                    borderRadius:"",
                    top:64,
                    left:171
                },
                id:18,
            }],
            defaultCanvasData:{
                width: 1200,
                height: 1200,
                scale: 100,
                color: '#000',
                opacity: 1,
                background: '#fff',
                fontSize: 14,
            },
            insertData:{
                protoName: '',
                canvasHeight: 1200,
                canvasWidth: 1200,
                docName: '',
                content: ''
            },
            prototypes:{
                protoNames:[],
                createTimes:[]
            },
            documents:{
                docNames:[],
                createTimes:[]
            },
            showDocument:false,
            showPrototype:false,
            dialog1Visible:false,
            dialog2Visible:false
        }
    },
    computed: mapState([
        'componentData',
        'canvasStyleData',
        'areaData',
        'curComponent',
        'curComponentIndex',
    ]),
    created(){
        const that = this
        this.$axios.post('/group/updateProjectCheckTime/',this.$qs.stringify({
            email: sessionStorage.getItem('email'),
            groupName: sessionStorage.getItem('group'),
            proName: sessionStorage.getItem('project')
        })).then(res =>{
            console.log(res)
        })
        that.getPrototype()
    },
    methods:{
        getPrototype(){
            const that = this
            this.$axios.post('/project/checkPrototypes/',this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group'),
                proName: sessionStorage.getItem('project')
            })).then(res => {
                console.log(res)
                if(res.data.result === 0){
                    that.prototypes.protoNames = res.data.protoNames
                    that.prototypes.createTimes = res.data.createTimes
                    that.showDocument = false
                    that.showPrototype = true
                }
            })
        },
        getDocument(){
            const that = this
            this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                URL: sessionStorage.getItem('group')+'/'+sessionStorage.getItem('project')
            })).then(res => {
                console.log(res)
                if(res.data.result === 0){
                    that.documents.docNames = res.data.docNames
                    that.documents.createTimes = res.data.createTimes
                    that.showDocument = true
                    that.showPrototype = false
                }
            })
        },
        getUml(){
            const that = this
            that.$router.push('uml')
        },
        dialog1Closed(){
            const that = this
            that.dialog1Visible = false
        },
        dialog2Closed(){
            const that = this
            that.dialog2Visible = false
        },
        newPrototype(){
            const that = this
            that.dialog1Visible = true
        },
        newDocument(){
            const that = this
            that.dialog2Visible = true
        },
        createPrototype(){
            const that = this
            mapState.componentData = that.defaultComponentData
            mapState.canvasStyleData = that.defaultCanvasData
            mapState.canvasStyleData.width=that.insertData.canvasWidth
            mapState.canvasStyleData.height=that.insertData.canvasHeight
            if(that.insertData.protoName.length!==0){
                this.$axios.post('/project/createPrototype/',this.$qs.stringify({
                    email: sessionStorage.getItem('email'),
                    groupName: sessionStorage.getItem('group'),
                    proName: sessionStorage.getItem('project'),
                    protoName:that.insertData.protoName,
                    canvasData:JSON.stringify(mapState.componentData),
                    canvasStyle:JSON.stringify(mapState.canvasStyleData),
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
                        that.dialog1Visible = false
                    }else if(res.data.result === 1){
                        that.$message.error("错误的请求")
                    }else{
                        that.$message.error("原型名称已存在")
                    }
                })
            }
        },
        createDocument(){
            const that = this
            if(that.insertData.docName.length!==0){
                this.$axios.post('/project/createDocument/',this.$qs.stringify({
                    email: sessionStorage.getItem('email'),
                    groupName: sessionStorage.getItem('group'),
                    proName: sessionStorage.getItem('project'),
                    docName:that.insertData.docName,
                    content:' '
                })).then(res => {
                    console.log(res)
                    if(res.data.result === 0){
                        that.$message.success("创建成功")
                        this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
                            email: sessionStorage.getItem('email'),
                            groupName: sessionStorage.getItem('group'),
                            proName: sessionStorage.getItem('project')
                        })).then(res => {
                            console.log(res)
                            if(res.data.result === 0){
                                that.documents.docNames = res.data.docNames
                                that.documents.createTimes = res.data.createTimes
                                that.showDocument = true
                                that.showPrototype = false
                            }
                        })
                        that.dialog2Visible = false
                    }else if(res.data.result === 1){
                        that.$message.error("错误的请求")
                    }else{
                        that.$message.error("文档名称已存在")
                    }
                })
            }
        },
        handleEdit1(index,protoName){
            const that = this
            sessionStorage.setItem('protoName',protoName)
            this.$store.commit('setComponentData', this.resetID(that.defaultComponentData))
            this.$store.commit('setCanvasStyle', that.defaultCanvasData)
            this.$axios.post('project/checkPrototype/', this.$qs.stringify({
                email: sessionStorage.getItem('email'),
                groupName: sessionStorage.getItem('group'),
                proName: sessionStorage.getItem('project'),
                protoName: protoName
            })).then(res => {
                console.log(res)
                if(res.data.result === 0){
                    this.$store.commit('setComponentData', this.resetID(JSON.parse(res.data.canvasData)))
                    this.$store.commit('setCanvasStyle', JSON.parse(res.data.canvasStyle))
                    that.$router.push('prototype')
                }
            })
        },
        handleEdit2(index, docName){
            const that = this
            sessionStorage.setItem("document", docName)
            that.$router.push('document')
        },
        handleDelete1(index, protoName){
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
                        that.showDocument = false
                        that.showPrototype = true
                    }
                })
            })
        },
        handleDelete2(index, docName){
            const that = this
            this.$axios.post('/project/removeDocument/', this.$qs.stringify({
                email: sessionStorage.getItem("email"),
                groupName: sessionStorage.getItem('group'),
                proName: sessionStorage.getItem('project'),
                docName: docName
            })).then(res =>{
                console.log(res)
                if(res.data.result === 0){
                    that.$message.success("删除文档成功")
                }else{
                    that.$message.error("请求错误")
                }
                this.$axios.post('/project/checkDocuments/',this.$qs.stringify({
                    email: sessionStorage.getItem('email'),
                    groupName: sessionStorage.getItem('group'),
                    proName: sessionStorage.getItem('project')
                })).then(res => {
                    console.log(res)
                    if(res.data.result === 0){
                        that.documents.docNames = res.data.docNames
                        that.documents.createTimes = res.data.createTimes
                        that.showDocument = true
                        that.showPrototype = false
                    }
                })
            })
        },
        resetID(data) {
            data.forEach(item => {
                item.id = generateID()
                if (item.component === 'Group') {
                    this.resetID(item.propValue)
                }
            })

            return data
        },
    }
}
</script>

<style scoped>
    .prototypeButton
    {
        float: top;
        background: none;
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
        background-color: rgb(247, 247, 249);
    }
    .clock{
        width: 15px;
        height: 15px;
    }
    .dialog{
        width: 1500px;
        height: 500px;
    }
    .dialog2{
        width: 1500px;
        height: 450px;
    }
</style>
