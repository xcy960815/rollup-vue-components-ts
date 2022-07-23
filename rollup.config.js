import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import filesize from 'rollup-plugin-filesize'
// import buble from 'rollup-plugin-buble'
import babel from '@rollup/plugin-babel'
import livereload from 'rollup-plugin-livereload'
import replace from 'rollup-plugin-replace'
import del from 'rollup-plugin-delete'
import {
    DEFAULT_EXTENSIONS
} from '@babel/core'
const isProduction = process.env.NODE_ENV === 'production'

export default async () => ({

    input: 'src/index.ts',
    output: [{
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'demo',
            exports: 'named', // 关闭   Mixing named and default exports  警告
            globals: {
                vue: 'Vue'
            },
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            name: 'demo',
            sourcemap: false,
            globals: {
                vue: 'Vue'
            },
        },
    ],

    context: "window", //屏蔽 'THIS_IS_UNDEFINED' 警告

    plugins: [
        //源代码更改马上清空dist文件夹下面打包过的文件 防止代码冗余
        isProduction && del({
            targets: [
                'dist',
            ],
        }),
        json(),
        nodeResolve(),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        vue({
            css: true,
            compileTemplate: true,
        }),
        typescript({
            useTsconfigDeclarationDir: true,
            extensions: ['.js', '.ts', '.tsx', ".vue"],
        }),
        babel({
            skipPreflightCheck: true,
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
            // babel 默认不支持 ts 需要手动添加
            extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.vue']
        }),

        isProduction && (await import('rollup-plugin-terser')).terser(),
        filesize(),
        // 热更新
        !isProduction && livereload(),
    ],
    external: ['vue'],
})