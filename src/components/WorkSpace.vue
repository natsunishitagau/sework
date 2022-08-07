<template>
<div id="app">
    <div class="content">
        <div class="left-navibar2" v-show="mode=='0'||mode=='1'">
            <div class="line" v-if="mode=='0'">
                <div>{{nickname}}</div>
                <hr/>
                <div @click="recent" v-if="loc1!=0">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path><path fill="currentColor" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path></svg>
                    最近浏览
                </div>
                <div @click="recent" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path><path fill="currentColor" d="M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path></svg>
                    最近浏览
                </div>
                <div @click="collect" v-if="loc1!=1">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"></path></svg>
                    我的收藏
                </div>
                <div @click="collect" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z"></path></svg>
                    我的收藏
                </div>
                <div @click="userInfo" v-if="loc1!=2">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path></svg>
                    个人信息
                </div>
                <div @click="userInfo" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M628.736 528.896A416 416 0 0 1 928 928H96a415.872 415.872 0 0 1 299.264-399.104L512 704l116.736-175.104zM720 304a208 208 0 1 1-416 0 208 208 0 0 1 416 0z"></path></svg>
                    个人信息
                </div>
                <div @click="changePwd" v-if="loc1!=3">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"></path></svg>
                    更改密码
                </div>
                <div @click="changePwd" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M771.776 794.88A384 384 0 0 1 128 512h64a320 320 0 0 0 555.712 216.448H654.72a32 32 0 1 1 0-64h149.056a32 32 0 0 1 32 32v148.928a32 32 0 1 1-64 0v-50.56zM276.288 295.616h92.992a32 32 0 0 1 0 64H220.16a32 32 0 0 1-32-32V178.56a32 32 0 0 1 64 0v50.56A384 384 0 0 1 896.128 512h-64a320 320 0 0 0-555.776-216.384z"></path></svg>
                    更改密码
                </div>
            </div>
            <div class="line" v-else-if="mode=='1'">
                <div>{{form.groupName}}</div>

                <hr/>
                <div>
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M704 192h160v736H160V192h160v64h384v-64zM288 512h448v-64H288v64zm0 256h448v-64H288v64zm96-576V96h256v96H384z"></path></svg>
                    团队信息
                </div>
                <div @click="project" v-if="loc2!=2">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M640 384v256H384V384h256zm64 0h192v256H704V384zm-64 512H384V704h256v192zm64 0V704h192v192H704zm-64-768v192H384V128h256zm64 0h192v192H704V128zM320 384v256H128V384h192zm0 512H128V704h192v192zm0-768v192H128V128h192z"></path></svg>
                    团队项目
                </div>
                <div @click="project" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M640 384v256H384V384h256zm64 0h192v256H704V384zm-64 512H384V704h256v192zm64 0V704h192v192H704zm-64-768v192H384V128h256zm64 0h192v192H704V128zM320 384v256H128V384h192zm0 512H128V704h192v192zm0-768v192H128V128h192z"></path></svg>
                    团队项目
                </div>
                <div>
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M128 384v448h768V384H128zm-32-64h832a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32zm64-128h704v64H160zm96-128h512v64H256z"></path></svg>
                    文档中心
                </div>
                <div @click="invite" v-show="pos!=2" v-if="loc2!=4">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M926.784 480H701.312A192.512 192.512 0 0 0 544 322.688V97.216A416.064 416.064 0 0 1 926.784 480zm0 64A416.064 416.064 0 0 1 544 926.784V701.312A192.512 192.512 0 0 0 701.312 544h225.472zM97.28 544h225.472A192.512 192.512 0 0 0 480 701.312v225.472A416.064 416.064 0 0 1 97.216 544zm0-64A416.064 416.064 0 0 1 480 97.216v225.472A192.512 192.512 0 0 0 322.688 480H97.216z"></path></svg>
                    邀请成员
                </div>
                <div @click="invite" v-show="pos!=2" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M926.784 480H701.312A192.512 192.512 0 0 0 544 322.688V97.216A416.064 416.064 0 0 1 926.784 480zm0 64A416.064 416.064 0 0 1 544 926.784V701.312A192.512 192.512 0 0 0 701.312 544h225.472zM97.28 544h225.472A192.512 192.512 0 0 0 480 701.312v225.472A416.064 416.064 0 0 1 97.216 544zm0-64A416.064 416.064 0 0 1 480 97.216v225.472A192.512 192.512 0 0 0 322.688 480H97.216z"></path></svg>
                    邀请成员
                </div>
                <div @click="manage" v-if="loc2!=5">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path></svg>
                    成员管理
                </div>
                <div @click="manage" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z"></path></svg>
                    成员管理
                </div>
                <hr/>
                <div @click="bin" v-if="loc2!=6">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></svg>
                    回收站
                </div>
                <div @click="bin" v-else style="background: gray">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></svg>
                    回收站
                </div>
            </div>
        </div>

        <div class="workplace">
            <router-view></router-view>
        </div>

        <div class="left-navibar">
            <header>
                <img :src="avatar" @click="back"/>
            </header>
            <div class="switch" @click="personal" v-if="loc3!=0">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"></path></svg>
                <div>个人空间</div>
            </div>
            <div class="switch" @click="personal" v-else style="color: gray">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M512 128 128 447.936V896h255.936V640H640v256h255.936V447.936z"></path></svg>
                <div>个人空间</div>
            </div>
            <div class="switch" @click="enterGroup" v-if="loc3!=1">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M192 128v704h384V128H192zm-32-64h448a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M256 256h256v64H256v-64zm0 192h256v64H256v-64zm0 192h256v64H256v-64zm384-128h128v64H640v-64zm0 128h128v64H640v-64zM64 832h896v64H64v-64z"></path><path fill="currentColor" d="M640 384v448h192V384H640zm-32-64h256a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H608a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32z"></path></svg>
                <div>我的团队</div>
            </div>
            <div class="switch" @click="enterGroup" v-else style="color: gray">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M192 128v704h384V128H192zm-32-64h448a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32z"></path><path fill="currentColor" d="M256 256h256v64H256v-64zm0 192h256v64H256v-64zm0 192h256v64H256v-64zm384-128h128v64H640v-64zm0 128h128v64H640v-64zM64 832h896v64H64v-64z"></path><path fill="currentColor" d="M640 384v448h192V384H640zm-32-64h256a32 32 0 0 1 32 32v512a32 32 0 0 1-32 32H608a32 32 0 0 1-32-32V352a32 32 0 0 1 32-32z"></path></svg>
                <div>我的团队</div>
            </div>
            <div class="switch" @click="getMes" v-if="loc3!=2">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z"></path><path fill="currentColor" d="M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z"></path></svg>
                <div>我的消息</div>
            </div>
            <div class="switch" @click="getMes" v-else style="color: gray">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224H128zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64z"></path><path fill="currentColor" d="M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224h784zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224H205.056z"></path></svg>
                <div>我的消息</div>
            </div>
            <div class="switch" @click="newTeam">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-78e17ca8=""><path fill="currentColor" d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"></path><path fill="currentColor" d="M480 672V352a32 32 0 1 1 64 0v320a32 32 0 0 1-64 0z"></path><path fill="currentColor" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path></svg>
                <div>新建团队</div>
            </div>
        </div>

    </div>

    <el-dialog v-model="isLookGroup" :visible.sync="isLookGroup" title="团队列表">
        <el-table :data="tableData" height="500" borderstyle="width:100%">

            <el-table-column label="团队名" width="220">
                <template #default="scope">
                    <div >
                        <a :title="scope.row.tname"
                           @click="chooseTeam(scope.$index)">
                            {{scope.row.tname}}
                        </a>
                    </div>

                </template>
            </el-table-column>
            <el-table-column prop="oname" label="创建者" width="150"></el-table-column>
            <el-table-column prop="num" label="团队人数" width="120"></el-table-column>
            <el-table-column prop="time" label="创建时间" width="200"></el-table-column>
        </el-table>
    </el-dialog>
    <el-dialog v-model="dialogVisible" :visible.sync="dialogVisible" title="新建团队" width="500px">
        <el-form :model="teamIn" label-width="100px">
            <el-form-item label="团队名称：">
                <el-input v-model="teamIn.groupName" show-word-limit maxlength="15"/>
            </el-form-item>
            <el-form-item v-show="teamIn.groupName.length===0" style="color: red">
                团队名不能为空
            </el-form-item>
        </el-form>
        <span class="sure" @click="create">确定</span>
    </el-dialog>
</div>
</template>

<script>
export default {
    name: 'workSpace',
    data() {
        return {
            form: {
                email: "",
                groupName: "",
            },
            teamIn:{
                email: "",
                groupName: "",
            },
            avatar: "",
            nickname: "",
            mode: "",
            teams: [],
            isLookGroup: false,
            tableData: [],
            poses: [],
            pos: 2,
            dialogVisible:false,
            loc1: 0,
            loc2: 5,
            loc3: 0,
        }
    },
    methods: {
        created(){
            this.loc1=sessionStorage.getItem('loc1')
            sessionStorage.setItem('mode', '0')
        },
        back() {
            sessionStorage.setItem('mode', '0')
            this.$router.push({name: 'userCenter'});
        },
        personal() {
            this.loc1=0;
            this.loc2=5
            this.loc3=0
            this.mode='0';
            sessionStorage.setItem("mode",'0');
            if(this.$router.currentRoute.path !== '/workSpace')
                this.$router.push({name: 'workSpace'});
        },
        recent() {
            this.loc1=0
            this.$router.push({name: 'recentLook'});
        },
        newGroup() {
            this.$router.push({name: 'newGroup'});
        },
        enterGroup() {
            this.loc1=0
            this.loc2=5
            // this.mode='1';
            // sessionStorage.setItem("mode",'1');
            // this.$router.push({name: 'manageMember'});
            this.lookGroups();
            this.isLookGroup=true;
        },
        lookGroups() {
            var that=this;
            this.tableData=[];
            this.form.groupName=sessionStorage.getItem("group");
            this.$axios.post('/group/checkGroups/',this.$qs.stringify(this.form))
                .then(res =>{
                    console.log(res);
                    var i;
                    that.teams=res.data.groupNames;
                    that.poses=res.data.positions;
                    for(i=0;i<res.data.groupNames.length;i++)
                    {
                        var team={tname:"",oname:"",num:"",time:""};
                        team.tname=res.data.groupNames[i];
                        team.oname=res.data.ownerNames[i];
                        team.num=res.data.membersNumber[i];
                        team.time=res.data.createTimes[i];
                        that.tableData.push(team);
                    }
                })
        },
        chooseTeam(i) {
            this.mode='1';
            this.loc3=1
            sessionStorage.setItem("mode",'1');
            this.isLookGroup=false;
            this.form.groupName=this.teams[i];
            sessionStorage.setItem("group",this.form.groupName)
            this.pos=this.poses[i];
            sessionStorage.setItem("pos",this.pos)
            if(this.$router.currentRoute.path=='/workSpace/manageMember')
            {
                this.$router.push({name:'emptyPage'})
            }
            this.$router.push({name: 'manageMember',params: {name:this.form.groupName}});
        },
        project() {
            this.loc2=2
            this.$router.push({name: 'groupProject'});
        },
        collect() {
            this.loc1=1
            this.$router.push({name: 'collectProject'});
        },
        userInfo(){
            this.loc1=2
            this.$router.push({name: 'userInfo'})
        },
        changePwd(){
            this.loc1=3
            this.$router.push({name: 'changePwd'})
        },
        getMes(){
            this.loc1=0
            this.loc2=5
            this.loc3=2
            this.mode='2';
            this.$router.push({name: 'messageCheck'})
        },
        invite() {
            this.loc2=4
            this.$router.push({name: 'inviteMember'});
        },
        manage() {
            this.loc2=5
            this.$router.push({name: 'manageMember'});
        },
        bin() {
            this.loc2=6
            this.$router.push({name: 'recycleBin'});
        },
        newTeam(){
            this.dialogVisible = true;
        },
        create() {
            const that=this;
            this.$axios.post('/group/createGroup/',this.$qs.stringify(that.teamIn))
                .then(res =>{
                    console.log(res);
                    if(res.data.result==0){
                        that.$message.success("创建团队成功！")
                        that.dialogVisible=false
                        that.teamIn.groupName=''
                    }
                    else that.$message.error("团队名称已存在!")
                })
        }
    },
    created() {
        this.teamIn.email=sessionStorage.getItem('email')
        this.form.groupName=sessionStorage.getItem('group')
        this.mode=sessionStorage.getItem("mode");
        this.avatar=sessionStorage.getItem("src");
        this.form.email=sessionStorage.getItem("email");
        this.nickname=sessionStorage.getItem("nickname");
        this.pos=sessionStorage.getItem("pos");
    },
    beforeCreate() {
        document.getElementsByTagName("html")[0].className="bg";
        document.body.className="bg";
    },
    beforeUnmount() {
        document.body.removeAttribute("bg");
        document.getElementsByTagName("html")[0].removeAttribute("bg");
    }
}
</script>

<style>
    #app
    {
        font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100vh;
    }
    .bg
    {
        height: 100%;
    }
</style>

<style scoped>
    svg
    {
        width: 40px;
        height:40px;
    }
    .left-navibar
    {
        color: white;
        position: absolute;
        height: 100%;
        width: 90px;
        background-color: #343e4f;
        display: flex;
        flex-direction: column;
        font-size: 13px;
        top: 0;
        left: 0;
    }
    header
    {
        margin-top:30px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    header img
    {
        width: 50px;
        height: 50px;
        cursor: pointer;
        border-radius: 50%;
    }
    .switch
    {
        margin-top: 50px;
        text-align: center;
        cursor: pointer;
    }
    div>img
    {
        width: 42px;
        height:42px;
        margin-bottom: 10px;
    }
    .content
    {
        padding-left: 90px;
        height: 100%;
        display: flex;
        flex: 1;
    }
    .left-navibar2
    {
        width: 240px;
        font-size: 15px;
        height: 100%;
        flex-direction: column;
        border-right: 1px solid silver;
        background-color: rgb(247,247,249);
    }
    .line div:first-child
    {
        font-size: 20px;
    }
    .line div
    {
        margin: 15px 20px;
        padding: 8px 10px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .line div+div:hover,hr+div:hover
    {
        background-color: rgb(234, 234, 234);
    }
    .line svg
    {
        width: 16px;
        height:16px;
        margin-right: 10px;
    }
    hr
    {
        width: 90%;
    }
    .line div:first-child
    {
        justify-content: center;
        font-weight: 600;
    }
    .workplace
    {
        flex: 1;
        margin: 36px 50px;
        text-align: left;
    }
    ul
    {
        max-height:500px;
        overflow-y:scroll;
    }
    li
    {
        font-size: 16px;
        padding: 5px 10px;
        border-radius: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
    li:hover
    {
        background-color: rgb(240, 240, 240);;
    }
    a{cursor: pointer;}
    a:hover{text-underline-offset: 1px;text-decoration: underline;}
    .sure
    {
        margin-top: -15px;
        text-align: center;
        float:left;
        margin-left: 40%;
        height: 36px;
        line-height: 36px;
        width: 70px;
        background-color: #00c3ff;
        color: white;
        cursor: pointer;
        border-radius: 5px;
    }
    .sure:active
    {
        background-color: rgb(100, 200, 237);
    }
</style>
