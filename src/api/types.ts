export interface User {
  username: string
  name: string
  initials: string
}

export type UploadStatus = 'completed' | 'processing' | 'failed'

export interface UploadBatch {
  id: string
  fileName: string
  invoiceCount: number
  /** ISO date (yyyy-mm-dd) */
  date: string
  status: UploadStatus
}

export interface Invoice {
  container: string
  grpoNumber: string
  invoiceNumber: string
  quantity: number
  amountUsd: number
}

export interface GrpoResult {
  fileName: string
  invoices: Invoice[]
}
