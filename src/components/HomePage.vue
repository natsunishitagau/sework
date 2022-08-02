<template>
  <NaviBar></NaviBar>
  <p>Welcome 墨书</p>
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
  padding-top: 80px;
  font-size: 50px;
}
</style>