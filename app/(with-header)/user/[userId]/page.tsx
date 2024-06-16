"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { IPost, deletePost, fetchUser, updateUser } from "@/lib/database";
import { IUser, fetchUserPosts } from "@/lib/database";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import ProtectedInput from "@/app/components/ProtectedInput";
import PostList from "@/app/components/PostList";

const inputFields = [
  {
    prompt: "Name:",
    field: "name",
  },
  {
    prompt: "School:",
    field: "school",
  },
  {
    prompt: "Bio:",
    field: "bio",
    multiline: true,
  },
  {
    prompt: "Calendly:",
    field: "calendly",
  },
];

export default function Page({ params }: { params: { userId: string } }) {
  const { user: loggedInUser } = useAuth();
  const editable: boolean = loggedInUser!.uid === params.userId;

  const [user, setUser] = useState<IUser | null>(null);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const users = useRef<IUser[]>([]);

  // fetch the user
  useEffect(() => {
    const fetchData = async () => {
      const user_ = await fetchUser(params.userId);
      setUser(user_);
      if (user_) {
        setPosts(await fetchUserPosts(params.userId));
        users.current = Array.from({ length: user_.posts.length }, () => user_);
      }
      setLoading(false);
    };
    fetchData();
  }, [params.userId]);

  if (loading) return <LoadingIndicator />;
  if (!user) return <p>The requested user does not exist.</p>;

  const onDelete = async (postId: string) => {
    await deletePost(params.userId, postId);
    setUser(await fetchUser(params.userId));
    setPosts(posts.filter((_, i) => user.posts[i] !== postId));
    users.current.pop();
  };

  return (
    <div className="flex flex-col m-6 items-center mx-auto max-w-2xl">
      <div className="flex mb-5 w-full justify-center">
        <Image
          className="mr-4"
          src={user.pfp}
          width={150}
          height={150}
          alt="User profile picture"
        />
        <ul className="flex flex-col justify-center">
          {inputFields.map((inputField) => (
            <li key={inputField.field} className="flex">
              <b className="mr-2">{inputField.prompt}</b>
              <ProtectedInput
                className="flex-row"
                text={user[inputField.field] as string}
                editable={editable}
                multiline={inputField.multiline}
                onUpdate={(text) =>
                  updateUser(params.userId, { [inputField.field]: text })
                }
              />
            </li>
          ))}
        </ul>
      </div>
      <h1 className="text-2xl font-bold">{user.name}&apos;s posts</h1>
      <PostList
        posts={posts}
        users={users.current}
        postIds={user.posts}
        editable={editable}
        onDelete={onDelete}
      />
    </div>
  );
}
