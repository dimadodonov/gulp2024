import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin, { mozjpeg, optipng, svgo } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';

import { config } from '../config.js';

const copyImages = () =>
    gulp
        .src(`${config.src.images}/**/*`)
        .pipe(changed(config.dest.images))
        .pipe(
            gulpif(
                config.isProd,
                imagemin([
                    mozjpeg({ quality: 75, progressive: true }),
                    optipng({ optimizationLevel: 5 }),
                    svgo({
                        plugins: [
                            {
                                name: 'removeViewBox',
                                active: true,
                            },
                            {
                                name: 'cleanupIDs',
                                active: false,
                            },
                        ],
                    }),
                ])
            )
        )
        .pipe(gulp.dest(config.dest.images));

const convertImagesToWebp = () =>
    gulp
        .src(`${config.src.images}/**/*.{jpg,png}`)
        .pipe(changed(config.dest.images, { extension: '.webp' }))
        .pipe(imagemin([imageminWebp({ quality: 80 })]))
        .pipe(
            rename({
                extname: '.webp',
            })
        )
        .pipe(gulp.dest(config.dest.images));

export const imagesBuild = gulp.series(copyImages, convertImagesToWebp);

export const imagesWatch = () =>
    gulp.watch(`${config.src.images}/**/*`, imagesBuild);
