"use strict";

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var csso = require('gulp-csso');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');

var components = './app/bower_components/';

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('concatAngularJS', function(){
	return gulp.src('./app/js/angularApp/**/*.js')
			.pipe(concat('app.js'))
			.pipe(gulp.dest('./app/js/'))
			.pipe(connect.reload());
});

gulp.task('concatUsageJS', function(){
	return gulp.src([
						// Angular JS
						components + 'angular/angular.min.js',
						components + 'angular-route/angular-route.min.js'
					])
			.pipe(concat('usage_components.js'))
			.pipe(gulp.dest('./app/js/'));
});

gulp.task('usageBootstrap', function(){
	return gulp.src([
						components + 'bootstrap/less/mybootstrap.less'
					])
				.pipe(less({
      						paths: components + 'bootstrap/less/mixins'
    					}))
				.pipe(concat('bootstrap.min.css'))
				.pipe(csso())
				.pipe(minifyCss())
				.pipe(gulp.dest(components + 'bootstrap/myUsageBootstrap/'));
});

gulp.task('concatUsageCSS', ['usageBootstrap'], function(){
	return gulp.src([
						// Reset CSS
						components + 'reset-css/reset.css',
						// Bootstrap CSS
						components + 'bootstrap/myUsageBootstrap/bootstrap.min.css'
					])
			.pipe(csso())
			.pipe(minifyCss())
			.pipe(concat('usage_components.css'))
			.pipe(gulp.dest('./app/css/'));
});

gulp.task('compileSass', function(){
	return gulp.src('./app/sass/**/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(concat('style.css'))
			.pipe(autoprefixer('last 2 versions'))
			.pipe(csso())
			.pipe(minifyCss())
			.pipe(gulp.dest('./app/css/'))
			.pipe(connect.reload());
});

gulp.task('watch', function(){
	gulp.watch('./app/js/angularapp/**/*.js',['concatAngularJS']);
	gulp.watch('./app/sass/**/*.scss',['compileSass']);
	gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', ['connect', 'concatUsageJS', 'concatUsageCSS', 'watch']);