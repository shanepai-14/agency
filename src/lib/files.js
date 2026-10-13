/** File helpers shared by the FileUpload component and Zod schemas. */

export const MB = 1024 * 1024;

export const CV_RULES = {
  extensions: ['.pdf', '.doc', '.docx'],
  accept:
    '.pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  maxSize: 5 * MB,
  label: 'PDF, DOC or DOCX, max 5 MB',
};

export const CERTIFICATE_RULES = {
  extensions: ['.pdf', '.jpg', '.jpeg', '.png'],
  accept: '.pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png',
  maxSize: 5 * MB,
  maxFiles: 10,
  label: 'PDF, JPG or PNG, max 5 MB each, up to 10 files',
};

/** Extension check (MIME types are unreliable for .doc/.docx on some systems). */
export const hasAllowedExtension = (file, extensions) => {
  const name = file?.name?.toLowerCase() ?? '';
  return extensions.some((ext) => name.endsWith(ext));
};

export const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < MB) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / MB).toFixed(1)} MB`;
};
