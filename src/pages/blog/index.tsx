import { GetStaticProps } from 'next'
import PostList from 'screens/blog/PostList'
import * as api from 'shared/api'
import { BlogArticleInList } from 'types/common'

interface Props {
  posts: BlogArticleInList[]
}

function BlogPage({ posts }: Props) {
  return <PostList posts={posts} />
}

export const getStaticProps: GetStaticProps = async () => {
  const { posts } = await api.posts()

  return {
    props: {
      posts,
    },
    revalidate: 120,
  }
}

export default BlogPage
