import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { fetchPosts, deletePost, updatePost, Post } from "../services/postService";
import NavbarAdmin from "../components/NavbarAdmin";

export default function Dashboard() {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const username = useSelector((state: RootState) => state.auth.username);
  const queryClient = useQueryClient();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    console.log("useEffect",localStorage.getItem("token"))
  }, []);
  console.log("useSelector:",useSelector((state: RootState) => state.auth));

  const { data, isLoading } = useQuery({
    queryKey: ["posts", page, searchQuery],
    queryFn: () => (token ? fetchPosts(token, page, limit, searchQuery) : Promise.resolve({ data: [], totalPages: 1 })),
    enabled: !!token,
  });

  const posts = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => {
      if (!token) throw new Error("Unauthorized");
      return deletePost(token, postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (updatedPost: Post) => {
      if (!token) throw new Error("Unauthorized");
      return updatePost(token, updatedPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setEditingPost(null);
    },
  });

  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteModalOpen(true);
  };

  if (token === null) {
    return <p className="text-center text-red-500 font-bold">Page not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin user={username || "Guest"} />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {username}</h1>
        <h2 className="text-lg text-gray-600 mt-2">Blog Posts</h2>

        <input
          type="text"
          placeholder="Search by title..."
          className="w-full border px-3 py-2 rounded-lg mt-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : posts.length > 0 ? (
          <div className="mt-4 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
                <div className="mt-3 flex space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    onClick={() => setEditingPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteClick(post)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}

        {editingPost && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-3">Edit Post</h3>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg mb-2"
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
              />
              <textarea
                className="w-full border px-3 py-2 rounded-lg mb-2"
                value={editingPost.content}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
              />
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg mb-2"
                value={editingPost.slug}
                onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  onClick={() => updateMutation.mutate(editingPost)}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteModalOpen && postToDelete && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Confirm Delete</h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to delete <strong>{postToDelete.title}</strong>?
              </p>
              <div className="mt-4 flex justify-center gap-2">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={() => {
                    deleteMutation.mutate(postToDelete.id);
                    setIsDeleteModalOpen(false);
                  }}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <button
            className={`px-4 py-2 bg-gray-500 text-white rounded-md ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-gray-700">Page {page} of {totalPages}</span>
          <button
            className={`px-4 py-2 bg-gray-500 text-white rounded-md ${page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"}`}
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}