/**
 * Utilizando plugin do gulp, o gulp-inject.
 *
 * No decorrer do desenvolvimento muitos artefatos vem e vão.
 * Manter o index.html atualizado com todos eles é maçante.
 * Um script como esse pode eliminar algumas dores de cabeça no futuro.
 *
 * Para executar utilize "gulp index" no terminal
 * index é o nome da tarefa (task).
 *
 * Também adicionei um script ao npm:
 * "npm run setup-index"
 *
 * Talvez seja preciso apenas instalar o gulp-cli globalmente.
 * "npm install -g gulp-cli"
 */
var gulp          = require("gulp"),
    inject       = require("gulp-inject");

gulp.task('index', function () {

    var target = gulp.src('./app/index.html');

    // js
    var controllers = gulp.src('./app/js/controller/**/*.js', {read: false});
    var services = gulp.src('./app/js/services/**/*.js', {read: false});

    // example
    //var general = gulp.src(['./app/**/*.js', '!./app/services/*.js'], {read: false});

    //css
    var css = gulp.src('./app/**/*.css', {read: false});

    return target.pipe(inject(services,{name:'services'}))
        .pipe(inject(controllers,{name:'controllers'}))
        .pipe(inject(css))
        .pipe(gulp.dest('./app'));
});
