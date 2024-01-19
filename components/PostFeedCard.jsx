import Link from 'next/link'

import { Paper, Group, Text, Skeleton, Stack, Container, Loader, Avatar, Spoiler, Center } from '@mantine/core'

import { useSocialMediaContractRead, useSocialMediaContractWrite } from '@/hooks/useSocialMediaContract'
import { MediaRenderer, metamaskWallet, useAddress, useConnect } from '@thirdweb-dev/react'
import { IconBell, IconBellFilled, IconHeart, IconHeartFilled, IconMessage } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks'
import formatRelative from 'date-fns/formatRelative'

import { CreateCommentForm } from './CreateCommentForm'
import { CommentCard } from './CommentCard'

const metamaskConfig = metamaskWallet()

export function PostFeedCard ({ id }) {
  const currentUserAddress = useAddress()
  const connect = useConnect()

  const { data, isLoading } = useSocialMediaContractRead('posts', [id])
  const { data: hasLikedPost } = useSocialMediaContractRead('hasLikedPost', [id], {
    from: currentUserAddress
  })
  const { data: comments = [], isLoading: isLoadingComments } = useSocialMediaContractRead('postComments', [id])

  const { mutateAsync: togglePostLike, isLoading: isLoadingTogglePostLike } = useSocialMediaContractWrite('togglePostLike')

  const [isOpened, handlers] = useDisclosure(false)

  const { content, imageCid, author, createdAt, likeCount } = data ?? {}
  const isAuthor = !isLoading && currentUserAddress === author

  const { data: isFollowing } = useSocialMediaContractRead('isFollowing', [author], {
    from: currentUserAddress
  })

  const { mutateAsync: toggleUserFollow, isLoading: isLoadingFollowUser } = useSocialMediaContractWrite('toggleUserFollow')

  const IconBellToUse = isLoadingFollowUser
    ? Loader
    : isFollowing
      ? IconBellFilled
      : IconBell

  const IconHeartToUse = isLoadingTogglePostLike
    ? Loader
    : hasLikedPost
      ? IconHeartFilled
      : IconHeart

  return (
    <Paper
      shadow='md'
      radius='md'
      m='sm'
      p='sm'
      style={{
        overflow: 'clip'
      }}
    >
     
      <Group
        noWrap
        align='flex-start'
      >
        <Group>
          <Skeleton
            visible={isLoading}
            w='2rem'
            h='2rem'
          >
        
         <div style={{ display: 'flex', alignItems: 'center' }}>
  <Link href={`/profile/${author}`} style={{ marginRight: '10px' }}>
    <Avatar radius='md'>
      <Text style={{ fontSize: '1rem' }}>
        <img src="https://i.imgur.com/h4rohuA.png" alt="Foto" width="45"></img>
        {author && ``}
        <br></br>
      </Text>
    </Avatar>
  </Link>
  <Link href={`/profile/${author}`} style={{ display: 'flex', alignItems: 'center' }}>
    <Text size='xs'>
      {author && `${author.substring(0, 5)}...${author.substring(author.length - 4)}`}
    </Text>

  </Link>
  </div>

 
     
          </Skeleton>
        </Group>

        <Group grow w='100%'>
          <Stack>
            <Skeleton
              visible={isLoading}
              miw='10rem'
            >
              <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide'>
              <br></br>
              <br></br>
                <Text
                  size='md'
                  align='left'
                >
                  {content}
                </Text>
              </Spoiler>
            </Skeleton>
            {
              imageCid && (
                <Center w='100%'>
                  <MediaRenderer
                    src={imageCid}
                    style={{
                      margin: 'auto',
                      borderRadius: '0.5rem',
                      objectFit: 'cover',
                      maxWidth: '100%',
                      width: 'auto',
                      maxHeight: '150px',
                      marginBottom: '1rem'
                    }}
                  />
                </Center>
              )
            }
          </Stack>
        </Group>
      </Group>

      <Group position='apart'>
        <Group>
          <Skeleton visible={isLoading}>
            <Text
              size='sm'
              fs='italic'
              c='dimmed'
            >
              {createdAt ? formatRelative(Number(createdAt) * 1000, Date.now()) : ''}
            </Text>
          </Skeleton>
        </Group>

        <Group>
          <Group
            style={{
              gap: '0.25rem'
            }}
          >
            
            <Skeleton
              visible={isLoadingComments}
              display='inline'
              w='2rem'
              ta='center'
            >
              {comments.length}
            </Skeleton>
            <IconMessage
              onClick={() => {
                handlers.toggle()
              }}
              style={{
                cursor: 'pointer'
              }}
            />
          </Group>

          <Group
            style={{
              gap: '0.25rem'
            }}
          >
            
            <Skeleton
              visible={isLoading}
              display='inline'
              w='2rem'
              ta='center'
            >
              {Number(likeCount)}
            </Skeleton>
            <IconHeartToUse
              onClick={async () => {
                try {
                  await connect(metamaskConfig)
                } catch (e) {
                  console.error(e.reason ?? e.message ?? e)
                  notifications.show({
                    title: 'Failed to like post!☹️',
                    message: 'Please connect to wallet.',
                    color: 'red'
                  })
                  return
                }
                await togglePostLike({
                  args: [id]
                })
              }}
              style={{
                cursor: 'pointer',
                width: '1.5rem',
                height: '1.5rem'
              }}
            />
          </Group>
 <Group>
        {
          author && currentUserAddress && !isAuthor && (
            <IconBellToUse
              onClick={async () => {
                try {
                  await connect(metamaskConfig)
                } catch (e) {
                  console.error(e.reason ?? e.message ?? e)
                  notifications.show({
                    title: 'Failed to follow user!☹️',
                    message: 'Please connect to wallet.',
                    color: 'red'
                  })
                  return
                }
                await toggleUserFollow({
                  args: [author]
                })
              }}
              style={{
                cursor: 'pointer',
                height: '1.5rem',
                width: '1.5rem'
              }}
            />
          )
        }
      </Group>
        </Group>

      </Group>

      <Stack
        p='md'
        style={{
          display: isOpened ? 'flex' : 'none'
        }}
      >
        <Container
          w='100%'
          p={0}
        >
          <CreateCommentForm postId={id} />
        </Container>
        <Stack>
          {
            comments.map((id) => (
              <CommentCard id={id} key={id} />
            ))
          }
        </Stack>
      </Stack>
    </Paper>
  )
}
