const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin'); // Importando o imagemin
const uglify = require('gulp-uglify'); // Importando o gulp-uglify

// Função para processar imagens
function imagens() {
    return gulp.src('./src/imagens/**/*') // Ajuste o caminho para pegar todos os arquivos de imagem
        .pipe(imagemin()) // Otimizando imagens
        .pipe(gulp.dest('./dist/imagens')); // Pasta de destino para imagens otimizadas
}

// Função para processar estilos
function styles() {
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })) // Compilando e minificando SASS
        .pipe(gulp.dest('./dist/css')); // Pasta de destino para estilos compilados
}

// Função para processar e minificar scripts JavaScript
function scripts() {
    return gulp.src('./src/scripts/*.js') // Caminho para os arquivos JavaScript
        .pipe(uglify()) // Minificando os scripts
        .pipe(gulp.dest('./dist/scripts')); // Pasta de destino para scripts minificados
}

// Tarefa de build padrão
exports.default = gulp.series(styles, imagens, scripts); // Inclui a tarefa de scripts na build padrão

// Tarefa watch
exports.watchFiles = function() {
    gulp.watch('./src/styles/*.scss', styles); // Observando mudanças nos arquivos SASS
    gulp.watch('./src/imagens/**/*', imagens); // Observando mudanças nas imagens
    gulp.watch('./src/scripts/*.js', scripts); // Observando mudanças nos arquivos JavaScript
};

// Tarefa watch que também pode ser exportada
exports.watch = gulp.series(exports.default, exports.watchFiles); // Executa a build padrão junto com a tarefa watch
