let mix = require('laravel-mix');

const themeName = "riversedge_com";
const themePath = 'wp-content/themes/' + themeName

mix.js(
        'assets/js/app.js', 'assets/build/scripts/app.min.js'
    ).sourceMaps()
    .sass(
        'assets/scss/app.scss', 'assets/build/css/app.min.css'
    ).sourceMaps()