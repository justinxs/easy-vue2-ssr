<template>
    <div class="index">
        index{{ testID }}
        <img style="width: 667px;height: 500px;" src="~@images/flower.webp" alt="">
        <router-link to="/foo">foo</router-link>

        <ul class="theme-buttons">
            <li v-for="theme in themes" :key="theme">
                <button  @click="switchTheme(theme)">{{ theme }}</button>
            </li>
        </ul>
    </div>
</template>
<script>
import { changeTheme } from '@/utils/theme';

export default {
    asyncData({ store, route }) {
        // 触发 action 后，会返回 Promise
        return store.dispatch('test', route.path);
    },
    data() {
        return {
            themes: ['light', 'night']
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
        switchTheme(theme) {
            changeTheme(theme);
        }
    }
}
</script>