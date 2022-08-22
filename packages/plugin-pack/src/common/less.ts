import path from 'path'
import less from 'gulp-less'
import cssnano from 'gulp-cssnano'
// import rename from 'gulp-rename'
import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import { THEME_DIR } from '../common/index.js'
const { dest, src } = gulp

export async function lessComplie(express: string) {
  return (
    src(express)
      // less编译样式
      .pipe(less())
      // 优化css 需要在autoprefix之前调用,否则后者无效
      .pipe(cssnano())
      // 兼容浏览器的样式前缀，例如：-webkit-, -mo-
      .pipe(
        autoprefixer({
          cascade: false,
        })
      )
      // .pipe(
      // rename((path1) => {
      //   // path1.basename = `el-${path1.basename}`
      // })
      // )
      .pipe(dest(THEME_DIR))
  )
}
