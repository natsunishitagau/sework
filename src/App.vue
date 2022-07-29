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
  text-align: center;
}
a{text-decoration: none;}
ul
{
  padding-inline-start: 0 !important;
  list-style-type: none;
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