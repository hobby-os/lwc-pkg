import { join, resolve } from 'path'

// Root paths
export const SELF_DIR = resolve()
export const SELF_PACKAGE_DIR = resolve('./package.json')

// Project paths
export const PROJECT_DIR = process.cwd()
export const DIST_DIR = join(PROJECT_DIR, 'dist')
export const LIB_DIR = join(DIST_DIR, 'lib')
export const ES_DIR = join(DIST_DIR, 'es')
export const TYPES_DIR = join(DIST_DIR, 'types')
export const THEME_DIR = join(DIST_DIR, 'theme')
export const TS_CONFIG_DIR = resolve(PROJECT_DIR, 'tsconfig.json')
export const BUILD_CONFIG_DIR = resolve(PROJECT_DIR, 'build.config.json')
export const SRC_DIR = resolve(PROJECT_DIR, 'src', 'index.ts')
