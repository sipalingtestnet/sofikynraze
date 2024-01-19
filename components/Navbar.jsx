'use client'

import Link from 'next/link'

import Image from 'next/image'
import {
  Header,
  Group,
  Burger,
  rem,
  Title,
  Drawer,
  MediaQuery,
  Center,
  Text,
  Avatar
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { ConnectNetwork } from './ConnectNetwork'
import favicon from '../app/favicon.ico'
import { useAddress } from '@thirdweb-dev/react'

const HEADER_HEIGHT = rem(60)

export function Navbar () {
  const currentUserAddress = useAddress()
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false)

  return (
    <>
      <Header height={HEADER_HEIGHT}>
        <Group position='apart' sx={{ height: '100%' }}>
          <Group>
            <Link href='/'>
              <Group>
            
                <Title
                  size='h3'
                >
                 SIPALING SOFI
                </Title>
              </Group>
            </Link>
          </Group>
          <MediaQuery
            largerThan='sm'
            styles={{
              display: 'flex'
            }}
          >
            <Group display='none'>
              <ConnectNetwork />
              {
                currentUserAddress && (
                  <Link href={`/profile/${currentUserAddress}`}>
                    <Avatar radius='md'>
                      <Text
                        style={{
                          fontSize: '0.65rem'
                        }}
                      >
                        {currentUserAddress && `${currentUserAddress.substring(0, 3)}...${currentUserAddress.substring(currentUserAddress.length - 2)}`}
                      </Text>
                    </Avatar>
                  </Link>
                )
              }
            </Group>
          </MediaQuery>
          <MediaQuery
            largerThan='sm'
            styles={{
              display: 'none'
            }}
          >
            <Group>
              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
              />
            </Group>
          </MediaQuery>
        </Group>
      </Header>

      <MediaQuery
        largerThan='sm'
        styles={{
          display: 'none'
        }}
      >
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          zIndex={1000000}
          position='right'
        >
          <Center m='sm'>
            {
              currentUserAddress && (
                <Link href={`/profile/${currentUserAddress}`}>
                  <Avatar radius='md'>
                    <Text
                      style={{
                        fontSize: '0.65rem'
                      }}
                    >
                      {currentUserAddress && `${currentUserAddress.substring(0, 3)}...${currentUserAddress.substring(currentUserAddress.length - 2)}`}
                    </Text>
                  </Avatar>
                </Link>
              )
            }
          </Center>
          <Center m='sm'>
            <ConnectNetwork />
          </Center>

        </Drawer>
      </MediaQuery>
    </>
  )
}
