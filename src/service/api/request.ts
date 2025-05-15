import { ofetch } from 'ofetch'

export const apiRequest = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})
