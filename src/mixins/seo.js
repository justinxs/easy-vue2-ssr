function getSeo(vm) {
    // 组件可以提供一个 `seo` 选项
    // 此选项可以是 { title, keywords, description }
    const { seo } = vm.$options;
    if (seo) {
        return typeof seo === 'function'
            ? seo.call(vm)
            : seo
    }
}

const serverSeoMixin = {
    created() {
        const seo = getSeo(this);
        if (seo) {
            Object.keys(seo).forEach(key => {
                switch (key) {
                    case 'title':
                        this.$ssrContext.title = seo[key];
                        break;
                    case 'keywords':
                    case 'description':
                        this.$ssrContext.meta += `<meta name=${key} content=${seo[key]}>`;
                        break;
                    default:
                        break;
                }
            });
        }
    }
};

const clientSeoMixin = {
    mounted() {
        const seo = getSeo(this);
        if (seo) {
            Object.keys(seo).forEach(key => {
                switch (key) {
                    case 'title':
                        document.title = seo[key];
                        break;
                    case 'keywords':
                    case 'description':
                        if (document.head.querySelector(`meta[name=${key}]`)) {
                            document.head.querySelector(`meta[name=${key}]`).setAttribute('content', seo[key]);
                        } else {
                            const meta = document.createElement('meta');
                            meta.setAttribute('name', key);
                            meta.setAttribute('content', seo[key]);
                            document.head.appendChild(meta);
                        }
                        break;
                    default:
                        break;
                }
            });
        }
    }
};

// 可以通过 `webpack.DefinePlugin` 注入 `VUE_ENV`
export default process.env.VUE_ENV === 'server'
    ? serverSeoMixin
    : clientSeoMixin;