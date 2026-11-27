"use client"

import * as React from "react"
import { cn } from "cn"
import { ImagePlusIcon, XIcon } from "lucide-react"

import { Button } from "../Button"

import styles from "./FileDropzone.module.css"

type FileDropzoneProps = Omit<
  React.ComponentProps<"input">,
  "type" | "value" | "onChange" | "multiple"
> & {
  /** Files chosen so far (controlled). */
  files: File[]
  onFilesChange: (files: File[]) => void
  /** Most files allowed. Default 5. */
  maxFiles?: number
  /** Line under the prompt, e.g. "JPG หรือ PNG ไม่เกิน 5 รูป". */
  hint?: React.ReactNode
}

/**
 * Pick or drop photos and see them as thumbnails. Nothing is uploaded:
 * the files stay in the page (prototype), so a form can show and remove them.
 */
function FileDropzone({
  files,
  onFilesChange,
  maxFiles = 5,
  accept = "image/*",
  hint,
  id,
  disabled,
  className,
  ...props
}: FileDropzoneProps) {
  const autoId = React.useId()
  const inputId = id ?? autoId
  const [dragging, setDragging] = React.useState(false)

  // object URLs for previews, revoked when the files change
  const previews = React.useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files]
  )
  React.useEffect(
    () => () => previews.forEach((url) => URL.revokeObjectURL(url)),
    [previews]
  )

  function add(list: FileList | null) {
    if (!list) return
    const picked = Array.from(list).filter((f) =>
      accept === "image/*" ? f.type.startsWith("image/") : true
    )
    onFilesChange([...files, ...picked].slice(0, maxFiles))
  }

  const full = files.length >= maxFiles

  return (
    <div data-slot="file-dropzone" className={cn(styles.root, className)}>
      <label
        htmlFor={inputId}
        data-dragging={dragging || undefined}
        data-disabled={disabled || full || undefined}
        className={styles.zone}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled && !full) setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          if (!disabled && !full) add(e.dataTransfer.files)
        }}
      >
        <ImagePlusIcon className={styles.zoneIcon} aria-hidden />
        <span className={styles.prompt}>
          {full ? `ครบ ${maxFiles} รูปแล้ว` : "ลากรูปมาวาง หรือกดเพื่อเลือก"}
        </span>
        {hint ? <span className={styles.hint}>{hint}</span> : null}
        <input
          id={inputId}
          type="file"
          multiple
          accept={accept}
          disabled={disabled || full}
          className="sr-only"
          onChange={(e) => {
            add(e.target.files)
            e.target.value = ""
          }}
          {...props}
        />
      </label>

      {files.length > 0 ? (
        <ul className={styles.previews} aria-label="รูปที่เลือก">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className={styles.preview}>
              {/* Plain <img>: a local object-URL preview (the Next.js img rule is not enabled for the framework-agnostic package). */}
              <img src={previews[i]} alt={file.name} className={styles.image} />
              <Button
                type="button"
                variant="outline"
                size="icon-xs"
                aria-label={`ลบรูป ${file.name}`}
                className={styles.remove}
                onClick={() => onFilesChange(files.filter((_, j) => j !== i))}
              >
                <XIcon />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { FileDropzone, type FileDropzoneProps }
