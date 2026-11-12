const number = new Intl.NumberFormat('en-US')
const money = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export const formatNumber = (value: number) => number.format(value)
export const formatMoney = (value: number) => money.format(value)

/** yyyy-mm-dd -> mm/dd/yyyy */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  return `${month}/${day}/${year}`
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
