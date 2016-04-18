var less = require('gulp-less');
var path = require('path');
var webpack = require('gulp-webpack');
var gulp = require('gulp');
var named = require('vinyl-named');
var concat = require('gulp-concat');
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");

var appList = ['app'];
var commonList = ['jquery','jquery.form'];

gulp.task('less', function () {
    return gulp.src('./src/less/page/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        })).pipe(gulp.dest('./dist/css'));
});
gulp.task('common',function(){
    return gulp.src(mapLibFiles(commonList,'js'))
        .pipe(concat('common.js'))
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('watch', function() {
    gulp.watch('./src/less/**/*.less',['less']);
    return gulp.watch('./src/js/**/*.*',['bundle']);
});

gulp.task('buildBundle', function() {
    return gulp.src(mapFiles(appList, 'js'))
        .pipe(named())
        .pipe(webpack(getConfig()))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('bundle', function() {
    return gulp.src(mapFiles(appList, 'js'))
        .pipe(named())
        .pipe(webpack(getConfig()))
        .pipe(gulp.dest('dist/js/'));
});
gulp.task('mvPic',function() {
		return gulp.src('src/image/*')
        .pipe(gulp.dest('dist/image/'));
});
gulp.task('default', ['bundle','common','less','watch','mvPic']);

gulp.task('build',['common','buildBundle','less','mvPic']);

/**
 * @private
 */
function getConfig(opt) {
    var config = {
        module: {
            loaders: [
                { test: /\.vue$/, loader: 'vue'}
            ]
        },
        devtool: 'source-map'
    }
    if (!opt) {
        return config
    }
    for (var i in opt) {
        config[i] = opt[i]
    }
    return config
}

/**
 * @private
 */
function mapFiles(list, extname) {
    return list.map(function (app) {return 'src/js/' + app + '.' + extname})
}

function mapLibFiles(list, extname) {
    return list.map(function (app) {return 'src/js/lib/' + app + '.' + extname})
}