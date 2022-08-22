import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild'
import { rollup } from 'rollup'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { DIST_DIR, ES_DIR, LIB_DIR, getPackageConfig } from '../common/index.js'
import type { ModuleFormat, OutputOptions, RollupBuild } from 'rollup'

export async function rollupComplie(buildConfig: any, formats: ModuleFormat[], minify?: boolean) {
  const target = 'es2018'

  const packageConfig = getPackageConfig()
  const PKG_NAME = packageConfig.name
  const PKG_VERSION = packageConfig.version
  const banner = `/*! ${PKG_NAME} v${PKG_VERSION} */\n`

  let plugins = [
    commonjs(),
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.ts'],
    }),
    esbuild({
      exclude: [],
      sourceMap: true,
      target,
      loaders: {
        '.vue': 'ts',
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      treeShaking: true,
      legalComments: 'eof',
    }),
    ...buildConfig.plugins,
  ]

  if (minify) {
    plugins.push(minifyPlugin({ sourceMap: true }))
  }

  if (!buildConfig.libType || buildConfig.libType === 'vue') {
    plugins = [vuePlugin(), vueJsx(), ...plugins]
  }

  const inputOptions = {
    input: buildConfig.input,
    plugins,
    treeshake: true,
  }

  const rollupBuild = await rollup(inputOptions)

  const outputOptions: OutputOptions[] = []
  for (const formatMode of formats) {
    if (formatMode === 'umd') {
      outputOptions.push({
        format: 'umd' as ModuleFormat,
        file: path.resolve(DIST_DIR, `index${minify ? '.min' : ''}.js`),
        exports: 'named',
        name: buildConfig.name,
        globals: buildConfig.globals,
        sourcemap: buildConfig.sourcemap,
        banner,
      })
    } else if (formatMode === 'esm') {
      outputOptions.push({
        format: 'esm' as ModuleFormat,
        dir: ES_DIR,
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: `[name].mjs`,
        sourcemap: buildConfig.sourcemap,
        banner,
      })
    } else if (formatMode === 'cjs') {
      outputOptions.push({
        format: 'cjs' as ModuleFormat,
        dir: LIB_DIR,
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        sourcemap: buildConfig.sourcemap,
        entryFileNames: `[name].js`,
        banner,
      })
    }
  }

  writeBundles(rollupBuild, outputOptions)
}

function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)))
}
