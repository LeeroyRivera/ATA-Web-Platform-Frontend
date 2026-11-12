import { RotateCcw, X } from 'lucide-react'
import Badge from '../../components/Badge.tsx'
import Button from '../../components/Button.tsx'
import Card from '../../components/Card.tsx'
import Spinner from '../../components/Spinner.tsx'
import { formatFileSize } from '../../lib/format.ts'
import styles from './GrInvoicePage.module.css'

interface UploadedFileProps {
  file: File
  status: 'processing' | 'ready'
  containerCount?: number
  onRemove: () => void
}

export default function UploadedFile({
  file,
  status,
  containerCount,
  onRemove,
}: UploadedFileProps) {
  const processing = status === 'processing'

  return (
    <Card className={styles.file}>
      <div className={styles.xls}>XLS</div>
      <div className={styles.fileInfo}>
        <b>{file.name}</b>
        <div className={styles.fileMeta}>
          {processing
            ? `${formatFileSize(file.size)} · Reading containers...`
            : `${containerCount} containers found`}
        </div>
        {processing && (
          <div className={styles.progress}>
            <div className={styles.progressBar} />
          </div>
        )}
      </div>
      {processing ? (
        <Badge tone="pending">
          <Spinner size={12} /> Processing
        </Badge>
      ) : (
        <Badge tone="ok">Ready</Badge>
      )}
      <Button
        variant="link"
        size="sm"
        onClick={onRemove}
        icon={processing ? <X size={16} /> : <RotateCcw size={16} />}
      >
        {processing ? 'Cancel' : 'Upload another'}
      </Button>
    </Card>
  )
}
