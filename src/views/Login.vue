<template>
    <div class="login">
        登录页
        <button @click="login">登录</button>
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
        
    },
    methods: {
        login() {
            login({ name: '乌蝇哥', id: 123456 }).then(data => {
                console.log(data);
                if (data.code == 200) {
                    this.$store.commit('setLoginName', data.data.name);
                    this.$router.replace(this.$route.query.redirect || '/')
                }
            });
        }
    }
}
</script>
<style scoped>
.theme-buttons {
    display: flex;
}
</style>