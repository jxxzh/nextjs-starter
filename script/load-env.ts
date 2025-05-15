import * as fs from 'node:fs'
import * as path from 'node:path'

/** 在Vercel部署时加载对应环境的环境变量 */
function loadEnv() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview')
    return
  const previewEnvFile = fs.readFileSync(path.resolve(__dirname, '../.env.preview')).toString()
  fs.writeFileSync(path.resolve(__dirname, '../.env.production'), previewEnvFile)
}

if (require.main === module)
  loadEnv()
