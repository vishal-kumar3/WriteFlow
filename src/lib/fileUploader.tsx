"use client";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css"
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FileUploadProps = {
  uploadImageAction: (url: string, userId: string) => Promise<{ error: string; success?: undefined; } | { success: string; error?: undefined; }>
  userId?: string | null
  ctx_name: string
  flowId?: string | null
  flowMode: boolean
}

const uploadCareUrl = 'https://ucarecdn.com/'

const FileUploader = ({ uploadImageAction, userId, ctx_name, flowId, flowMode }: FileUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const id = flowMode ? flowId : userId;
  useEffect(() => {
    setIsMounted(true);
  }, [])


  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <FileUploaderRegular
        ctxName={ctx_name}
        pubkey="511e1df4c0a33fe1a180"
        onFileUploadSuccess={async (file) => {
          const url = `${uploadCareUrl}${file.uuid}/`
          const { error, success } = await uploadImageAction(url, id!);
          if (error) {
            toast.error(error);
          } else {
            toast.success(success);
          }
        }}
        maxLocalFileSizeBytes={10000000}
        multiple={false}
        imgOnly={true}
        sourceList="local, url, camera, gdrive"
        classNameUploader="my-config uc-light"
      />
    </div>
  );
};

export default FileUploader;
