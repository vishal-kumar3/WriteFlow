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
    <div className="mt-5 group relative">
      <Image
        className="h-[250px] w-full rounded-t-2xl object-cover object-center"
        src={coverImage}
        height={800}
        width={900}
        alt="Holla"
      />
      {
        !disabled && (
          // @ts-expect-error Async Server Component
          <CurrentUserOnly userId={userId!}>
            <div className="absolute right-5 bottom-5">
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
