import { useRef, useState, type DragEvent, type KeyboardEvent } from 'react'
import { CircleAlert, Upload } from 'lucide-react'
import styles from './FileDropzone.module.css'

interface FileDropzoneProps {
  /** e.g. ['.xlsx', '.xlsm'] */
  accept: string[]
  maxSizeMb: number
  title: string
  onFile: (file: File) => void
  error?: string | null
  onError: (message: string) => void
  disabled?: boolean
}

function validateFile(file: File, accept: string[], maxSizeMb: number): string | null {
  const name = file.name.toLowerCase()
  if (!accept.some((ext) => name.endsWith(ext))) {
    return `"${file.name}" is not a valid file. Use ${accept.join(' or ')}.`
  }
  if (file.size === 0) return `"${file.name}" is empty.`
  if (file.size > maxSizeMb * 1024 * 1024) return `"${file.name}" is larger than ${maxSizeMb} MB.`
  return null
}

export default function FileDropzone({
  accept,
  maxSizeMb,
  title,
  onFile,
  error,
  onError,
  disabled = false,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const dragDepth = useRef(0)

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    if (files.length > 1) {
      onError('Upload one file at a time.')
      return
    }
    const file = files[0]
    const problem = validateFile(file, accept, maxSizeMb)
    if (problem) onError(problem)
    else onFile(file)
  }

  function openPicker() {
    if (!disabled) inputRef.current?.click()
  }

  function onDragEnter(event: DragEvent) {
    event.preventDefault()
    if (disabled) return
    dragDepth.current += 1
    setDragging(true)
  }

  function onDragLeave(event: DragEvent) {
    event.preventDefault()
    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) setDragging(false)
  }

  function onDrop(event: DragEvent) {
    event.preventDefault()
    dragDepth.current = 0
    setDragging(false)
    if (!disabled) handleFiles(event.dataTransfer.files)
  }

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPicker()
    }
  }

  const classes = [
    styles.drop,
    dragging ? styles.dragging : '',
    error ? styles.hasError : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div>
      <div
        className={classes}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled}
        onClick={openPicker}
        onKeyDown={onKeyDown}
        onDragEnter={onDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <Upload size={64} className={styles.icon} />
        <b>{dragging ? 'Drop the file to upload it' : title}</b>
        <span className={styles.hint}>
          or <span className={styles.browse}>browse</span> · {accept.join(' or ')} · up to{' '}
          {maxSizeMb} MB
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept.join(',')}
          hidden
          onChange={(event) => {
            handleFiles(event.target.files)
            event.target.value = ''
          }}
        />
      </div>
      {error && (
        <div className={styles.error} role="alert" key={error}>
          <CircleAlert size={16} />
          {error}
        </div>
      )}
    </div>
  )
}
