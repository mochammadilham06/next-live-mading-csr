interface CommentUser {
  fullname: string;
  images: string | null;
  id: string;
}

export interface CommentInterface {
  content: string;
  comments_user: CommentUser;
}
export interface UserPost {
  id: string;
  fullname: string;
  images: string;
  created_at: string;
  post_comments: CommentUser[];
}

export interface ContentInterface {
  validation: boolean;
  content: string;
  image: string;
  id: string;
  post_user: UserPost;
  post_comments: CommentInterface[];
}
