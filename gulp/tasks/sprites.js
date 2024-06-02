import gulp from 'gulp';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import svgmin from 'gulp-svgmin';
import svgSprite from 'gulp-svg-sprite';

import { config } from '../config.js';

const spriteMono = () =>
    gulp
        .src(`${config.src.iconsMono}/**/*.svg`)
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: '../sprite.svg',
                        example: {
                            dest: '../symbols.html',
                        },
                    },
                },
                shape: {
                    transform: [
                        {
                            svgo: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        removeAttrs: {
                                            attrs: ['class', 'data-name'],
                                        },
                                    },
                                ],
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest(config.dest.files));

const spriteMulti = () =>
    gulp
        .src(`${config.src.iconsMulti}/**/*.svg`)
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: '../sprites/sprite-multi.svg',
                    },
                },
                shape: {
                    transform: [
                        {
                            svgo: {
                                plugins: [
                                    {
                                        removeAttrs: {
                                            attrs: ['class', 'data-name'],
                                        },
                                    },
                                    {
                                        removeUselessStrokeAndFill: false,
                                    },
                                    {
                                        inlineStyles: true,
                                    },
                                ],
                            },
                        },
                    ],
                },
            })
        )
        .pipe(gulp.dest(config.dest.files));

const spriteSVGO = () =>
    gulp
        .src(`${config.src.iconsSVGO}/**/*.svg`)
        .pipe(plumber())
        .pipe(changed(config.dest.files))
        .pipe(
            svgmin({
                multipass: true,
                js2svg: {
                    // Beutifies the SVG output instead of
                    // stripping all white space.
                    pretty: true,
                    indent: 2,
                },
                // The plugins list is the full list of plugins
                // to use. The default list is ignored.
                full: true,
                plugins: [
                    {
                        name: 'removeDesc',
                        active: true,
                    },
                    {
                        name: 'cleanupIDs',
                        active: true,
                    },
                    {
                        name: 'mergePaths',
                        active: false,
                    },
                ],
            })
        )
        .pipe(gulp.dest(config.dest.svgo));

// export const spritesBuild = gulp.parallel(spriteMono, spriteMulti);
export const spritesBuild = gulp.parallel(spriteMono, spriteSVGO);

export const spritesWatch = () => {
    gulp.watch(`${config.src.iconsMono}/**/*.svg`, spriteMono);
    // gulp.watch(`${config.src.iconsMulti}/**/*.svg`, spriteMulti);
    gulp.watch(`${config.src.iconsSVGO}/**/*.svg`, spriteSVGO);
};
