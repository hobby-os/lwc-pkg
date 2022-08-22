import path from 'path'
import fs from 'fs'
import { compileScript, parse } from '@vue/compiler-sfc'
import glob from 'fast-glob'
import { Project } from 'ts-morph'
import { TS_CONFIG_DIR, TYPES_DIR } from '../common/index.js'
let index = 1

export async function complieTypes() {
  // 这里仅须要晓得这是用来解决 ts 文件并生成类型申明文件即可
  const project = new Project({
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      allowJs: true, // 如果想兼容 js 语法须要加上
      outDir: TYPES_DIR, // 能够设置自定义的打包文件夹，如 'types'
    },
    tsConfigFilePath: TS_CONFIG_DIR,
    skipAddingFilesFromTsConfig: true,
  })

  // 获取 src 下的 .vue 和 .ts 文件
  const globStr = 'src/**/*.{js?(x),ts?(x),vue}'
  const files = await glob(globStr)
  const sourceFiles: any = []

  await Promise.all(
    files.map(async (file) => {
      if (/\.vue$/.test(file)) {
        // 对于 vue 文件，借助 @vue/compiler-sfc 的 parse 进行解析
        const sfc = parse(await fs.promises.readFile(file, 'utf-8'))
        // 提取出 script 中的内容
        const { script, scriptSetup } = sfc.descriptor

        if (script || scriptSetup) {
          let content = ''
          let isTs = false

          if (script && script.content) {
            content += script.content

            if (script.lang === 'ts') isTs = true
          }

          if (scriptSetup) {
            const compiled = compileScript(sfc.descriptor, {
              id: `${index++}`,
            })

            content += compiled.content

            if (scriptSetup.lang === 'ts') isTs = true
          }

          sourceFiles.push(
            // 创立一个同目路的同名 ts/js 的映射文件
            project.createSourceFile(file + (isTs ? '.ts' : '.js'), content)
          )
        }
      } else {
        // 如果是 ts 文件则间接增加即可
        sourceFiles.push(project.addSourceFileAtPath(file))
      }
    })
  )

  const diagnostics = project.getPreEmitDiagnostics()

  // 输入解析过程中的错误信息
  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  project.emitToMemory()

  // 随后将解析完的文件写道打包门路
  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()

    for (const outputFile of emitOutput.getOutputFiles()) {
      const filePath = outputFile.getFilePath()

      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      await fs.promises.writeFile(filePath, outputFile.getText(), 'utf8')
    }
  }
}
