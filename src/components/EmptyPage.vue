<template>

</template>

<script>
export default {
    name: 'EmptyPage',
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.$router.push({name:'manageMember'})
        })
    },
}
</script>

<style scoped>

</style>
