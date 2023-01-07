import Head from 'next/head'
import Image from 'next/image'
import {useState} from 'react'
import NFTCard from './components/NFTCard'

const Home = () => {

  const [wallet,setWalletAddress] = useState("")
  const [collection,setCollectionAddress] = useState("")
  const [NFTS,setNFTS] = useState([])
  const [fetchForCollection,setFetchForCollection] = useState(false)

  const fetchNfts = async () => {
    let nfts
    const apiKey = "mPRjdJvyppi9knZ9kMm0fXrd8egdSg7K"
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`
    let fetchURL = `${baseURL}?owner=${wallet}`
    const requestOptions = {    
      method: 'GET',
    };


    if(!collection.length) {
      nfts = await fetch(fetchURL,requestOptions).then(res => res.json())
    } else {
      fetchURL += `&contractAddresses%5B%5D=${collection}`
      nfts= await fetch(fetchURL,requestOptions).then(res => res.json())
    }

    if(nfts) {
      console.log(nfts)
      setNFTS(nfts.ownedNfts) 
    }

  }

  const fetchNftsForCollection = async() => {
    const apiKey = "mPRjdJvyppi9knZ9kMm0fXrd8egdSg7K"
    const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection`
    const fetchURl = `${baseURL}?contractAddress=${collection}&withMetadata=true`
    const nfts = await fetch(fetchURl).then(res => res.json())

    if(nfts) {
      console.log("nfts for collection",nfts)
      setNFTS(nfts.nfts)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className='flex flex-col w-full items-center justify-center gap-y-2'>
        <input disabled={fetchForCollection} className='w-2/5 bg-slate-100 px-2 py-2 text-gray-800 rounded-lg disabled:text-gray-50 disabled:bg-slate-50 focus:outline-blue-300' onChange={(e) => setWalletAddress(e.target.value)} type={"text"} placeholder="Add your wallet address"></input>
        <input className='w-2/5 bg-slate-100 px-2 py-2 text-gray-800 rounded-lg disabled:text-gray-50 disabled:bg-slate-50 focus:outline-blue-300' onChange={(e) => setCollectionAddress(e.target.value)} type={"text"} placeholder="Add your collection address"></input>
        <label className='text-gray-600'>Fetch for collection<input className='ml-2' onChange={(e) => setFetchForCollection(e.target.checked)} type={"checkbox"}></input></label>
        <button className='disabled:bg-slate-500 bg-blue-400 text-white px-4 py-2 w-1/5 mt-3' onClick={() => {
          fetchForCollection ? fetchNftsForCollection() : fetchNfts()
        }}>Let's go!</button>
      </div>
      <div className='flex flex-wrap gap-y-12 gap-x-2 justify-center mt-4 w-5/6'>
        {NFTS.length && NFTS.map(NFT => {
          return (
            <NFTCard key={NFT?.id?.tokenId} nft={NFT}/>
          )
        })}
      </div>
    </div>
  )
}

export default Home
