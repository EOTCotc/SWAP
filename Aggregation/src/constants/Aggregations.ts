import Cherryswap from '../assets/images/swapLogo/Cherryswap.svg'
interface CONTRACT {
  [key: string]: {
    name?: string
    FACTORY: string
    ROUTER: string
    INIT_CODE_HASH: string
    Icon: string
  }
}

export const BSC_AGGREGATION: CONTRACT = {
  Pancake: {
    FACTORY: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    ROUTER: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    INIT_CODE_HASH: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    Icon: require('../assets/images/swapLogo/pancake.png')
  },
  Suhsi: {
    FACTORY: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    name: 'Eotcswap V2',
    FACTORY: '0x00877DA81120D37629F1eBce1A4cB8432bBD3788',
    ROUTER: '0xFC4B23ee03cb2947bF063d0CdcF21e25F23aa58D',
    INIT_CODE_HASH: '0x831202ecdb0b250291d1a60e015ef7606497321b8272abf8e3b438cdca2695e6',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const POLYGON_AGGREGATION: CONTRACT = {
  QuickSwap: {
    FACTORY: '0x5757371414417b8c6caad45baef941abc7d3ab32',
    ROUTER: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
    INIT_CODE_HASH: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    Icon: require('../assets/images/swapLogo/quickswap.png')
  },
  Suhsi: {
    FACTORY: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    name: 'Eotcswap V2',
    FACTORY: '0x015151d9779c07A8E5039F02d6a23186EA4876Bb',
    ROUTER: '0xa47c718E7e3405a852C3759224F8edA88E20018B',
    INIT_CODE_HASH: '0x8f5b0de3ff77e3f4d6539cd371233f258e01de85ec54335eee38954af1d8bec3',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const MAINNET_AGGREGATION: CONTRACT = {
  Uniswap: {
    FACTORY: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    INIT_CODE_HASH: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    Icon: require('../assets/images/swapLogo/Uniswap.png')
  },
  Suhsi: {
    FACTORY: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    FACTORY: '0x73857Fa9a849Cd6DC8387C37f54Ad0F56B575eA2',
    ROUTER: '0xbD537A5afBB63295F1cab9A7A670415e153a91B9',
    INIT_CODE_HASH: '0xa9fbfced95fed0f4cbe56a6f056f7f895c31bee594b6a273f043d2ae917102e3',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const OKE_AGGREGATION: CONTRACT = {
  Pancake: {
    FACTORY: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    ROUTER: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    INIT_CODE_HASH: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    Icon: require('../assets/images/swapLogo/pancake.png')
  },
  Suhsi: {
    FACTORY: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    name: 'Eotcswap V2',
    FACTORY: '0x0f298F5dAF0fE2C4817C6F51CA7Cd56aaD308a05',
    ROUTER: '0x77958baf64Eb730b9C2CC18c1c66c69d42A45f7A',
    INIT_CODE_HASH: '0x831202ecdb0b250291d1a60e015ef7606497321b8272abf8e3b438cdca2695e6',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  CherrySwap: {
    FACTORY: '0x709102921812b3276a65092fe79edfc76c4d4afe',
    ROUTER: '0x865bfde337C8aFBffF144Ff4C29f9404EBb22b15',
    INIT_CODE_HASH: '0xe3ae0327539fda6ee87492b9ce166b7419808c231acd1fe54dd3fbf7754704f5',
    Icon: Cherryswap
  }
}
export const HUIBO_AGGREGATION: CONTRACT = {
  Pancake: {
    FACTORY: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    ROUTER: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    INIT_CODE_HASH: '0x00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    Icon: require('../assets/images/swapLogo/pancake.png')
  },
  Suhsi: {
    FACTORY: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    name: 'Eotcswap V2',
    FACTORY: '0x70dD64b802230d583938c6944F06D17c39d60fA9',
    ROUTER: '0x8582A7396C55D006a8F7b8bC553E63e26A8d5E9a',
    INIT_CODE_HASH: '0x831202ecdb0b250291d1a60e015ef7606497321b8272abf8e3b438cdca2695e6',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0xb0b670fc1F7724119963018DB0BfA86aDb22d941',
    ROUTER: '0x0f1c2d1fdd202768a4bda7a38eb0377bd58d278e',
    INIT_CODE_HASH: '0x2ad889f82040abccb2649ea6a874796c1601fb67f91a747a80e08860c73ddf24',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const OPTIMISM_AGGREGATION: CONTRACT = {
  Uniswap: {
    FACTORY: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    INIT_CODE_HASH: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    Icon: require('../assets/images/swapLogo/Uniswap.png')
  },
  Suhsi: {
    FACTORY: '0xc35dadb65012ec5796536bd9864ed8773abc74c4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    FACTORY: '0x73857Fa9a849Cd6DC8387C37f54Ad0F56B575eA2',
    ROUTER: '0xbD537A5afBB63295F1cab9A7A670415e153a91B9',
    INIT_CODE_HASH: '0xa9fbfced95fed0f4cbe56a6f056f7f895c31bee594b6a273f043d2ae917102e3',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const GNOSIS_AGGREGATION: CONTRACT = {
  Uniswap: {
    FACTORY: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    INIT_CODE_HASH: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    Icon: require('../assets/images/swapLogo/Uniswap.png')
  },
  Suhsi: {
    FACTORY: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    FACTORY: '0x73857Fa9a849Cd6DC8387C37f54Ad0F56B575eA2',
    ROUTER: '0xbD537A5afBB63295F1cab9A7A670415e153a91B9',
    INIT_CODE_HASH: '0xa9fbfced95fed0f4cbe56a6f056f7f895c31bee594b6a273f043d2ae917102e3',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const AVALANCHE_AGGREGATION: CONTRACT = {
  Uniswap: {
    FACTORY: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    INIT_CODE_HASH: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    Icon: require('../assets/images/swapLogo/Uniswap.png')
  },
  Suhsi: {
    FACTORY: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    FACTORY: '0x73857Fa9a849Cd6DC8387C37f54Ad0F56B575eA2',
    ROUTER: '0xbD537A5afBB63295F1cab9A7A670415e153a91B9',
    INIT_CODE_HASH: '0xa9fbfced95fed0f4cbe56a6f056f7f895c31bee594b6a273f043d2ae917102e3',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
export const FANTOM_AGGREGATION: CONTRACT = {
  Uniswap: {
    FACTORY: '0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f',
    ROUTER: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    INIT_CODE_HASH: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
    Icon: require('../assets/images/swapLogo/Uniswap.png')
  },
  Suhsi: {
    FACTORY: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    ROUTER: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
    INIT_CODE_HASH: '0xe18a34eb0e04b04f7a0ac29a6e80748dca96319b42c54d679cb821dca90c6303',
    Icon: require('../assets/images/swapLogo/sushi.png')
  },
  EOTC: {
    FACTORY: '0x73857Fa9a849Cd6DC8387C37f54Ad0F56B575eA2',
    ROUTER: '0xbD537A5afBB63295F1cab9A7A670415e153a91B9',
    INIT_CODE_HASH: '0xa9fbfced95fed0f4cbe56a6f056f7f895c31bee594b6a273f043d2ae917102e3',
    Icon: require('../assets/images/eotc.png')
  },
  Mdex: {
    FACTORY: '0x3CD1C46068dAEa5Ebb0d3f55F6915B10648062B8',
    ROUTER: '0x0384E9ad329396C3A6A401243Ca71633B2bC4333',
    INIT_CODE_HASH: '0x0d994d996174b05cfc7bed897dc1b20b4c458fc8d64fe98bc78b3c64a6b4d093',
    Icon: require('../assets/images/swapLogo/mdex.png')
  },
  Julswap: {
    FACTORY: '0x553990F2CBA90272390f62C5BDb1681fFc899675',
    ROUTER: '0xbd67d157502A23309Db761c41965600c2Ec788b2',
    INIT_CODE_HASH: '0xb1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    Icon: require('../assets/images/swapLogo/Jul.png')
  },
  BakerySwap: {
    FACTORY: '0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7',
    ROUTER: '0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F',
    INIT_CODE_HASH: '0xe2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    Icon: require('../assets/images/swapLogo/Bakery.png')
  },
  ApeSwap: {
    FACTORY: '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    ROUTER: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
    INIT_CODE_HASH: '0xf4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    Icon: require('../assets/images/swapLogo/Ape.png')
  },
  BabySwap: {
    FACTORY: '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    ROUTER: '0x8317c460C22A9958c27b4B6403b98d2Ef4E2ad32',
    INIT_CODE_HASH: '0x48c8bec5512d397a5d512fbb7d83d515e7b6d91e9838730bd1aa1b16575da7f5',
    Icon: require('../assets/images/swapLogo/baby.png')
  }
}
