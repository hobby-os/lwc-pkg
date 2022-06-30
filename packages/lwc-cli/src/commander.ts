import { Command } from 'commander';


const program = new Command();


program.version('1.2.3');  


program
  .command('test')
  .description('Run unit tests through jest')
  .option(
    '--watch',
    'Watch files for changes and rerun tests related to changed files'
  )
  .option(
    '--clearCache',
    'Clears the configured Jest cache directory and then exits'
  )
  .option(
    '--changedSince <changedSince>',
    'Runs tests related to the changes since the provided branch or commit hash'
  )
  .option(
    '--logHeapUsage',
    'Logs the heap usage after every test. Useful to debug memory leaks'
  )
  .option(
    '--runInBand',
    'Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests'
  )
  .option('--debug', 'Print debugging info about your Jest config')
  .action(()=>{
    console.log(111111111111111)
  });

  program.parse();