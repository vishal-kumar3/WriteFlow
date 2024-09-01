import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DialogPopup } from "./DialogPopup";
import { updateUserAboutSection } from "@/actions/user.action";
import CurrentUserOnly from "@/util/CurrentUserOnly";

export type AboutDetails = {
  label: string;
  id: string;
  defaultValue: string;
  placeholder: string;
};

type AboutSectionProps = {
  userId: string;
  name: string;
  bio: string;
  location: string;
  website: string;
  career: string;
  tags: string[];
  about: AboutDetails[];
};

const AboutSection = ({
  userId,
  bio,
  location,
  website,
  career,
  tags,
  name,
  about,
}: AboutSectionProps) => {
  return (
    <>
      <div className="flex gap-6">
        <p className=" text-3xl font-semibold dark:text-white">{name}</p>
        <div className="flex gap-2 items-center">
          {/* //TODO: Dialog Popup to choose badges */}
          {tags.map((tag: string, index: number) => (
            <Badge key={index}>{tag}</Badge>
          ))}
          {/* <Plus
            size={20}
            className="rounded-full hover:bg-black/50 hover:cursor-pointer"
          /> */}
        </div>
      </div>
      <div className="pl-4 text-black/70 dark:text-white/70 ">
        <p>{career}</p>
        <p>{bio}</p>
      </div>
      {/* @ts-expect-error Async Server Component */}
      <CurrentUserOnly userId={userId}>
        <div className="flex gap-3 items-center mt-3">
          {/* // TODO: Costimize the DialogPopup component */}
          <DialogPopup
            AboutSectionDetails={about}
            userId={userId}
            title="Edit Profile"
            description="Make changes to your profile here. Click save when you're done."
            button="Edit Profile"
            action={updateUserAboutSection}
          />
          <Button variant="outline">Settings</Button>
        </div>
      </CurrentUserOnly>
    </>
  );
};

export default AboutSection;
