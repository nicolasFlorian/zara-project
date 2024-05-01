import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'

export default {
    plugins: [VitePluginSvgSpritemap('./src/icons/**/*.svg',{
        output: {
            name: 'icons.svg',
            svgo: true,
            use: true,
        },
    })],
    root: './src',
    base: './',
    build: {
        outDir: '../dist',
    }
}