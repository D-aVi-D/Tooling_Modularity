var gulp = require('gulp');
var connect = require('gulp-connect');
var jade = require('gulp-jade');
var rjs = require('gulp-requirejs');
// add required packages
var sass = require('gulp-sass');
//var uglify = require('gulp-uglifyjs');		//Uncomment for second variant of uglification
var uglify = require('gulp-uglify');

gulp.task('connect', function() {
	connect.server({
		port: 47,
		livereload: true,
		root: ['dist', 'dist/html']
	});
});

gulp.task('jade', function() {
	gulp.src('src/jade/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('dist/html'))
		.pipe(connect.reload());
});

gulp.task('sass', function() {
	// implement sass task
	return gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());
});

gulp.task('requireJS', function() {
	// implement bundle.js file uglification
	rjs({
		baseUrl: 'src/js',
		name: '../../node_modules/almond/almond',
		include: ['app'],
		insertRequire: ['app'],
		out: 'bundle.js',
		wrap: true
	})
	.pipe(uglify())				//Comment for second variant of uglification
	.pipe(gulp.dest('dist/js'))
	.pipe(connect.reload());
});

/*gulp.task('uglify', ['requireJS'], function() {		//Uncomment for second variant of uglification
  gulp.src('dist/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});*/


gulp.task('watch', function() {
	gulp.watch('src/jade/*.jade', ['jade']);
	// add watch for .sass and .js files
	gulp.watch('src/js/*.js', ['requireJS']);
	//gulp.watch('src/js/*.js', ['requireJS', 'uglify']);		//Uncomment for second variant of uglification
	gulp.watch('src/sass/*.sass', ['sass']);
});

gulp.task('default', ['requireJS', 'jade', 'sass', 'connect', 'watch']);
//gulp.task('default', ['requireJS', 'uglify', 'jade', 'sass', 'connect', 'watch']);	//Uncomment for second variant of uglification