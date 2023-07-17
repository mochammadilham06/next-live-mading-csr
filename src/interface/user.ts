interface CommentUser {
  id: string;
  fullname: string;
  images: string | null;
}

interface Comment {
  id: string;
  content: string;
  comments_user: CommentUser;
}

export interface Post {
  id: string;
  content: string;
  image: string;
  created_at: string;
  post_comments: Comment[];
}

export interface UserIdResponse {
  id: string;
  fullname: string;
  gender: string;
  images: string | null;
  cover: string | null;
  address: string;
  users_posts: Post[];
}

export interface Auth {
  username: string;
  password: string;
}
export interface ResponseUsersAuth {
  id: string;
  roles: string;
}
