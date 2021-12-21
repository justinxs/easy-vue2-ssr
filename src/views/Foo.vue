<template>
    <div class="foo">
        <div class="pretty"></div>
    </div>
</template>
<script>
export default {
    asyncData({ store, route }) {
        return Promise.resolve()
    },
    seo() {
        return {
            title: 'foo',
            keywords: 'foo',
            description: 'foo'
        }
    },
    data() {
        return {
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