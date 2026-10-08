const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type ApiResult = {
  success: boolean;
  message: string;
  errors?: { field: string; message: string }[];
};

export async function postForm(
  endpoint: string,
  data: unknown
): Promise<ApiResult> {
  try {
    const res = await fetch(`${API}/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch {
    return {
      success: false,
      message: "Cannot reach the server. Please try again.",
    };
  }
}