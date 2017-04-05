const { mix } = require('laravel-mix');

mix.options({
      uglify: {
        mangle: false,
        compress: {
            warnings: true,
            drop_console: false
        }
      }
    })
    .webpackConfig(require('./webpack.mix.config.js'))
    .sass('resources/assets/sass/app.scss', 'public/css')
    .js('resources/assets/js/app.js', 'public/js')
