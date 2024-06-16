import Image from "next/image";
import Link from "next/link";

import { updatePost } from "@/lib/database";
import { IUser, IPost } from "@/lib/database";
import ProtectedInput from "./ProtectedInput";

export default function Post({
  post,
  user,
  postId,
  onDelete,
  editable = false,
}: {
  post: IPost;
  user: IUser;
  postId?: string;
  onDelete?: () => void;
  editable: boolean;
}) {
  return (
    <div>
      <div className="flex flex-row mb-2 w-full items-center">
        <Link
          href={`/user/${post.userId}`}
          className="flex flex-row items-center mr-4"
        >
          <Image
            src={user.pfp}
            width={45}
            height={45}
            alt={`${user.name}'s profile picture`}
            className="mr-4"
          />
          <div>
            <p className="font-bold">{user.name}</p>
            <p className="italic">{user.bio}</p>
          </div>
        </Link>
        <a
          className="bg-lime-600 p-3 rounded"
          href={user.calendly}
          target="blank"
        >
          Schedule
        </a>
        {editable && (
          <button className="ml-auto text-red-500 text-4xl" onClick={onDelete}>
            &times;
          </button>
        )}
      </div>
      <hr className="my-4" />
      <ProtectedInput
        text={post.title}
        editable={editable}
        className="text-2xl mb-2"
        onUpdate={(text: string) => updatePost(postId!, { title: text })}
      />
      <ProtectedInput
        text={post.description}
        editable={editable}
        multiline
        onUpdate={(text: string) => updatePost(postId!, { description: text })}
      />
    </div>
  );
}
