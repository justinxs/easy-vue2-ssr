<template>
    <div class="index">
        index{{ testID }}
        <img src="~@images/flower.webp" alt="">
        <router-link to="/foo">foo</router-link>
    </div>
</template>
<script>
export default {
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('test', route.path + 99999);
    },
    seo() {
        return {
            title: 'index',
            keywords: 'index',
            description: 'index'
        }
    },
    data() {
        return {
        }
    },
    computed: {
        testID() {
            return this.$store.state.testID;
        }
    },
    components: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
}
</script>