"use client";
import { useState, useEffect } from "react";

import PostList from "../components/PostList";
import { IPost, IUser, fetchAllPosts, fetchUser } from "@/lib/database";
import LoadingIndicator from "../components/LoadingIndicator";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      const posts_ = await fetchAllPosts();
      setPosts(posts_);
      setUsers(
        (await Promise.all(
          posts_.map((post) => fetchUser(post.userId))
        )) as IUser[]
      );
      setLoading(false);
    };

    f();
  }, []);

  if (loading) return <LoadingIndicator />;

  return (
    <PostList posts={posts} users={users} editable={false} />
  );
}
