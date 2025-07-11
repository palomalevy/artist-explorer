export function filterPostsByUser(posts, userId) {
  return posts.filter(post => post.authorId === userId);
}