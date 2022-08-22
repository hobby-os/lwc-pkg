import { Command } from 'commander'
import { buildModules, getVersion } from './commands/index.js'

const program = new Command()

program.version(`lwcpkg-plugin-cli ${getVersion}`)

program
  .command('build')
  .description('build plugin in production mode')
  .action(async () => {
    buildModules()
  })

program.parse()
