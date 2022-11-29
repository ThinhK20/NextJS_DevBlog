export function discussionGraphQL(
  githubDiscussionCategoryId: string | undefined
) {
  return `{
    repository(owner: "ThinhK20", name: "NextJS_DevBlog") {
        discussions(first: 100, categoryId: "${githubDiscussionCategoryId}") {
          nodes {
            title
            url
            number
            bodyHTML
            bodyText
            createdAt
            lastEditedAt
            author {
              login
              url
              avatarUrl
            }
             labels(first: 100) {
              nodes {
                name
              }
            }
          }
        }
      }
}`;
}

// Single blog
export function discussionDetailGraphQL(postId: number | string | undefined) {
  return `{
    repository(owner: "ThinhK20", name: "NextJS_DevBlog"){
      discussion(number: ${postId}) {
        title,
        bodyHTML, 
        createdAt,
        author {
          login,
          url,
          avatarUrl
        }
      }
    }
  }
  `;
}
