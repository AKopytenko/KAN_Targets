module.exports = {

    publicPath: process.env.NODE_ENV === 'production'
        ? '/demo/kantargets'
        : '/',

    pages: {

        index: {
            
            entry: 'src/main.js',
            
            template: 'public/index.html',
            
            filename: 'index.html',
            
            title: 'KAN-Targets',
            
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    }
}