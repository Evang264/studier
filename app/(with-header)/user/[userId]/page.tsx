"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { fetchUser, updateUser } from "@/lib/database";
import { IUser, fetchUserPosts } from "@/lib/database";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import ProtectedInput from "@/app/components/ProtectedInput";
import PostList from "@/app/components/PostsList";

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
  const [loading, setLoading] = useState(true);

  // fetch the user
  useEffect(() => {
    const fetchData = async () => {
      setUser(await fetchUser(params.userId));
      setLoading(false);
    };
    fetchData();
  }, [params.userId]);

  if (loading) return <LoadingIndicator />;
  if (!user) return <p>The requested user does not exist.</p>;

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
      <PostsList postIds={user.posts} />
    </div>
  );
}
