import LazyModule from './lazyModule';

const lazyModule = new LazyModule({
    'light': { type: 'css', path: 'themes/light.css' },
    'night': { type: 'css', path: 'themes/night.css' }
});

export function changeTheme(theme) {
    let lastTheme = window.THEME;

    if (theme && lastTheme !== theme) {
        if (window.STATIC_THEME === theme) {
            lazyModule.remove(lastTheme);
        } else {
            lazyModule.load(theme);
        }

        // 修改主题
        window.THEME = theme;
    }
}