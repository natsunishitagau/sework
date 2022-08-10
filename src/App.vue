<template>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'App',
    components: {
    }
}
</script>

<style>
body
{
    margin: 0;
    padding: 0;
}
#app
{
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
a{text-decoration: none;}
.el-empty
{
    margin-top: 130px;
}
.el-dialog
{
  border-radius: 8px !important;
}
.el-dialog__header
{
    font-size: 20px;
    text-align: center;
    font-weight: bold;
}
.el-dialog__body
{
    padding: 15px 40px 60px 40px !important;
}
ul
{
    padding-inline-start: 0 !important;
    list-style-type: none;
}
hr
{
    border: none;
    height: 1px;
    background-color: rgb(220,223,230);
}
::-webkit-scrollbar
{
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-thumb
{
    background-color: rgb(167, 159, 159);
    border-radius: 32px;
}
::-webkit-scrollbar-track
{
    background-color: transparent;
    border-radius: 32px;
}
</style>
