const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const minifyCss = require('gulp-minify-css');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const shell = require('gulp-shell');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const path = {
    src: {
        html: 'app/index.html',
        styles: [
            './app/styles/CSS/vendors/*.css',
            './app/styles/CSS/fonts.css',
            './app/styles/CSS/app.css'
        ], 
        js: [
            './app/js/libs/*.js',
            './app/js/bootstrap.js'
        ],
        fonst: ['./app/fonts/**/*'],
        images: './app/images/**/*'
    },
    build: {
        html: 'build/',
        styles: 'build/css/',
        js: 'build/js/',
        fonts: 'build/fonts/',
        images: 'build/images/'
    }
};

function style () {
    return gulp.src('./app/styles/SCSS/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/styles/CSS'))
    .pipe(browserSync.stream());
};

function js () {
    return gulp.src(path.src.js)
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}))
};

function css () {
    return gulp.src(path.src.styles)
    .pipe(minifyCss())
    .pipe(concat('main.css'))
    .pipe(gulp.dest(path.build.styles))
    .pipe(reload({stream: true}))
};

function html () {
    return gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}))
};

function fonts () {
    return gulp.src(path.src.fonst)
    .pipe(gulp.dest(path.build.fonts))
    .pipe(reload({stream: true}))
};

function img () {
    return gulp.src(path.src.images)
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ], {
        verbose: true
    }))
    .pipe(gulp.dest(path.build.images))
};

function cleanBuild () {
    return gulp.src('build').pipe(clean());
};

// function build () {
//     gulp.series(cleanBuild, img, html, fonts, css, js)
// };

// function build () doesn't work, so you have to use 'const build' construction instead
const build = gulp.series(cleanBuild, img, html, fonts, css, js)

function watch() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    });
    gulp.watch('./app/styles/**/*.scss', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
};




exports.style = style; // converts app.scss into app.css
exports.watch = watch; // watches *.scss, *.html and *.js
exports.js = js; // uglifies all *.js and glues them together (main.js)
exports.css = css; // minifies all *.css and glues them together (main.css)
exports.html = html; // copies *.html into the build/ folder
exports.fonts = fonts; // copies all fonts into the build/fonts/ folder
exports.img = img; // optimises all images and puts`em into the build/images folder
exports.cleanBuild = cleanBuild; // deletes buid/ folder
exports.build = build; // deletes previous build/ folder and creates new one w/ all the operations written previously 