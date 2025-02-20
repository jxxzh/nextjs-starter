import { isDevelopment, isProduction } from '@/utils/env'
import pino from 'pino'

const pinoConfig: pino.LoggerOptions = {
  browser: {
    disabled: isProduction(),
  },
}

if (isDevelopment()) {
  pinoConfig.transport = {
    target: 'pino-pretty',
  }
}

const logger = pino(pinoConfig)

export default logger
