import { BlogArticleInList } from 'types/common'
import ResponsiveGrid from '../ResponsiveGrid'
import PostCard from '../PostCard'

interface Props {
  posts: BlogArticleInList[]
}

function PostsGrid({ posts }: Props) {
  return (
    <ResponsiveGrid>
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </ResponsiveGrid>
  )
}

export default PostsGrid
