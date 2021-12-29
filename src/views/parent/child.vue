<template>
    <div class="child">
        <h5>child</h5>
        <img style="width: 667px;height: 500px;" src="~@images/flower.webp" alt="">
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    components: {
    },
    created() {
    },
    mounted() {
        console.log(this.$route.path)
        console.log(this.$router.resolve('/child'))
    },
    methods: {
    }
}
</script>