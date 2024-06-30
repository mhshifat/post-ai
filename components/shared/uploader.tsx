import '@uploadcare/react-uploader/core.css';
import { FileUploaderMinimal } from '@uploadcare/react-uploader';
import { useEffect, useState } from 'react';

export default function Uploader({ values, onChange }: { values?: any[], onChange?: (values: any[]) => void }) {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (values) {
      setFiles(values);
    }
  }, [values])

  return (
    <div>
      <FileUploaderMinimal onChange={(items) => {
        const newValues = [...items.allEntries.filter((file) => file.status === 'success')];
        setFiles(newValues);
        onChange?.(newValues);
      }} pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY} />

      <div>
        {files.map((file) => (
          <div key={file.uuid}>
            <img
              src={file.cdnUrl}
              alt={file.fileInfo.originalFilename || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}