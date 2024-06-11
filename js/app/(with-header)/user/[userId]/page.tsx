"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { fetchUser, updateUser } from "@/lib/database";
import { User } from "@/lib/database";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import EditableInput from "@/app/components/EditableInput";

export default function Page({ params }: { params: { userId: string } }) {
  // TODO: redirect page if userId does not exist

  const { user: loggedInUser } = useAuth();
  const editable: boolean = loggedInUser!.uid === params.userId;

  const [user, setUser] = useState<User | null>(null);

  // fetch the user
  useEffect(() => {
    const fetchData = async () => {
      setUser(await fetchUser(params.userId));
    };
    fetchData();
  }, []);

  if (!user) return <LoadingIndicator />;

  return (
    <div>
      <div className="flex flex-row">
        <Image
          src={user.pfp}
          width={100}
          height={100}
          alt="User profile picture"
        />
        <div>
          <div className="flex flex-row">
            <text>Name: </text>
            {editable ? (
              <EditableInput
                placeholder="Name"
                text={user.name}
                onUpdate={(text: string) =>
                  updateUser(params.userId, { name: text })
                }
                multiline={false}
              />
            ) : (
              <pre>{user.name}</pre>
            )}
          </div>
          <div className="flex flex-row">
            <text>Bio: </text>
            {editable ? (
              <EditableInput
                placeholder="Bio"
                text={user.bio}
                onUpdate={(text: string) =>
                  updateUser(params.userId, { bio: text })
                }
                multiline
              />
            ) : (
              <pre>{user.bio}</pre>
            )}
          </div>
        </div>
      </div>
      <h1>{user.name}&apos;s posts</h1>
    </div>
  );
}
