import fs from 'fs'
import { SELF_PACKAGE_DIR } from '../common/index.js'

export function getPackageConfig() {
  return JSON.parse(fs.readFileSync(SELF_PACKAGE_DIR, 'utf-8'))
}
