'use client'

import { Inter } from 'next/font/google'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Container, MantineProvider } from '@mantine/core'
import { Navbar } from '@/components/Navbar'
import { Notifications } from '@mantine/notifications'
import { ScrollToTop } from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })
const customChain = {
  // Required information for connecting to the network
  chainId: 1315925, // Chain ID of the network
  rpc: ["https://rpcevm.dymension.sipalingtestnet.com/"], // Array of RPC URLs to use

  // Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "SIPALING TESTNET",
    symbol: "SPT",
  },
  shortName: "SPT", // Display value shown in the wallet UI
  slug: "SPT", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "SPT", // Name of the network
  name: "SIPALING TESTNET", // Name of the network
  image: "https://i.imgur.com/pKqKnNd.png" // URL of the image

};


export default function RootLayout ({ children }) {
  return (
    <html>
      <head>
        <title>kit-t's social media</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='description' content="Submission for StackUp's Social Media dapp bounty" />
      </head>
      <body className={inter.className}>
        <ThirdwebProvider
          clientId="148761a18cbd109a38a8071a43a9fccc"
          activeChain={customChain}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
              globalStyles: (theme) => ({
                a: {
                  textDecoration: 'none !important',
                  color: 'inherit !important'
                },

                '.button': {
                  background: '#feb48c !important',
                  color: 'white !important',
                  ':disabled': {
                    background: '#feb48c !important',
                    color: '#B8B8B8 !important'
                  }
                }
              })
            }}
          >
            <Notifications />
            <Container size='65rem' px='s'>
              <Navbar />
              {children}
            </Container>
            <ScrollToTop />
          </MantineProvider>
        </ThirdwebProvider>
      </body>
    </html>
  )
}
