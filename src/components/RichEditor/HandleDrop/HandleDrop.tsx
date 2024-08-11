import { uploadFile } from '@uploadcare/upload-client'
import { EditorView } from 'prosemirror-view';
import { Slice } from 'prosemirror-model';
import { toast } from 'sonner';

interface ImageUploadResponse {
  src: string;
}

interface HandleDropParams {
  view: EditorView;
  event: DragEvent;
  slice: Slice;
  moved: boolean;
}

function handleDrop({ view, event, slice, moved }: HandleDropParams): boolean {
  if (
    !moved &&
    event.dataTransfer &&
    event.dataTransfer.files &&
    event.dataTransfer.files[0]
  ) {
    const file = event.dataTransfer.files[0];
    const filesize = parseFloat(((file.size / 1024) / 1024).toFixed(4)); // Convert size to MB

    if (
      (file.type === 'image/jpeg' || file.type === 'image/png') &&
      filesize < 10
    ) {
      // Check the dimensions
      const _URL = window.URL || window.webkitURL;
      const img = new Image();
      img.src = _URL.createObjectURL(file);

      img.onload = function () {
        if (img.width > 5000 || img.height > 5000) {
          toast.error('Your images need to be less than 5000 pixels in height and width.')
        } else {
          // Valid image, so upload to server
          uploadImage(file)
            .then((response: string) => {
              const image = new Image();
              image.src = response;

              image.onload = function () {
                // Place the now uploaded image in the editor where it was dropped
                const { schema } = view.state;
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });

                if (coordinates) {
                  const node = schema.nodes.image.create({ src: response });
                  const transaction = view.state.tr.insert(coordinates.pos, node);
                  return view.dispatch(transaction);
                }
              };
            })
            .catch((error: unknown) => {
              console.error(error);
              toast.error('There was a problem uploading your image, please try again.');
            });
        }
      };
    } else {
      toast.error('Images need to be in jpg or png format and less than 10mb in size.')
    }
    return true; // handled
  }

  return false; // not handled, use default behavior
}

// Example uploadImage function that you might have elsewhere in your code
async function uploadImage(file: File): Promise<string> {
  // Upload the file to the server and return the URL
  // Implement this function based on your server API or S3 integration

  const result = await uploadFile(file, {
    publicKey: '3fa57431f8c491457434',
    store: 'auto',
    metadata: {
      subsystem: 'uploader',
      pet: 'cat'
    }
  })

  if(!result){
    return toast.error('There was a problem uploading your image, please try again.');
  }

  console.log(result)
  return result.cdnUrl!
}

export default handleDrop;
