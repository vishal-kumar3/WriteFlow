"use client"
import { createImageUpload } from "novel/plugins";
import { toast } from "sonner";
import { uploadFile } from '@uploadcare/upload-client'

const onUpload = (file: File) => {
  const promise = uploadFile(file, {
    publicKey: '3fa57431f8c491457434',
    store: 'auto',
    metadata: {
      subsystem: 'uploader',
      pet: 'cat'
    }
  })
  console.log("Promise ", promise)
  return new Promise((resolve) => {
    toast.promise(
      promise.then(async (res) => {
        // Successfully uploaded image
        if (res.cdnUrl) {
          console.log("res ",res)
          const url = res.cdnUrl;
          // preload the image
          let image = new Image();
          image.src = url;
          image.onload = () => {
            resolve(url);
          };
          // No blob store configured
        } else if (!res.cdnUrl) {
          resolve(file);
          throw new Error(
            "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead.",
          );
          // Unknown error
        } else {
          throw new Error(`Error uploading image. Please try again.`);
        }
      }),
      {
        loading: "Uploading image...",
        success: "Image uploaded successfully.",
        error: (e) => e.message,
      },
    );
  });
};

export const uploadFn = createImageUpload({
  onUpload,
  validateFn: (file) => {
    if (!file.type.includes("image/")) {
      toast.error("File type not supported.");
      return false;
    } else if (file.size / 1024 / 1024 > 20) {
      toast.error("File size too big (max 20MB).");
      return false;
    }
    return true;
  },
});
