export function getCloudinaryPublicId(url) {
  if (!url) return null;

  const match = url.match(/\/upload\/(.*)\.[a-zA-Z0-9]+$/);
  return match ? match[1] : null;
}
