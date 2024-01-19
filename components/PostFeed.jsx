import { Grid } from '@mantine/core'
import { PostFeedCard } from './PostFeedCard.jsx'

import { useSocialMediaContractRead } from '@/hooks/useSocialMediaContract'

export function PostFeed () {
  const { data: postCount } = useSocialMediaContractRead('postCount')

  return (
    <Grid>
      {
        Array.from({ length: postCount ?? 0 }).map((_, idx) => (
          <Grid.Col
            key={postCount - idx - 1}
            xs={12}
          >
            <PostFeedCard id={postCount - idx - 1} />
          </Grid.Col>
        ))
      }
    </Grid>
  )
}
