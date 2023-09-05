export const communityEditionManagerAddress = "0xA4e21d02d309e76d3A119bB08e601aA451F20C5E";
export const communityEditionManagerAbi = [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "_erc1155Impl",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "_tokenUri",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "_maxSupply",
						"type": "uint256"
					},
					{
						"internalType": "contract IMinter1155",
						"name": "_minter",
						"type": "address"
					},
					{
						"internalType": "uint64",
						"name": "_saleStart",
						"type": "uint64"
					},
					{
						"internalType": "uint64",
						"name": "_saleEnd",
						"type": "uint64"
					},
					{
						"internalType": "uint64",
						"name": "_maxPerWallet",
						"type": "uint64"
					},
					{
						"internalType": "uint96",
						"name": "_tokenPrice",
						"type": "uint96"
					},
					{
						"internalType": "address",
						"name": "_rewardsRecipient",
						"type": "address"
					}
				],
				"name": "createToken",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
		] as const;
