export interface Post {
    id: 'string',
    title: 'string',
    description: 'string',
    tags: [],
}
export interface PostsRequest {
    title: string;
    description: string;
    tags: string[];
}
export interface LoginResponse {
    "accessToken": "string",
    "refreshToken": "string",
}
export interface Gallery {
    id: string;
    imageUrl: string;
    // api error description
    desctiption: string;
}