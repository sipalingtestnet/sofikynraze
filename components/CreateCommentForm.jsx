import { useForm } from '@mantine/form'
import { Box, Group, Textarea } from '@mantine/core'
import { Web3Button } from '@thirdweb-dev/react'

import socialMediaArtifact from '@/artifacts/SocialMedia.json'
import { useSocialMediaContractWrite } from '@/hooks/useSocialMediaContract'
import { notifications } from '@mantine/notifications'

export function CreateCommentForm ({ postId }) {
  const form = useForm({
    initialValues: { content: '' },
    validate: {
      content: (value) => value.trim().length <= 0
        ? 'Cannot submit empty comment!'
        : null
    }
  })

  const { mutateAsync } = useSocialMediaContractWrite('createComment')

  return (
    <Box
      mx='auto'
    >
      <Textarea
        required
        placeholder='Write your comment here...'
        {...form.getInputProps('content')}
      />
      <Group position='right'>
        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_SOCIAL_MEDIA_ADDRESS}
          contractAbi={socialMediaArtifact.abi}
          action={async () => {
            await mutateAsync({
              args: [postId, form.values.content]
            })
            form.reset()
          }}
          onError={(e) => {
            notifications.show({
              title: 'Failed to create comment!☹️',
              message: e.reason,
              color: 'red'
            })
          }}
          style={{
            marginTop: '1rem',
            alignSelf: 'end'
          }}
          className='button'
        >
          Comment
        </Web3Button>
      </Group>
    </Box>
  )
}
