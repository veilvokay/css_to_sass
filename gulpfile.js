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
        html: '',
        styles: [''],
        js: [''],
        fonst: [''],
        images: 'app/images/**/*'
    },
    build: {
        html: 'build/',
        styles: 'build/css',
        js: 'build/js',
        fonts: 'build/fonts/',
        images: 'build/images/'
    }
};

function style() {
    return gulp.src('./styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './app'
        }
    });
    gulp.watch('./app/styles/**/*.scss', style);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
    gulp.watch('./app/js/**/*.js').on('change', browserSync.reload);
}




exports.style = style;
exports.watch = watch;