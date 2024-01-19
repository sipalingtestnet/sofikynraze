import socialMediaArtifact from '../artifacts/SocialMedia.json'
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react'

export const useSocialMediaContract = () => {
  return useContract(process.env.NEXT_PUBLIC_SOCIAL_MEDIA_ADDRESS, socialMediaArtifact.abi)
}

export const useSocialMediaContractRead = (...params) => {
  const { contract } = useSocialMediaContract()

  return useContractRead(contract, ...params)
}

export const useSocialMediaContractWrite = (...params) => {
  const { contract } = useSocialMediaContract()

  return useContractWrite(contract, ...params)
}
