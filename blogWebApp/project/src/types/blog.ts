export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: any;
  updatedAt: any;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
}