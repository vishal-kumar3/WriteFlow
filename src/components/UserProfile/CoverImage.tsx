import CustomUploader from "@/lib/CustomUploader";
import FileUploader from "@/lib/fileUploader";
import CurrentUserOnly from "@/util/CurrentUserOnly";
import Image from "next/image";

type props = {
  coverImage: string;
  userId?: string | null;
  flowId?: string | null
  uploadImageAction?: (url: string, id: string) => Promise<{ error: string; success?: undefined; } | { success: string; error?: undefined; }>;
  flowMode?: boolean;
  disabled?: boolean;
};

const CoverImage = async ({ coverImage, userId, flowId, flowMode, uploadImageAction, disabled }: props) => {
  return (
    <div className="relative group">
      <Image
        className="h-[150px] sm:h-[200px] md:h-[250px] w-full rounded-t-2xl object-cover object-center"
        src={coverImage}
        height={800}
        width={900}
        alt="Cover Image"
      />
      {
        !disabled && (
          // @ts-expect-error Async Server Component
          <CurrentUserOnly userId={userId!}>
            <div className="absolute right-2 bottom-2 sm:right-5 sm:bottom-5">
              <FileUploader
                ctx_name="CoverImage"
                userId={userId}
                flowId={flowId}
                uploadImageAction={uploadImageAction!}
                flowMode={flowMode!}
              />
            </div>
          </CurrentUserOnly>

        )
      }
    </div>
  );
};

export default CoverImage;
