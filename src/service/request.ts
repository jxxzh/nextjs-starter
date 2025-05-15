import logger from '@/lib/logger'
import { deepMerge } from '@/utils/object'

interface CustomRequestOptions {
  baseUrl: string
  parseResponse: (response: Response) => Promise<any>
}

type CombinedRequestOptions = RequestInit & Partial<CustomRequestOptions>

const defaultOptions = {
  baseUrl: '',
  parseResponse: (response) => {
    return response.json()
  },
  headers: {
    'Content-Type': 'application/json',
  },
} satisfies CombinedRequestOptions

const requestLogger = logger.create({
  defaults: {
    tag: 'request',
  },
})

async function baseRequest<T>(
  path: string,
  options?: CombinedRequestOptions,
): Promise<T> {
  const { parseResponse, baseUrl, headers } = deepMerge(defaultOptions, options)
  const url = path.startsWith('http') ? path : `${baseUrl}${path}`
  // if (isDevelopment()) {
  //   requestLogger.info({
  //     url,
  //     options,
  //   })
  // }
  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || response.statusText || 'Unknown error')
    }

    const data = await parseResponse!(response)
    // if (isDevelopment()) {
    //   requestLogger.info({
    //     url,
    //     data,
    //   })
    // }

    return data
  }
  catch (error) {
    requestLogger.error({
      url,
      error,
    })

    throw error
  }
}

baseRequest.child = (options?: CombinedRequestOptions) => {
  return <T>(url: string, requestOptions?: RequestInit) => baseRequest<T>(url, deepMerge(options ?? {}, requestOptions))
}

export { baseRequest, type CombinedRequestOptions }
