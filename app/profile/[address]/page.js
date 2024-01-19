'use client'

import { PostsByUser } from '@/components/PostsByUser'
import { TipUser } from '@/components/TipUser'
import { useSocialMediaContractRead } from '@/hooks/useSocialMediaContract'
import { Container, Text, Avatar, Skeleton, Stack, Grid, Group } from '@mantine/core'
import { useAddress } from '@thirdweb-dev/react'
import { formatEther } from 'ethers/lib/utils'
import { usePathname } from 'next/navigation'

export default function Profile() {
  const pathname = usePathname()
  const address = pathname.substring(9)
  const currentUserAddress = useAddress()

  const { data, isLoading } = useSocialMediaContractRead('users', [address])

  const followerCount = typeof data?.followerCount !== 'undefined' && Number(data.followerCount)
  const followingCount = typeof data?.followingCount !== 'undefined' && Number(data.followingCount)
  const postCount = typeof data?.postCount !== 'undefined' && Number(data.postCount)
  const tipsReceived =
    typeof data?.tipsReceived !== 'undefined' && Number(formatEther(data.tipsReceived))

  const isOwnProfile = address === currentUserAddress

  return (
    <main>
  <Container size={600} colorScheme="light" color="orange" border="2px solid #8e197e">
        <Stack align='center'>
          <Avatar size='xl' radius='md' my='sm' color="white">
            <Text size='sm'>
              <img src="https://i.imgur.com/eMhTL1A.png" alt="Foto" width="100"></img>
            </Text>
          </Avatar>

          <Text size='sm' fw={700} color="white">
            {address}
          </Text>

          <Group align='center'>
            <Group fw={700} color="white">
              {isOwnProfile ? (
                <>
                  <Text>{'Earnings: '}</Text>
                  <Skeleton visible={isLoading} w='3rem' ta='center' mx='auto' color="white">
                    <Text color="white">{parseFloat(tipsReceived).toFixed(3)}</Text>
                  </Skeleton>
                  <Text ta='center' color="white">KYN{tipsReceived > 1 ? 's' : ''}</Text>
                </>
              ) : (
                <TipUser userAddress={address} />
              )}
            </Group>
     
          </Group>
        </Stack>

        <Grid my='lg' fw={700}>
        <Grid.Col span={4} color="white" border="1px solid #8e197e">
            <Skeleton visible={isLoading} w='1rem' h='1rem' mb='sm' ta='center' mx='auto' color="white">
              <Text color="white">{postCount}</Text>
            </Skeleton>
            <Text ta='center' color="white">
              {`Post${postCount > 1 ? 's' : ''}`}
            </Text>
          </Grid.Col>

          <Grid.Col span={4} color="white" border="1px solid #8e197e">
            <Skeleton visible={isLoading} w='1rem' h='1rem' mb='sm' ta='center' mx='auto' color="white">
              <Text color="white">{followerCount}</Text>
            </Skeleton>
            <Text ta='center' color="white">
              {`Follower${followerCount > 1 ? 's' : ''}`}
            </Text>
          </Grid.Col>

          <Grid.Col span={4} color="white" border="1px solid #8e197e">
            <Skeleton visible={isLoading} w='1rem' h='1rem' mb='sm' ta='center' mx='auto' color="white">
              <Text color="white">{followingCount}</Text>
            </Skeleton>
            <Text ta='center' color="white">
              Following
            </Text>
          </Grid.Col>
        </Grid>

        <PostsByUser address={address} />
      </Container>
    </main>
  )
}