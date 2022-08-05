<template>
    <div>
        <el-header>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#FFF"
                style="padding-left: 10%; padding-right: 10%">

                <el-menu-item index="myProject" >项目名称: {{projectName}}</el-menu-item>
<!--                <el-menu-item index="/workSpace" >工作台</el-menu-item>-->
                <el-menu-item @click="gotoCenter()">个人中心</el-menu-item>
                <el-menu-item index="avatar" style="float: right">
                    <el-avatar :src="oldAvatar"></el-avatar>
                </el-menu-item>
                <el-menu-item @click="goBack">返回</el-menu-item>
                <el-menu-item @click="logout" style="float: right">退出登录</el-menu-item>
            </el-menu>
        </el-header>
        <div class="main-info">
            <iframe
                ref="iframe"
                id="map"
                frameborder="0"
                :src="iframeSrc"
                style="position:absolute;
            top: 60px;
            left: 5px;
            right: 0px;
            bottom: 10px;"
            >
            </iframe>
            <!-- <iframe
            src="http://localhost:10101/?target=https://online.visual-paradigm.com/app/diagrams/#diagram:proj=0&type=ClassDiagram&gallery=/repository/492e9b34-93bb-426d-b807-003cb1e4875c.xml&name=Students%20Enrollment%20Class%20Diagram"
            id="map" scrolling="no" frameborder="0"
            style="position:absolute; top:60px;left: 40px;right:0px;bottom:10px;"></iframe> -->
            <!-- <iframe class="body"
            src="https://online.visual-paradigm.com/app/diagrams/#diagram:proj=0&type=ClassDiagram&gallery=/repository/492e9b34-93bb-426d-b807-003cb1e4875c.xml&name=Students%20Enrollment%20Class%20Diagram"
            id="map" scrolling="0" frameborder="0"
            ></iframe> -->
            <!-- <iframe src="https://draw.yunser.com/" id="map" scrolling="no" frameborder="0" style="position:absolute;top:4px;left: 110px;right:0px;bottom:10px;"></iframe> -->
            <!-- <iframe name="iframe" id="iframe" width="100%" height="100%" scrolling="no" frameborder="0"  style="top:60px;left: 110px;right:0px;bottom:10px;"
            src="https://online.visual-paradigm.com/app/diagrams/#diagram:proj=0&type=ClassDiagram&gallery=/repository/492e9b34-93bb-426d-b807-003cb1e4875c.xml&name=Students%20Enrollment%20Class%20Diagram">
            </iframe> -->
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            activeIndex: 'myProject',
            activeName: 'attr',
            reSelectAnimateIndex: undefined,
            oldAvatar: window.sessionStorage.getItem('src'),
            projectName: 'a',
            iframeSrc: "https://online.visual-paradigm.com/app/diagrams/#diagram:proj=0&type=ClassDiagram&gallery=/repository/492e9b34-93bb-426d-b807-003cb1e4875c.xml&name=Students%20Enrollment%20Class%20Diagram",

        }
    },
    created() {
        this.projectName = sessionStorage.getItem('project')
    },
    mounted() {
        /**
         * iframe-宽高自适应显示
         */
        function changeMapIframe() {
            const map = document.getElementById('map');
            const deviceWidth = document.body.clientWidth;
            const deviceHeight = document.body.clientHeight;
            map.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
            map.style.height = (Number(deviceHeight) + 560) + 'px'; //数字是页面布局高度差
        }

        function reload() {
            if (location.href.indexOf("#reloaded") == -1) {
                location.href = location.href + "#reloaded";
                location.reload();
            }
        }

        reload()
        changeMapIframe()


        window.onresize = function(){
            changeMapIframe()
        }
    },
    methods: {
        gotoCenter(){
            this.$router.push({name:'userInfo'})
        },
        handleSelect(key, keyPath) {
            if (key === '/workSpace/groupProject' || key === '/home'
                || key === '/workSpace') {
                this.$router.push({ path: key })
            }
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
        goBack() {
            this.$router.push({ path: '/workSpace/proInterface' })
        },


        setIframeHeight(iframe) {
            if (iframe) {
                var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if (iframeWin.document.body) {
                    iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
                }
            }
        },

    }
}
</script>


<style scoped>

</style>
