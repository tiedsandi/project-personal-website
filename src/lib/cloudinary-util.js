import { extractPublicId } from "cloudinary-build-url";

export function getCloudinaryPublicId(url) {
  if (!url) return null;
  return extractPublicId(url);
}
