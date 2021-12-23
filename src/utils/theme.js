import LazyModule from './lazyModule';

const lazyModule = new LazyModule({
    sourceMap: {
        'light': { type: 'css', path: 'themes/light.css' },
        'night': { type: 'css', path: 'themes/night.css' }
    },
    versionMeta: 'timestamp'
});
const STATIC_THEME = process.env.THEME;
let THEME = process.env.THEME;

export async function changeTheme(theme) {
    let lastTheme = THEME;

    if (theme && lastTheme !== theme) {
        // 修改主题
        THEME = theme;
        
        if (STATIC_THEME === theme) {
            await lazyModule.remove(lastTheme);
        } else {
            await lazyModule.load(theme);
        }
    }

    return theme;
}