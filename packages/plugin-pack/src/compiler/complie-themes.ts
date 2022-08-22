import glob from 'fast-glob'
import { cssComplie, lessComplie, sassComplie } from '../common/index.js'

export async function complieTheme() {
  const cssCompliers = [
    {
      express: './src/**/*.less',
      complier: lessComplie,
    },
    {
      express: './src/**/*.scss',
      complier: sassComplie,
    },
    {
      express: './src/**/*.css',
      complier: cssComplie,
    },
  ]

  await Promise.all(
    cssCompliers.map(async ({ complier, express }) => {
      await complier(express)
    })
  )
}
