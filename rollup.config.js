import del from 'rollup-plugin-delete' //
import { nodeResolve } from '@rollup/plugin-node-resolve' //将外部引入的js打包进来
import commonjs from '@rollup/plugin-commonjs' //将CommonJS模块转换为ES6, 方便rollup直接调用
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'
import serve from 'rollup-plugin-serve'
import postcss from 'rollup-plugin-postcss' // 编译css
import livereload from 'rollup-plugin-livereload'
const isProduction = process.env.NODE_ENV === 'production'

export default async () => ({
    input: 'src/index.js',
    output: [
        {
            file: './dist/index.umd.js',
            format: 'umd',
            name: 'index',
            globals: { vue: 'Vue' },
        },
        {
            file: 'demo/index.umd.js',
            name: 'index',
            format: 'umd',
            globals: { vue: 'Vue' },
        },
        // {
        //     file: './dist/index.amd.js',
        //     format: 'amd',
        //     name: 'index',
        // },
        // {
        //     file: './dist/index.es.js',
        //     format: 'es',
        //     name: 'index',
        // },
    ],
    watch: {
        include: 'src/**/*',
    },
    plugins: [
        //源代码更改马上清空dist文件夹下面打包过的文件 防止代码冗余
        del({ targets: ['dist'] }),
        nodeResolve(), //将外部引入的js打包进来
        commonjs({
            // 将CommonJS模块转换为ES6, 方便rollup直接调用
            include: 'node_modules/**',
        }),
        postcss(), //编译css文件
        vue({
            css: true,
            compileTemplate: true,
        }),
        // 线上启用压缩模式
        isProduction && (await import('rollup-plugin-terser')).terser(),
        babel({
            exclude: 'node_modules/**', //排除node_modules下面的所有的代码 只编译自己的代码
        }),
        // 开启服务
        !isProduction &&
            serve({
                open: false,
                host: 'localhost',
                port: 9004,
                historyApiFallback: true,
                contentBase: 'demo',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            }),
        // 热更新
        !isProduction && livereload(),
    ],
})
