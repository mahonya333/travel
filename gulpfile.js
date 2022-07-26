const { series, parallel, dest, watch, src } = require("gulp"),
    concat = require("gulp-concat"),
    concatCss = require("gulp-concat-css"),
    autoprefixer = require("gulp-autoprefixer"),
    uglifyjs = require("uglify-js"),
    composer = require("gulp-uglify/composer"),
    uglify = composer(uglifyjs, console),
    scss = require("gulp-sass")(require("sass")),
    cleanCSS = require("gulp-clean-css"),
    gzip = require("gulp-gzip"),
    imagemin = require("gulp-imagemin"),
    del = require("del");

function baseLibCss() {
    return src("node_modules/normalize.css/normalize.css")
        .pipe(concatCss("lib.css"))
        .pipe(cleanCSS())
        .pipe(dest("travel/base/css"))
        .pipe(gzip())
        .pipe(dest("travel/base/css"));
}

function baseLibJs() {
    return src('node_modules/swiper/swiper-bundle.min.js')
        .pipe(concat("lib.js"))
        .pipe(dest("travel/base/js"))
        .pipe(gzip())
        .pipe(dest("travel/base/js"));
}

function baseMainCss() {
    return src("assets/scss/basis/base-style.scss")
        .pipe(src("node_modules/swiper/swiper-bundle.min.css"))
        .pipe(scss())
        .pipe(concat("main.css"))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(dest("travel/base/css"))
        .pipe(gzip())
        .pipe(dest("travel/base/css"));
}

function homeMainCss() {
    return src("assets/scss/pages/home.scss")
        .pipe(scss())
        .pipe(concat("main.css"))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(dest("travel/home/css"))
        .pipe(gzip())
        .pipe(dest("travel/home/css"));
}

function homeMainJs() {
    return src("assets/js/main.js")
        .pipe(concat("index.js"))
        .pipe(uglify())
        .pipe(dest("travel/home/js"))
        .pipe(gzip())
        .pipe(dest("travel/home/js"));
}

function imgCompress() {
    return src("assets/img/**/*")
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.mozjpeg({ quality: 75, progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
                }),
            ])
        )
        .pipe(dest("travel/img"));
}

function cleanTravelFolder() {
    return del("travel");
}

function fonts() {
    return src("assets/fonts/**/*").pipe(dest("travel/fonts"));
}

function watching() {
    watch(["assets/scss/**/*.scss"], exports.compilingCssFiles);
    watch(["assets/js/**/*.js"], exports.compilingJsFiles);
    watch(["node_modules/**/*"], exports.compilingLibFiles);
}

exports.compilingLibFiles = parallel(baseLibCss, baseLibJs);

exports.compilingJsFiles = parallel(homeMainJs);
exports.compilingCssFiles = parallel(baseMainCss, homeMainCss);


exports.compilingFiles = parallel(
    exports.compilingCssFiles,
    exports.compilingJsFiles,
    exports.compilingLibFiles
);

exports.cleanTravelFolder = cleanTravelFolder;
exports.watching = watching;

exports.default = series(
    cleanTravelFolder,
    fonts,
    imgCompress,
    exports.compilingFiles
);
