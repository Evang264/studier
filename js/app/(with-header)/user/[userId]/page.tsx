"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { fetchUser, updateUser } from "@/lib/database";
import { IUser } from "@/lib/database";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import ProtectedInput from "@/app/components/ProtectedInput";

export default function Page({ params }: { params: { userId: string } }) {
  // TODO: redirect page if userId does not exist

  const { user: loggedInUser } = useAuth();
  const editable: boolean = loggedInUser!.uid === params.userId;

  const [user, setUser] = useState<IUser | null>(null);

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
            <p>Name: </p>
            <ProtectedInput
              text={user.name}
              editable={editable}
              multiline={false}
              onUpdate={(text) => updateUser(params.userId, { name: text })}
            />
          </div>
          <div className="flex flex-row">
            <p>School: </p>
            <ProtectedInput
              text={user.school}
              editable={editable}
              multiline={false}
              onUpdate={(text) => updateUser(params.userId, { school: text })}
            />
          </div>
          <div className="flex flex-row">
            <p>Bio: </p>
            <ProtectedInput
              text={user.bio}
              editable={editable}
              multiline={false}
              onUpdate={(text) => updateUser(params.userId, { bio: text })}
            />
          </div>
          <div className="flex flex-row">
            <p>Calendly: </p>
            <ProtectedInput
              text={user.calendly}
              editable={editable}
              multiline={false}
              onUpdate={(text) => updateUser(params.userId, { calendly: text })}
            />
          </div>
          <div className="flex flex-row">
            <p>Profile pic link: </p>
            <ProtectedInput
              text={user.pfp}
              editable={editable}
              multiline={false}
              onUpdate={(text) => updateUser(params.userId, { pfp: text })}
            />
          </div>
        </div>
      </div>
      <h1>{user.name}&apos;s posts</h1>
    </div>
  );
}
