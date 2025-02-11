export async function registerUser(userData: { username: string; name: string; email: string; password: string }) {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
}

export async function loginUser(credentials: { email: string; password: string }) {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
}

export function logoutUser() {
    localStorage.removeItem("token");
}