'use client'

import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Container, MantineProvider } from '@mantine/core'
import { Navbar } from '@/components/Navbar'
import { Notifications } from '@mantine/notifications'
import { ScrollToTop } from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })
const customChain = {
  // Required information for connecting to the network
  chainId: 4338147, // Chain ID of the network
  rpc: ["https://evm-kynhub.kynraze.com/"], // Array of RPC URLs to use

  // Information for adding the network to your wallet (how it will appear for first time users) === \\
  // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
  nativeCurrency: {
    decimals: 18,
    name: "Kynraze",
    symbol: "KYN",
  },
  shortName: "KYN", // Display value shown in the wallet UI
  slug: "KYN", // Display value shown in the wallet UI
  testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
  chain: "KYN", // Name of the network
  name: "Kynraze", // Name of the network
  image: "https://i.imgur.com/lORcFGY.png" // URL of the image
};

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulasikan waktu loading dengan setTimeout
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 50)

    // Membersihkan timeout jika komponen unmount
    return () => clearTimeout(timeout)
  }, [])

  return (
    <html>
      <head>
        <title> Kynraze Social </title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='description' content="SocialFi" />
        <link rel="icon" type="image/png" href="https://i.imgur.com/lORcFGY.png" />
      </head>
      <body className={inter.className}>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <div>Loading...</div>
          </div>
        ) : (
          // Tampilkan konten setelah loading selesai
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
        )}
      </body>
    </html>
  )
}