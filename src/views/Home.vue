<template>
    <div class="index">
        index{{ testID }}
        <img src="~@images/flower.webp" alt="">
        <router-link to="/foo">foo</router-link>
    </div>
</template>
<script>
import { login } from '@/api/user';

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
        login({ name: '乌蝇哥', id: 123456 }).then(data => {
            console.log(data);
        });
    },
    methods: {
    }
}
</script>