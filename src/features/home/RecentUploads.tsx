import { useEffect, useState } from 'react'
import { getRecentUploads, type UploadBatch } from '../../api/index.ts'
import Badge, { type BadgeTone } from '../../components/Badge.tsx'
import Card from '../../components/Card.tsx'
import { formatDate } from '../../lib/format.ts'
import table from '../../components/Table.module.css'
import styles from './HomePage.module.css'

const STATUS: Record<UploadBatch['status'], { label: string; tone: BadgeTone }> = {
  completed: { label: 'Completed', tone: 'ok' },
  processing: { label: 'Processing', tone: 'pending' },
  failed: { label: 'Failed', tone: 'error' },
}

export default function RecentUploads() {
  const [uploads, setUploads] = useState<UploadBatch[] | null>(null)

  useEffect(() => {
    let active = true
    getRecentUploads().then((data) => {
      if (active) setUploads(data)
    })
    return () => {
      active = false
    }
  }, [])

  return (
    <section>
      <div className={styles.sectionHead}>
        <h2>Recent uploads</h2>
        <span>Last 3 files processed</span>
      </div>
      <Card className={`${table.scroll} ${styles.tableCard}`}>
        <table className={table.table}>
          <thead>
            <tr>
              <th>File</th>
              <th>Invoices</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {uploads === null
              ? [0, 1, 2].map((i) => (
                  <tr key={i}>
                    {[60, 20, 30, 25].map((w, j) => (
                      <td key={j}>
                        <span className={table.skeleton} style={{ width: `${w}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              : uploads.map((upload, i) => (
                  <tr
                    key={upload.id}
                    className={table.rowIn}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <td>{upload.fileName}</td>
                    <td>{upload.invoiceCount}</td>
                    <td>{formatDate(upload.date)}</td>
                    <td>
                      <Badge tone={STATUS[upload.status].tone}>{STATUS[upload.status].label}</Badge>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </Card>
    </section>
  )
}
