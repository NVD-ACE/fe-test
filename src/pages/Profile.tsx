import React, { useState, useEffect } from "react";
import { Edit3, Trash2, Search, Filter, LogOut } from "lucide-react";
import {createPost, deletePost, getPosts, updatePost} from "../api/post.ts";
import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import type {Post, PostsRequest} from "../types";
import styles from "../styles/PostsManagement.module.css";

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
        <div className={styles.container}>
            <div className={styles.layout}>
                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.logoContainer}>
                        <img src={Logo} alt="Logo" className={styles.logo} />
                    </div>

                    <nav className={styles.nav}>
                        <a
                            href="/profile"
                            className={styles.navItemActive}
                        >
                            Posts
                        </a>
                        <button
                            onClick={handleLogout}
                            className={styles.navItem}
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className={styles.mainContent}>
                    <div className={styles.contentWrapper}>
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerContainer}>
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className={styles.addButton}
                                >
                                    Add new
                                </button>
                                {/* Search and Add Button */}
                                <div className={styles.searchContainer}>
                                    <div className={styles.searchInputs}>
                                        <div className={styles.inputWrapper}>
                                            <Search
                                                className={styles.inputIcon}
                                                size={16}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={searchTitle}
                                                onChange={(e) => setSearchTitle(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>

                                        <div className={styles.inputWrapper}>
                                            <Filter
                                                className={styles.inputIcon}
                                                size={16}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Tags"
                                                value={searchTags}
                                                onChange={(e) => setSearchTags(e.target.value)}
                                                className={styles.searchInput}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading && (
                            <div className={styles.loadingContainer}>
                                <div className={styles.loadingText}>Loading posts...</div>
                            </div>
                        )}

                        {/* Table */}
                        {!loading && (
                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead className={styles.tableHeader}>
                                    <tr>
                                        <th className={styles.tableHeaderCell}>ID</th>
                                        <th className={styles.tableHeaderCell}>Title</th>
                                        <th className={styles.tableHeaderCell}>Description</th>
                                        <th className={styles.tableHeaderCell}>Tags</th>
                                        <th className={styles.tableHeaderCell}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className={styles.tableBody}>
                                    {currentPosts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className={styles.noPostsCell}>
                                                No posts found
                                            </td>
                                        </tr>
                                    ) : (
                                        currentPosts.map((post, index) => (
                                            <tr key={`post-${post.id}-${index}`} className={styles.tableRow}>
                                                <td className={styles.tableCell}>{post.id}</td>
                                                <td className={styles.tableCell}>{post.title}</td>
                                                <td className={styles.tableCell}>{post.description}</td>
                                                <td className={styles.tableCell}>{formatTags(post.tags)}</td>
                                                <td className={styles.tableCell}>
                                                    <div className={styles.actionsContainer}>
                                                        <button
                                                            onClick={() => {
                                                                setEditingPost(post);
                                                                setShowEditModal(true);
                                                            }}
                                                            className={styles.editButton}
                                                        >
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePost(post.id)}
                                                            className={styles.deleteButton}
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
                            <div className={styles.paginationContainer}>
                                <div className={styles.paginationWrapper}>
                                    {/* Pagination Info */}
                                    <div className={styles.paginationInfo}>
                                        Showing {indexOfFirstPost + 1} to{" "}
                                        {Math.min(indexOfLastPost, filteredPosts.length)} of{" "}
                                        {filteredPosts.length} entries
                                    </div>

                                    {/* Pagination Controls */}
                                    <div className={styles.paginationControls}>
                                        <button
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                                            }
                                            disabled={currentPage === 1}
                                            className={styles.paginationButton}
                                        >
                                            Previous
                                        </button>

                                        {/* Page Numbers */}
                                        <div className={styles.pageNumbers}>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                                (pageNum) => (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`${styles.pageButton} ${
                                                            currentPage === pageNum
                                                                ? styles.pageButtonActive
                                                                : ""
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
                                            className={styles.paginationButton}
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
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <form onSubmit={handleSubmit} className={styles.modalForm}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className={styles.formInput}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className={styles.formTextarea}
                            rows={3}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Tags</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) =>
                                setFormData({ ...formData, tags: e.target.value })
                            }
                            className={styles.formInput}
                            placeholder="HTML, CSS, JavaScript"
                            required
                        />
                    </div>
                    <div className={styles.modalActions}>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={styles.submitButton}
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