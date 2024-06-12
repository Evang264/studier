import { useState, useEffect } from 'react';
import Image from "next/image";

import { fetchUser, fetchPost, updatePost } from "@/lib/database";
import LoadingIndicator from './LoadingIndicator';
import { IUser, IPost } from '@/lib/database';
import ProtectedInput from './ProtectedInput';

export default function Post({
  postId, editable
}: {
  postId: string,
  editable: boolean
}) {
  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  // fetch the user
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchPost(postId);
      setPost(fetchedPost);
      setUser(await fetchUser(fetchedPost.userId));
    };
    fetchData();
  }, []);

  if (!user || !post) return <LoadingIndicator />;

  return (
    <div>
      <div className="flex flex-row">
        <Image
          src={user.pfp}
          width={30}
          height={30}
          alt={`${user.name}'s profile picture`}
        />
        <div>
          <p><b>{user.name}</b></p>
          <p><i>{user.bio}</i></p>
        </div>
      </div>
      <ProtectedInput text={post.title} editable={editable} onUpdate={
        (text) => updatePost(postId, { title: text })
      } />
      <ProtectedInput text={post.description} editable={editable} multiline onUpdate={
        (text) => updatePost(postId, { description: text })
      } />
    </div>
  )
}
