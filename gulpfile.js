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
