"use client"
import React, { useCallback, useState, useRef } from 'react';
import { Widget, FileInfo } from '@uploadcare/react-widget';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const uploadCareUrl = 'https://ucarecdn.com/';

type CustomUploaderProps = {
  uploadImageAction: (url: string, userId: string) => Promise<{ error: string; success?: undefined; } | { success: string; error?: undefined; }>;
  userId?: string | null;
  ctx_name: string;
  flowId?: string | null;
  flowMode: boolean;
};

const CustomUploader = ({ uploadImageAction, userId, ctx_name, flowId, flowMode }: CustomUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const widgetRef = useRef<any>();
  const id = flowMode ? flowId : userId;

  const handleUploadComplete = useCallback(async (fileInfo: FileInfo) => {
    if (fileInfo) {
      setIsUploading(true);
      const url = `${uploadCareUrl}${fileInfo.uuid}/`;
      try {
        const { error, success } = await uploadImageAction(url, id!);
        if (error) {
          toast.error(error);
        } else {
          toast.success(success || 'Image uploaded successfully');
        }
      } catch (error) {
        toast.error('An error occurred during upload');
      } finally {
        setIsUploading(false);
      }
    }
  }, [uploadImageAction, id]);

  const handleButtonClick = () => {
    if (widgetRef.current) {
      widgetRef.current.openDialog();
    }
  };

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="flex items-center gap-2"
      >
        <Upload size={16} />
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </Button>
      <Widget
        ref={widgetRef}
        publicKey="511e1df4c0a33fe1a180"
        clearable
        imagesOnly
        crop="free,1:1,4:3,16:9"
        imageShrink="1024x1024"
        multiple={false}
        previewStep
        onChange={handleUploadComplete}
        // customTabs={{
        //   preview: {
        //     disableDefaultTabs: true
        //   }
        // }}
      />
    </div>
  );
};

export default CustomUploader;
