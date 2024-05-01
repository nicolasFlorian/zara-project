import VitePluginSvgSpritemap from '@spiriit/vite-plugin-svg-spritemap'
import viteImagemin from 'vite-plugin-imagemin'

export default {
    plugins: 
    [
        VitePluginSvgSpritemap('./src/icons/**/*.svg',{
            output: {
                name: 'icons.svg',
                svgo: true,
                use: true,
            },
        }),
        viteImagemin({
            mozjpeg: {
                quality: 30,
            }
        }),
    ],
    root: './src',
    base: './',
    build: {
        outDir: '../dist',
    }
}