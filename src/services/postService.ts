export interface Post {
    id: string;
    title: string;
    content: string;
    slug: string;
}

export async function fetchPosts(
    token: string,
    page: number = 1,
    limit: number = 5,
    query: string = ""
): Promise<{ data: Post[]; totalPages: number }> {
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/posts`);
    url.searchParams.append("page", page.toString());
    url.searchParams.append("limit", limit.toString());
    if (query) {
        url.searchParams.append("query", query);
    }

    const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const json = await res.json();

    return {
        data: json.data.items || [],
        totalPages: json.data.totalPages || 1,
    };
}

export async function deletePost(token: string, postId: string): Promise<void> {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Failed to delete post");
}

export async function updatePost(token: string, updatedPost: Post): Promise<void> {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts/${updatedPost.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPost),
    });

    if (!res.ok) throw new Error("Failed to update post");
}