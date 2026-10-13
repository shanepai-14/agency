import { AnimatePresence, motion } from 'framer-motion';
import { FileText, Trash2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { formatBytes, hasAllowedExtension } from '../../lib/files';
import { FieldError } from './FormField';

/**
 * Drag-and-drop file upload with type/size checks, preview list and remove buttons.
 * Use with react-hook-form's <Controller>; `value` is File[] and `onChange` receives File[].
 *
 * `rules`: { extensions: string[], accept: string, maxSize: number, maxFiles?: number, label: string }
 */
export default function FileUpload({ id, label, value = [], onChange, rules, multiple = false, required, error, hint }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [rejections, setRejections] = useState([]);

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList ?? []);
    const accepted = [];
    const rejected = [];

    incoming.forEach((file) => {
      if (!hasAllowedExtension(file, rules.extensions)) {
        rejected.push(`${file.name}: file type not allowed`);
      } else if (file.size > rules.maxSize) {
        rejected.push(`${file.name}: larger than ${formatBytes(rules.maxSize)}`);
      } else {
        accepted.push(file);
      }
    });

    let next;
    if (multiple) {
      // Skip duplicates (same name and size)
      const isDuplicate = (f) => value.some((v) => v.name === f.name && v.size === f.size);
      next = [...value, ...accepted.filter((f) => !isDuplicate(f))];
      if (rules.maxFiles && next.length > rules.maxFiles) {
        rejected.push(`Only ${rules.maxFiles} files can be uploaded`);
        next = next.slice(0, rules.maxFiles);
      }
    } else {
      next = accepted.length ? [accepted[0]] : value;
    }

    setRejections(rejected);
    onChange(next);
  };

  const removeFile = (index) => {
    setRejections([]);
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    addFiles(event.dataTransfer.files);
  };

  const describedBy = [`${id}-rules`, error && `${id}-error`, rejections.length && `${id}-rejections`]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <p id={`${id}-label`} className="mb-2 block text-sm font-semibold text-navy">
        {label}
        {required ? (
          <span className="ml-0.5 text-accent" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-slate-500">(optional)</span>
        )}
      </p>

      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed px-6 py-9 text-center transition-colors focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2 ${
          dragActive
            ? 'border-navy bg-navy-50'
            : error
              ? 'border-red-600 bg-red-50/40'
              : 'border-slate-300 bg-mist hover:border-navy/50'
        }`}
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy shadow-sm">
          <Upload aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="text-navy">
          <span className="font-semibold underline decoration-navy/30 underline-offset-4">Choose {multiple ? 'files' : 'a file'}</span>{' '}
          or drag and drop {multiple ? 'them' : 'it'} here
        </span>
        <span id={`${id}-rules`} className="text-sm text-slate-500">
          {rules.label}
          {hint ? ` · ${hint}` : ''}
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          className="sr-only"
          accept={rules.accept}
          multiple={multiple}
          aria-labelledby={`${id}-label`}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : 'false'}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = ''; // allow re-selecting the same file
          }}
        />
      </label>

      {rejections.length > 0 && (
        <ul id={`${id}-rejections`} role="alert" className="mt-3 space-y-1 text-sm font-medium text-red-700">
          {rejections.map((msg) => (
            <li key={msg}>{msg}</li>
          ))}
        </ul>
      )}
      <FieldError id={`${id}-error`} message={error} />

      {value.length > 0 && (
        <ul className="mt-4 space-y-2" aria-label={`Selected files for ${label}`}>
          <AnimatePresence initial={false}>
            {value.map((file, index) => (
              <motion.li
                key={`${file.name}-${file.size}`}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white py-2 pl-4 pr-2"
              >
                <FileText aria-hidden="true" className="h-5 w-5 shrink-0 text-navy" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-navy">{file.name}</p>
                  <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700"
                  aria-label={`Remove ${file.name}`}
                >
                  <Trash2 aria-hidden="true" className="h-5 w-5" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
