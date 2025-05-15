import { isBrowser, isProd } from '@/utils/env'
import { createConsola } from 'consola'

const logger = createConsola({
  level: isBrowser && isProd ? 0 : 5,
})

function createTagLogger(tag: string) {
  return logger.create({
    defaults: {
      tag,
    },
  })
}

export { createTagLogger, logger }
