export async function uploadImageToCloudinary(file, folder = "project-images") {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  if (folder) formData.append("folder", folder);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Gagal upload ke Cloudinary");
  const data = await res.json();
  return data.secure_url;
}
