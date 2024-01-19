import { useForm } from '@mantine/form'
import { Box, FileInput, Group, Textarea, Image, Container } from '@mantine/core'
import { Web3Button, useStorageUpload } from '@thirdweb-dev/react'

import socialMediaArtifact from '@/artifacts/SocialMedia.json'
import { useSocialMediaContractWrite } from '@/hooks/useSocialMediaContract'
import { notifications } from '@mantine/notifications'
import { IconPhoto } from '@tabler/icons-react'
import { IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { v4 as uuidv4 } from 'uuid'

export function CreatePostForm () {
  const form = useForm({
    initialValues: {
      content: '',
      imageFile: null
    },
    validate: {
      content: (value) => value.trim().length <= 0
        ? 'Cannot submit empty post!'
        : null
    }
  })

  const imageUrl = form.values.imageFile && URL.createObjectURL(form.values.imageFile)

  const { mutateAsync } = useSocialMediaContractWrite('createPost')
  const { mutateAsync: upload } = useStorageUpload()

  return (

    <Box
    mx='auto'
    p='md'
    style={{
      border: '1px solid #8e197e',
      borderRadius: '16px', // Adjust the value as per your preference
      marginTop: '35px' // Adjust the value as per your preference
    }}
    
  >
 <Textarea
  required
  placeholder='Write your post here...'
  {...form.getInputProps('content')}
  variant='unstyled'
  wrapperProps={{
    px: 'sm',
    style: {
      border: '1px solid #8e197e',
      borderRadius: '4px' // Atur nilai sesuai keinginan Anda
    }
  }}
  size='xl'
/>
    {
      imageUrl && (
        <Container>
          <Image
            src={imageUrl}
            radius='md'
            p='md'
            width='auto'
            height='100%'
            fit='cover'
            mx='auto'
            imageProps={{
              onLoad: () => URL.revokeObjectURL(imageUrl),
              style: {
                maxHeight: '300px',
                margin: 'auto'
              }
            }}
          />
        </Container>
      )
    }
    <Group
      position='apart'
      align='center'
      mt='1rem'
    >
      <Group>
        <FileInput
          accept={IMAGE_MIME_TYPE}
          icon={<IconPhoto />}
          variant='unstyled'
          styles={{
            input: {
              fontSize: '0px'
            }
          }}
          {...form.getInputProps('imageFile')}
        />
      </Group>
  
      <Group>
        <Web3Button
          contractAddress={process.env.NEXT_PUBLIC_SOCIAL_MEDIA_ADDRESS}
          contractAbi={socialMediaArtifact.abi}
          action={async () => {
            const { content, imageFile } = form.values
            let imageCid = ''
            if (imageFile) {
              ([imageCid] = await upload({
                data: [new File([imageFile], uuidv4())]
              }))
            }
            await mutateAsync({
              args: [content, imageCid]
            })
            form.reset()
          }}
          onError={(e) => {
            notifications.show({
              title: 'Failed to create post!☹️',
              message: e.reason ?? e.message,
              color: 'red'
            })
          }}
          className='button'
        >
          Post
        </Web3Button>
      </Group>
    </Group>
  </Box>
  )
}
