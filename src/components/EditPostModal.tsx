import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost, Post } from "../services/postService";

interface EditPostModalProps {
  post: Post;
  onClose: () => void;
  token: string;
}

export default function EditPostModal({ post, onClose, token }: EditPostModalProps) {
  const [updatedPost, setUpdatedPost] = useState(post);
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: (updatedPost: Post) => updatePost(token, updatedPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-3">Edit Post</h3>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-lg mb-2"
          value={updatedPost.title}
          onChange={(e) => setUpdatedPost({ ...updatedPost, title: e.target.value })}
        />
        <textarea
          className="w-full border px-3 py-2 rounded-lg mb-2"
          value={updatedPost.content}
          onChange={(e) => setUpdatedPost({ ...updatedPost, content: e.target.value })}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => updateMutation.mutate(updatedPost)}
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
