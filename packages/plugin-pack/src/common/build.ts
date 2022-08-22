import fs from 'fs'
import { BUILD_CONFIG_DIR, PROJECT_DIR, SRC_DIR } from '../common/index.js'

import type { ModuleFormat } from 'rollup'

export type BundleOption = {
  minify?: boolean
  formats: ModuleFormat[]
  external?: string[]
}

export type LibType = '' | 'lib' | 'vue' | 'react'

export type BuildConfig = {
  libType?: LibType
  input?: string
  name?: string
  globals?: {}
  plugins?: []
  sourcemap?: false
  bundleOption?: BundleOption[]
}

export function readBuildConfig() {
  const lastIndex = PROJECT_DIR.lastIndexOf('/')
  let projectName = PROJECT_DIR.slice(lastIndex, PROJECT_DIR.length)
  projectName = projectName.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))

  const defaultConfig: BuildConfig = {
    libType: '',
    input: SRC_DIR,
    name: projectName,
    globals: {},
    plugins: [],
    sourcemap: false,
    bundleOption: [
      {
        minify: false,
        formats: ['umd'],
      },
      {
        minify: true,
        formats: ['umd'],
      },
      {
        minify: false,
        formats: ['esm', 'cjs'],
      },
    ],
  }

  const buildConfig = JSON.parse(fs.readFileSync(BUILD_CONFIG_DIR, 'utf-8'))

  return Object.assign(defaultConfig, buildConfig)
}
