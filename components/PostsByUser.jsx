import { Grid } from '@mantine/core'
import { PostFeedCard } from './PostFeedCard.jsx'

import { useSocialMediaContractRead } from '@/hooks/useSocialMediaContract'

export function PostsByUser ({ address }) {
  const { data: posts = [] } = useSocialMediaContractRead('postsByUser', [address])

  return (
    <Grid>
      {
        [...posts].reverse().map((id) => (
          <Grid.Col
            key={id}
            xs={12}
          >
            <PostFeedCard id={id} />
          </Grid.Col>
        ))
      }
    </Grid>
  )
}
