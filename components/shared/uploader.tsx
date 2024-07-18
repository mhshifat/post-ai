import '@uploadcare/react-uploader/core.css';
import { FileUploaderMinimal } from '@uploadcare/react-uploader';
import { useEffect, useState } from 'react';
import { IUploaderFile } from '@/utils/types';

export default function Uploader({ values, onChange }: { values?: IUploaderFile[], onChange?: (values: IUploaderFile[]) => void }) {
  const [files, setFiles] = useState<IUploaderFile[]>([]);

  useEffect(() => {
    if (values) {
      setFiles(values);
    }
  }, [values])

  return (
    <div>
      <FileUploaderMinimal className='bg-background' onChange={(items) => {
        const newValues = [...items.allEntries.filter((file) => file.status === 'success')];
        const modifiedValues = newValues.map(item => ({
          url: item.cdnUrl!,
          id: item.uuid!
        }));
        setFiles(modifiedValues);
        onChange?.(modifiedValues);
      }} pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY} />

      <div>
        {files.map((file) => (
          <div key={file.id}>
            <img
              src={file.url}
              alt={""}
            />
          </div>
        ))}
      </div>
    </div>
  );
}