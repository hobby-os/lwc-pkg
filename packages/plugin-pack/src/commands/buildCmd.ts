import { complieModules, complieTheme, complieTypes } from '../compiler/index.js'
import { DIST_DIR } from '../common/index.js'
import {remove} from 'fs-extra';

export async function buildModules() {
  await remove(DIST_DIR),
  complieModules()
  complieTheme()
  complieTypes()
}
