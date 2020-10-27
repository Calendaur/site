import PostList from 'screens/blog/PostList'
import * as api from 'shared/api'

function BlogPage({ posts }) {
  return <PostList posts={posts} />
}

export async function getStaticProps() {
  const { posts } = await api.posts()

  return {
    props: {
      posts,
    },
  }
}

export default BlogPage
