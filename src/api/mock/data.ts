import type { Invoice, UploadBatch, User } from '../types.ts'

export const DEFAULT_USER: User = {
  username: 'aleksander.rivera',
  name: 'Aleksander Rivera',
  initials: 'AR',
}

export const RECENT_UPLOADS: UploadBatch[] = [
  {
    id: 'b45',
    fileName: 'GRPO_week_45.xlsx',
    invoiceCount: 6,
    date: '2026-11-10',
    status: 'completed',
  },
  {
    id: 'b44',
    fileName: 'GRPO_week_44.xlsx',
    invoiceCount: 9,
    date: '2026-11-03',
    status: 'completed',
  },
  {
    id: 'b43',
    fileName: 'GRPO_week_43.xlsx',
    invoiceCount: 11,
    date: '2026-10-27',
    status: 'completed',
  },
]

export const SAMPLE_INVOICES: Invoice[] = [
  {
    container: 'CAIU9703259',
    grpoNumber: '7781',
    invoiceNumber: 'TA-00412',
    quantity: 17184,
    amountUsd: 58253.76,
  },
  {
    container: 'CMAU4656250',
    grpoNumber: '7784',
    invoiceNumber: 'TA-00413',
    quantity: 16585,
    amountUsd: 56223.15,
  },
  {
    container: 'CMAU7027899',
    grpoNumber: '7790',
    invoiceNumber: 'TA-00414',
    quantity: 19098,
    amountUsd: 64742.22,
  },
  {
    container: 'CMAU7726520',
    grpoNumber: '7792',
    invoiceNumber: 'TA-00415',
    quantity: 24818,
    amountUsd: 84133.02,
  },
  {
    container: 'CMAU8535132',
    grpoNumber: '7795',
    invoiceNumber: 'TA-00416',
    quantity: 21908,
    amountUsd: 74268.12,
  },
  {
    container: 'ECMU7705031',
    grpoNumber: '7801',
    invoiceNumber: 'TA-00417',
    quantity: 64512,
    amountUsd: 174182.4,
  },
]
