export async function postService (applicationData) {
  const response = await fetch(
    "http://192.168.122.200:8000/api/s",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create application");
  }

  return data;
}