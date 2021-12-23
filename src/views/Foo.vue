<template>
    <div class="foo">
        <div class="pretty"></div>
    </div>
</template>
<script>
import '@/styles/modules/user.scss';

export default {
    asyncData({ store, route }) {
        return Promise.resolve()
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
<style scoped>
.login button {
    cursor: pointer;
}
</style>