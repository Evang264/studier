import Card from "./Card";
import Post from "./Post";
import { IPost, IUser } from "@/lib/database";

export default function PostList({
  posts,
  users,
  postIds,
  editable, // the posts and users should map to each other
}: {
  posts: IPost[];
  users: IUser[];
  postIds?: string[];
  editable: boolean;
}) {
  return (
    <ul>
      {posts.map((post, index) => (
        <Card key={index}>
          <Post
            post={post}
            user={users[index]}
            {...(postIds && { postId: postIds[index] })}
            editable={editable}
          />
        </Card>
      ))}
    </ul>
  );
}
