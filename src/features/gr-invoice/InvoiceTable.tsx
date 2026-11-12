import { useState } from 'react'
import { Download, FileArchive } from 'lucide-react'
import {
  downloadAllInvoices,
  downloadInvoice,
  type GrpoResult,
  type Invoice,
} from '../../api/index.ts'
import Button from '../../components/Button.tsx'
import Card from '../../components/Card.tsx'
import { useToast } from '../../components/toast/toastContext.ts'
import { formatMoney, formatNumber } from '../../lib/format.ts'
import table from '../../components/Table.module.css'
import styles from './GrInvoicePage.module.css'

export default function InvoiceTable({ result }: { result: GrpoResult }) {
  const toast = useToast()
  const [downloading, setDownloading] = useState<string | null>(null)
  const [downloadingAll, setDownloadingAll] = useState(false)

  const totalQty = result.invoices.reduce((sum, inv) => sum + inv.quantity, 0)
  const totalAmount = result.invoices.reduce((sum, inv) => sum + inv.amountUsd, 0)

  async function handleDownload(invoice: Invoice) {
    setDownloading(invoice.invoiceNumber)
    try {
      await downloadInvoice(invoice)
      toast.show(`Invoice ${invoice.invoiceNumber} downloaded (sample file).`, 'success')
    } catch {
      toast.show(`Could not download invoice ${invoice.invoiceNumber}.`, 'error')
    } finally {
      setDownloading(null)
    }
  }

  async function handleDownloadAll() {
    setDownloadingAll(true)
    try {
      await downloadAllInvoices(result)
      toast.show(`${result.invoices.length} invoices downloaded as .zip (sample files).`, 'success')
    } catch {
      toast.show('Could not create the .zip file.', 'error')
    } finally {
      setDownloadingAll(false)
    }
  }

  return (
    <Card className={styles.invoices}>
      <div className={styles.cab}>
        <h2>Commercial invoices</h2>
        <Button
          variant="success"
          onClick={handleDownloadAll}
          loading={downloadingAll}
          icon={<FileArchive size={16} />}
        >
          {downloadingAll ? 'Preparing .zip...' : 'Download all (.zip)'}
        </Button>
      </div>
      <div className={table.scroll}>
        <table className={table.table}>
          <thead>
            <tr>
              <th>Container</th>
              <th>GRPO #</th>
              <th>Invoice #</th>
              <th className={table.num}>Qty</th>
              <th className={table.num}>Amount (USD)</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {result.invoices.map((invoice, i) => (
              <tr
                key={invoice.container}
                className={table.rowIn}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <td className={table.mono}>{invoice.container}</td>
                <td>{invoice.grpoNumber}</td>
                <td>{invoice.invoiceNumber}</td>
                <td className={table.num}>{formatNumber(invoice.quantity)}</td>
                <td className={table.num}>{formatMoney(invoice.amountUsd)}</td>
                <td className={table.num}>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => handleDownload(invoice)}
                    loading={downloading === invoice.invoiceNumber}
                    disabled={downloadingAll}
                    icon={<Download size={15} />}
                  >
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td />
              <td />
              <td className={table.num}>{formatNumber(totalQty)}</td>
              <td className={table.num}>{formatMoney(totalAmount)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  )
}
