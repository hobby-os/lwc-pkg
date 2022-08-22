import { readBuildConfig, rollupComplie } from '../common/index.js'
import type { BundleOption } from '../common/index.js'

export async function complieModules() {
  const buildConfig = readBuildConfig()

  const bundleOptions: BundleOption[] = buildConfig.bundleOption

  await Promise.all(bundleOptions.map((config) => rollupComplie(buildConfig, config.formats, config.minify)))
}
