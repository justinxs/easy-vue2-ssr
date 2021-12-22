<template>
    <div class="login">
        登录页
    </div>
</template>
<script>
import { login } from '@/api/user';

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
        setTimeout(() => {
            login({ name: '乌蝇哥', id: 123456 }).then(data => {
                console.log(data);
                if (data.code == 200) {
                    this.$store.commit('setLoginName', data.data.name);
                    this.$router.replace(this.$route.query.redirect || '/')
                }
            });
        }, 1000);
    },
    methods: {
    }
}
</script>