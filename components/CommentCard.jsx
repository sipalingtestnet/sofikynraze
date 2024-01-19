import Link from 'next/link'

import { Paper, Group, Text, Skeleton, Loader, Avatar, Spoiler } from '@mantine/core'

import { useSocialMediaContractRead, useSocialMediaContractWrite } from '@/hooks/useSocialMediaContract'
import { metamaskWallet, useAddress, useConnect } from '@thirdweb-dev/react'
import { IconBell, IconBellFilled, IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import formatRelative from 'date-fns/formatRelative'

const metamaskConfig = metamaskWallet()

export function CommentCard ({ id }) {
  const currentUserAddress = useAddress()
  const connect = useConnect()

  const { data, isLoading } = useSocialMediaContractRead('comments', [id])
  const { data: hasLikedComment } = useSocialMediaContractRead('hasLikedComment', [id], {
    from: currentUserAddress
  })

  const { mutateAsync: toggleCommentLike, isLoading: isLoadingToggleCommentLike } = useSocialMediaContractWrite('toggleCommentLike')

  const { content, author, createdAt, likeCount } = data ?? {}
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

  const IconHeartToUse = isLoadingToggleCommentLike
    ? Loader
    : hasLikedComment
      ? IconHeartFilled
      : IconHeart

  return (
    <Paper
      style={{
        overflow: 'clip'
      }}
      p='sm'
    >
      <Group>
        <Link href={`/profile/${author}`}>
          <Text size='xs'>
            {author && `${author.substring(0, 5)}...${author.substring(author.length - 4)}`}
          </Text>
        </Link>
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
                height: '1rem',
                width: '1rem'
              }}
            />
          )
        }
      </Group>

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
            <Link href={`/profile/${author}`}>
              <Avatar radius='md'>
                <Text
                  style={{
                    fontSize: '0.65rem'
                  }}
                >
                  {author && `${author.substring(0, 3)}...${author.substring(author.length - 2)}`}
                </Text>
              </Avatar>
            </Link>

          </Skeleton>
        </Group>

        <Group>
          <Skeleton
            visible={isLoading}
            miw='8rem'
          >
            <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide'>
              <Text
                size='sm'
                align='justify'
              >
                {content}
              </Text>
            </Spoiler>
          </Skeleton>
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
                  title: 'Failed to like comment!☹️',
                  message: 'Please connect to wallet.',
                  color: 'red'
                })
                return
              }
              await toggleCommentLike({
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

      </Group>

    </Paper>
  )
}
