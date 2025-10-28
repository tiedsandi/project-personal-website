export async function uploadImageToCloudinary(file, folder = "project-images") {
  let targetFolder = folder;
  if (folder === "personal-photo" || (file?.type && file?.name?.includes("personal"))) {
    targetFolder = "personal-photo";
  }
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  if (targetFolder) formData.append("folder", targetFolder);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Gagal upload ke Cloudinary");
  const data = await res.json();
  return data.secure_url;
}
