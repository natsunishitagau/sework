<template>
  <div>
    <NaviBar></NaviBar>
    <p>Welcome 墨书</p>
  </div>
</template>

<script>
import NaviBar from "./NaviBar.vue";
export default {
  name: 'HomePage',
  data() {
    return {
      email: "",
    }
  },
  components: {
    NaviBar
  },
  methods: {

  },
  created() {
    
  }
}
</script>

<style scoped>
p
{
  padding-top: 200px;
  padding-left: 450px;
  font-size: 50px;
}
</style>