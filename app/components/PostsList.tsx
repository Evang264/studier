import { useEffect, useState } from 'react';
import { DocumentData } from "firebase/firestore";
import LoadingIndicator from './LoadingIndicator';
import Card from './Card';
import Post from './Post';
import { IPost, fetchUserPosts } from '@/lib/database';

export default function PostsList({
  postIds
}: {
  postIds: string[]
}) {
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const f = async () => {
  //     const results = await fetchPosts();
  //     console.log(`results: ${JSON.stringify(results)}`);
  //     setPosts(results);
  //     setLoading(false);
  //   };

  //   f();
  // }, [])

  // if (loading) return <LoadingIndicator />;

  return (
    <ul>
      {postIds.map(postId => (
        <Card key={postId}>
          <Post postId={postId} />
        </Card>
      ))}
    </ul>
  );
}
