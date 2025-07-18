import React, { useState, useEffect } from "react";
import { Edit3, Trash2, Search, Filter, LogOut } from "lucide-react";
import {createPost, deletePost, getPosts, updatePost} from "../api/post.ts";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import type {Post, PostsRequest} from "../types";

const PostsManagement = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchTags, setSearchTags] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const postsPerPage = 10;

    // Helper function to ensure tags is always an array
    const ensureTagsArray = (tags: any): string[] => {
        if (Array.isArray(tags)) {
            return tags;
        }
        if (typeof tags === 'string') {
            return tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        }
        return [];
    };

    // Helper function to format tags for display
    const formatTags = (tags: any): string => {
        const tagsArray = ensureTagsArray(tags);
        return tagsArray.join(", ");
    };


    // Fetch posts on component mount
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {

                const data: any = await getPosts(currentPage.toString(), searchTitle, searchTags);
                // Handle both array and object with posts property
                const postsArray = Array.isArray(data) ? data : data.posts || [];

                // Normalize posts to ensure tags are arrays
                const normalizedPosts = postsArray.map((post: any) => ({
                    ...post,
                    id: post.id || post._id, // Ensure id is consistent
                    tags: ensureTagsArray(post.tags)
                }));

                setPosts(normalizedPosts);
                setFilteredPosts(normalizedPosts);
                console.log(normalizedPosts);
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setPosts([]);
                setFilteredPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts().then();
    }, []);

    useEffect(() => {
        // Filter posts based on search criteria
        const filterPosts = () => {
            if (!posts || posts.length === 0) return [];
            return posts.filter((post) => {
                const titleMatch = searchTitle === "" ||
                    post.title.toLowerCase().includes(searchTitle.toLowerCase());
                const tagsMatch = searchTags === "" ||
                    ensureTagsArray(post.tags).some((tag) =>
                        tag.toLowerCase().includes(searchTags.toLowerCase())
                    );
                return titleMatch && tagsMatch;
            });
        };
        setFilteredPosts(filterPosts());
        setCurrentPage(1); // Reset to first page on filter change
    }, [posts, searchTitle, searchTags]);

    // Get current posts for pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);



    // CRUD Operations
    const handleAddPost = async (postData: any) => {
        try {
            const newPost = {
                title: postData.title,
                description: postData.description,
                tags: ensureTagsArray(postData.tags)
            };
            // Call API to create post
            const response = await createPost(newPost);
            if (response) {
                setPosts((prevPosts) => [...prevPosts, response]);
                setFilteredPosts((prevPosts) => [...prevPosts, response]);
                setShowAddModal(false);
            }
            console.log("Post added successfully:", response);
            alert("Post added successfully!");
        } catch (error) {
            console.error("Failed to add post:", error);
        }
    };

    const handleEditPost = async (postData: any, id: string) => {
        try {
            const updatedPost = {
                ...postData,
                tags: ensureTagsArray(postData.tags)
            };
            console.log("Post updated:", updatedPost);
            const response = await updatePost(updatedPost, id);
            if (response) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) => (post.id === id ? response : post))
                );
                setFilteredPosts((prevPosts) =>
                    prevPosts.map((post) => (post.id === id ? response : post))
                );
                setShowEditModal(false);
                console.log(response);
                setEditingPost(null);
            }
            console.log("Post updated successfully:", response);
            alert("Post updated successfully!");
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    };

    const handleDeletePost = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        setLoading(true);
        console.log("Deleting post with ID:", id); //

        // Validate ID
        if (!id || id === 'undefined' || id === 'null') {
            console.error("Invalid ID provided:", id);
            alert("Cannot delete post: Invalid ID");
            return;
        }
        try {
            const response = await deletePost(id);

            if (response.status === 200 || response.status === 204) {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
                setFilteredPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
                console.log("Post deleted successfully");
                alert("Post deleted successfully!");
            } else {
                console.error("Failed to delete post:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        } finally {
            setLoading(false);
        }

    };

    const handleLogout = () => {
        // Clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    };

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div className="w-full min-h-screen bg-gray-100">
            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 min-h-screen p-4 bg-gray-200 fixed top-0 left-0 z-10 ">
                    <div className="mb-8">
                        <img src={Logo} alt="Logo" className="w-10" />
                    </div>

                    <nav className="space-y-2">
                        <a
                            href="/profile"
                            className="flex items-center gap-2 p-3 bg-primary text-white rounded-lg"
                        >
                            Posts
                        </a>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 p-3 text-gray-700 hover:bg-gray-300 rounded-lg w-full text-left"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="pl-26 w-full min-h-screen bg-white relative">
                    <div className="">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="bg-primary w-42 text-center text-white px-4 py-2 rounded-4xl hover:bg-purple-600 transition-colors gap-2"
                                >
                                    Add new
                                </button>
                                {/* Search and Add Button */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <div className="relative">
                                            <Search
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={16}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={searchTitle}
                                                onChange={(e) => setSearchTitle(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none focus:ring-transparent "
                                            />
                                        </div>

                                        <div className="relative">
                                            <Filter
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                size={16}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Tags"
                                                value={searchTags}
                                                onChange={(e) => setSearchTags(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none  focus:ring-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className="p-6 text-center">
                                <div className="text-gray-500">Loading posts...</div>
                            </div>
                        )}

                        {/* Table */}
                        {!loading && (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tags
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-gray-300 divide-y divide-gray-200">
                                    {currentPosts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                No posts found
                                            </td>
                                        </tr>
                                    ) : (
                                        currentPosts.map((post, index) => (
                                            <tr key={`post-${post.id}-${index}`} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {post.id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {post.title}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {post.description}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatTags(post.tags)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex gap-6">
                                                        <button
                                                            onClick={() => {
                                                                setEditingPost(post);
                                                                setShowEditModal(true);
                                                            }}
                                                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                                        >
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePost(post.id)}
                                                            className="text-red-600 hover:text-red-800 cursor-pointer"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination */}
                        {!loading && filteredPosts.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    {/* Pagination Info */}
                                    <div className="text-sm text-gray-700">
                                        Showing {indexOfFirstPost + 1} to{" "}
                                        {Math.min(indexOfLastPost, filteredPosts.length)} of{" "}
                                        {filteredPosts.length} entries
                                    </div>

                                    {/* Pagination Controls */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                                            }
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>

                                        {/* Page Numbers */}
                                        <div className="flex gap-1">
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                (pageNum) => (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`px-3 py-1 text-sm rounded transition-colors ${
                                                            currentPage === pageNum
                                                                ? "bg-purple-500 text-white"
                                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        <button
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                            }
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <PostModal
                    title="Add New Post"
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddPost}
                />
            )}

            {/* Edit Modal */}
            {showEditModal && editingPost && (
                <PostModal
                    title="Edit Post"
                    post={editingPost}
                    onClose={() => {
                        setShowEditModal(false);
                        setEditingPost(null);
                    }}
                    onSubmit={(postData) => handleEditPost(postData, editingPost.id)}
                />
            )}
        </div>
    );
};

// Modal Component
interface PostModalProps {
    title: string;
    post?: Post;
    postRequest?: PostsRequest;
    onClose: () => void;
    onSubmit: (post: any) => void;
}

const PostModal = ({ title, post, onClose, onSubmit }: PostModalProps) => {
    const [formData, setFormData] = useState({
        title: post?.title || "",
        description: post?.description || "",
        tags: Array.isArray(post?.tags) ? post.tags.join(", ") : (post?.tags || ""),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        };

        if (post) {
            onSubmit({ ...post, ...submitData });
        } else {
            onSubmit(submitData);
        }
    };

    return (
        <div className="fixed inset-0 shadow-xl rounded-4xl bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-transparent focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-transparent focus:outline-none"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags
                        </label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-transparent focus:outline-none"
                            placeholder="HTML, CSS, JavaScript"
                            required
                        />
                    </div>
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition-colors"
                        >
                            {post ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostsManagement;