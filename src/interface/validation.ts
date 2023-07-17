export interface ValidationContent {
  id: string;
  image: string;
  content: string;
  created_at: string;
  updated_at: string;
  validation: boolean | string;
  post_user: PostUser;
}

interface PostUser {
  id: string;
  fullname: string;
  username: string;
}
