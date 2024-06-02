import browserSync from 'browser-sync';

import { config } from '../config.js';

const server = (callback) => {
    browserSync.create().init({
        server: {
            baseDir: `./`,
        },
        files: [
            `./**/*.html`,
            `${config.dest.css}/*.css`,
            `${config.dest.js}/*.js`,
            {
                match: `${config.dest.images}/**/*`,
                fn() {
                    this.reload();
                },
            },
        ],
        notify: false,
        open: true,
        browser: 'Firefox',
    });

    callback();
};

export default server;
