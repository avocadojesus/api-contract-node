import { exec } from 'child_process'

exec('yarn --cwd ./node_modules/api-contract-node start', (err, stdout, stderr) => {
  if (err) throw err
  console.log(`stdout: ${stdout}`)
  console.log(`stderr: ${stderr}`)
})
