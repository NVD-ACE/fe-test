import axios from "axios";
import type { PostsRequest } from "../types";
const API_URL = import.meta.env.VITE_API_URL;

export const getPosts = async (page: string, title: string, tags: string) => {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      params: {
        page: page,
        title: title,
        tags: tags,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch posts:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
export const getPostTags = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts/tags`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to fetch posts tags:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching posts tags:", error);
  }
};
export const createPost = async (post: PostsRequest) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      return response.data;
    } else {
      console.error("Failed to create post:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
export const updatePost = async (post: PostsRequest, id: string) => {
  try {
    const response = await axios.patch(`${API_URL}/posts/${id}`, post, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update post:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};
export const deletePost = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to delete post:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
