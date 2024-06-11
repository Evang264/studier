"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { fetchUser, updateUser } from "@/lib/database";
import { User } from "@/lib/database";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import ProtectedInput from "@/app/components/ProtectedInput";

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
          <ProtectedInput
            prompt="Name"
            text={user.name}
            editable={editable}
            multiline={false}
            onUpdate={(text) => updateUser(params.userId, { name: text })}
          />
          <ProtectedInput
            prompt="School"
            text={user.school}
            editable={editable}
            multiline={false}
            onUpdate={(text) => updateUser(params.userId, { school: text })}
          />
          <ProtectedInput
            prompt="Bio"
            text={user.bio}
            editable={editable}
            multiline={true}
            onUpdate={(text) => updateUser(params.userId, { bio: text })}
          />
          <ProtectedInput
            prompt="Calendly"
            text={user.calendly}
            editable={editable}
            multiline={false}
            onUpdate={(text) => updateUser(params.userId, { calendly: text })}
          />
          <ProtectedInput
            prompt="Profile Pic Link"
            text={user.pfp}
            editable={editable}
            multiline={false}
            onUpdate={(text) => updateUser(params.userId, { pfp: text })}
          />
        </div>
      </div>
      <h1>{user.name}&apos;s posts</h1>
    </div>
  );
}
