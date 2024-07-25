import '@uploadcare/react-uploader/core.css';
import { FileUploaderMinimal } from '@uploadcare/react-uploader';
import { useEffect, useState } from 'react';
import { IUploaderFile } from '@/utils/types';
import { useConfig } from '../providers/config-provider';
import { Input } from '../ui/input';

export default function Uploader({ values, onChange }: { values?: IUploaderFile[], onChange?: (values: IUploaderFile[]) => void }) {
  const { envs } = useConfig();
  const [files, setFiles] = useState<IUploaderFile[]>([]);

  useEffect(() => {
    if (values) {
      setFiles(values);
    }
  }, [values])

  return (
    <div>
      {envs.TEST_MODE ? (
        <Input type="file" onChange={({ target }) => {
          const modifiedValues = [{
            url: URL.createObjectURL(target.files![0]),
            id: "1"
          }];
          setFiles(modifiedValues);
          onChange?.(modifiedValues);
        }} />
      ) : (
        <FileUploaderMinimal className='bg-background' onChange={(items) => {
          const newValues = [...items.allEntries.filter((file) => file.status === 'success')];
          const modifiedValues = newValues.map(item => ({
            url: item.cdnUrl!,
            id: item.uuid!
          }));
          setFiles(modifiedValues);
          onChange?.(modifiedValues);
        }} pubkey={process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY} />
      )}

      <div className='mt-5'>
        {files.map((file) => (
          <div key={file.id} className='overflow-hidden'>
            <img
              src={file.url}
              alt={""}
              className='w-full object-cover block rounded-md'
            />
          </div>
        ))}
      </div>
    </div>
  );
}