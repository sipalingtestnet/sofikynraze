'use client'

import { CreatePostForm } from '@/components/CreatePostForm'
import { PostFeed } from '@/components/PostFeed'
import { Container } from '@mantine/core'

export default function Home () {
  return (
    <main>
      <Container size={600}>
        <CreatePostForm />
        <PostFeed />
      </Container>
    </main>
  )
}
