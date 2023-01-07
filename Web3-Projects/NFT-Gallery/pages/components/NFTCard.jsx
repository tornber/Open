import React from 'react'

const NFTCard = ({nft}) => {
  return (
    <div className='w-1/4 flex flex-col'>
        <div className='rounded-md'>
            <img className='object-cover w-full h-128 rounded-t-md' src={nft?.media[0].gateway} />
        </div>
        <div className='flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110'>
            <div className=''>
                <h2 className='text-xl text-gray-800'>{nft?.title}</h2>
                <p className='text-gray-600'>{nft?.id.tokenId.length > 10 ? nft.id.tokenId.substr(0,4) + "..." + nft.id.tokenId.substr(nft.id.tokenId.length - 4)
                    : nft.id.tokenId.length > 5 ? nft.id.tokenId.substr(0,4) + "..." : nft.id.tokenId }</p>
            </div>
            <div className='flex-grow mt-2'>
                <p className='text-gray-600'>{nft?.description.substr(0,150)}</p>
            </div>
            <div className='flex justify-center my-1'>
                <a className='w-1/2 text-center bg-blue-500 px-4 rounded-m text-white cursor-pointer py-2' href={`https://etherscan.io/token/${nft?.contract?.address}`} target="_blank" >View on etherscan</a>
            </div>
        </div>
    </div>
  )
}

export default NFTCard