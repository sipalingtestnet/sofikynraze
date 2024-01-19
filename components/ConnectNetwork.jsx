import { useEffect } from 'react';
import {
  useNetworkMismatch,
  ConnectWallet,
  useAddress,
  useSwitchChain
} from '@thirdweb-dev/react';

export const ConnectNetwork = () => {
  // Get connected wallet address
  const address = useAddress();
  // Switch to desired chain
  const switchChain = useSwitchChain();
  // Detect if user is connected to the wrong network
  const isMismatched = useNetworkMismatch();

  useEffect(() => {
    // Check if the user is connected to the wrong network
    if (isMismatched) {
      // Prompt their wallet to switch networks
      switchChain(4338147); // Chain ID for sipaling testnet
    }
  }, [address]); // This above block gets run every time "address" changes (e.g. when the user connects)

  return (
    <ConnectWallet
      theme='dark'
      btnTitle='Connect Wallet'
      switchToActiveChain
      style={{
        background: 'transparent',
        border: 'none',
        color: '#c1c2c5'
      }}
    />
  );
};