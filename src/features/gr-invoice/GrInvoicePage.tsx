import { useRef, useState } from 'react'
import {
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE_MB,
  processGrpoFile,
  type GrpoResult,
} from '../../api/index.ts'
import FileDropzone from '../../components/FileDropzone.tsx'
import { useToast } from '../../components/toast/toastContext.ts'
import InvoiceTable from './InvoiceTable.tsx'
import UploadedFile from './UploadedFile.tsx'
import styles from './GrInvoicePage.module.css'

type State =
  | { kind: 'empty'; error: string | null }
  | { kind: 'processing'; file: File }
  | { kind: 'ready'; file: File; result: GrpoResult }

export default function GrInvoicePage() {
  const toast = useToast()
  const [state, setState] = useState<State>({ kind: 'empty', error: null })
  // Ignores results of an upload that was cancelled or replaced.
  const requestId = useRef(0)

  async function handleFile(file: File) {
    const id = ++requestId.current
    setState({ kind: 'processing', file })
    try {
      const result = await processGrpoFile(file)
      if (id !== requestId.current) return
      setState({ kind: 'ready', file, result })
      toast.show(`${result.invoices.length} commercial invoices are ready.`, 'success')
    } catch {
      if (id !== requestId.current) return
      setState({ kind: 'empty', error: `Could not read "${file.name}". Try again.` })
    }
  }

  function reset() {
    requestId.current++
    setState({ kind: 'empty', error: null })
  }

  return (
    <>
      <h1>GR Invoice Template</h1>
      <p className="sub">
        Upload the GRPO Excel exported from SAP. Invoice numbers and dates are pulled from
        Smartsheet.
      </p>

      <div className={styles.dropArea}>
        {state.kind === 'empty' ? (
          <FileDropzone
            accept={ACCEPTED_EXTENSIONS}
            maxSizeMb={MAX_FILE_SIZE_MB}
            title="Drag the GRPO Excel file here"
            onFile={handleFile}
            error={state.error}
            onError={(message) => setState({ kind: 'empty', error: message })}
          />
        ) : (
          <UploadedFile
            file={state.file}
            status={state.kind}
            containerCount={state.kind === 'ready' ? state.result.invoices.length : undefined}
            onRemove={reset}
          />
        )}
      </div>

      {state.kind === 'ready' && <InvoiceTable result={state.result} />}
    </>
  )
}
