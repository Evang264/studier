import { useState, useEffect } from "react";
import Image from "next/image";

import { fetchUser, fetchPost, updatePost } from "@/lib/database";
import LoadingIndicator from "./LoadingIndicator";
import { IUser, IPost } from "@/lib/database";
import ProtectedInput from "./ProtectedInput";

export default function Post({
  post,
  user,
  postId,
  editable = false,
}: {
  post: IPost;
  user: IUser;
  postId?: string;
  editable: boolean;
}) {
  return (
    <div>
      <div className="flex flex-row mb-2 w-full items-center">
        <Image
          src={user.pfp}
          width={45}
          height={45}
          alt={`${user.name}'s profile picture`}
          className="mr-4"
        />
        <div>
          <p>
            <b>{user.name}</b>
          </p>
          <p>
            <i>{user.bio}</i>
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <ProtectedInput
        text={post.title}
        editable={editable}
        className="text-2xl mb-2"
        {...(editable? {
          onUpdate: (text: string) => updatePost(postId!, { title: text })
        }: {})}
      />
      <ProtectedInput
        text={post.description}
        editable={editable}
        multiline
        {...(editable? {
          onUpdate: (text: string) => updatePost(postId!, { description: text })
        }: {})}
      />
    </div>
  );
}
