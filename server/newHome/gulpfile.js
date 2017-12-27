"use strict";

var gulp = require("gulp"),
    minifyCSS = require("gulp-minify-css"),
    autoprefixer = require("gulp-autoprefixer"),
    imagemin = require("gulp-imagemin"),
    changed = require("gulp-changed"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    jshint = require("gulp-jshint"),
    uglify = require("gulp-uglify"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    sass = require("gulp-sass");


//编译sass,压缩css并输出
var sassSrc = "src/sass/**/*.scss",
    cssDest = "../public/css",
    sassDest = "src/css";
gulp.task("sass",function(){
    gulp.src("src/sass/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS({keepSpecialComments: '*'}))
        .pipe(gulp.dest("../public/css"))
})

//压缩js并输出
var jsSrc = "src/js/*.js",
    jsDest = "../public/js";
gulp.task("uglifyjs", function() {
    return gulp.src(jsSrc)
        .pipe(plumber())
        .pipe(changed(jsDest))
        // .pipe(rename({ suffix: ".min" }))
        .pipe(jshint())
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});


//压缩图片并输出
var imagesSrc = "src/images/**/*",
    imagesDest = "../public/images";
gulp.task("images", function() {
    return gulp.src(imagesSrc)
        .pipe(plumber())
        .pipe(changed(imagesDest))
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(imagesDest));
});


//默认任务
gulp.task("default", ["sass", "images", "uglifyjs", "watch"]);


//监听任务
gulp.task("watch", function() {
    // 监听sass
    gulp.watch(sassSrc, ["sass"]);

    // 监听images
    gulp.watch(imagesSrc, ["images"]);

    // 监听js
    gulp.watch(jsSrc, ["uglifyjs"]);

});
