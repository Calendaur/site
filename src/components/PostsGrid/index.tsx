import { BlogArticleInList } from 'types/common'
import ResponsiveGrid from '../ResponsiveGrid'
import PostCard from '../PostCard'

interface Props {
  posts: BlogArticleInList[]
  className?: string
}

function PostsGrid({ className, posts }: Props) {
  return (
    <ResponsiveGrid className={className}>
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </ResponsiveGrid>
  )
}

export default PostsGrid
