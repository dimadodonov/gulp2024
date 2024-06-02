const srcPath = 'src';
const destPath = 'build';

export const config = {
    src: {
        root: srcPath,
        sass: `${srcPath}/scss`,
        js: `${srcPath}/js`,
        fonts: `${srcPath}/files/fonts`,
        images: `${srcPath}/images`,
        iconsMono: `${srcPath}/files/icons/svg`,
        iconsMulti: `${srcPath}/files/icons/multi`,
        iconsSVGO: `${srcPath}/files/svgo`,
    },

    dest: {
        root: destPath,
        html: destPath,
        css: `${destPath}/css`,
        js: `${destPath}/js`,
        files: `${destPath}/files`,
        fonts: `${destPath}/files/fonts`,
        svgo: `${destPath}/files/icons/svg`,
        images: `${destPath}/images`,
    },

    setEnv() {
        this.isProd = process.argv.includes('--prod');
        this.isDev = !this.isProd;
    },
};

export default config;
