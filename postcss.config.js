module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        ...module(process.env.NODE_ENV === 'production' ? {
            '@fullhuman/postcss-purgecss': {
                content: [
                    './components/**/*.js',
                    './pages/*.js',
                ],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
            }
        }
        :{})
    }
}