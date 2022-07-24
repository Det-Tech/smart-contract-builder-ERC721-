var ethereum_address = require('ethereum-address');

const validator = (val, settings) => {
  if (!Array.isArray(settings))
    return true;
  
  for (let i = 0; i < settings.length; i++) {
    let setting = settings[i];

    if (setting === "required") {
      if (!val) return "This answer is required.";
    }
    else if (setting === "number") {
      if (isNaN(val)) return "Number is required for this answer.";
    }
    else if (setting === "address") {
      if (!ethereum_address.isAddress(val)) return "Address is required for this answer.";
    }
    else if (setting === "yes/no") {
      val = val.toUpperCase();
      if(!(val == 'YES' || val == 'Y' || val == 'N' || val == 'NO')) 
        return 'Yes/No is required for this answer.';
    }
  }
    
  return true;
}


const question = [
  {
    name: "projectName",
    type: 'input',
    message: "Please enter NFT project name",    
    validate: (val) => validator(val, ["required"])
  },
  {
    name: "totalCollectionSize",
    type: 'input',
    message: "Please enter total collection size",
    validate: (val) => validator(val, ["required", "number"])
  },
  {
    name: "holdersMint",
    type: 'input',
    message: "Please input(Yes/No) for Holders Mint",
    subQuestions: [
      {
        name: "tokenContract",
        type: 'input',
        message: "Please input Token Contract for Holders Mint",
        validate: (val) => validator(val, ["required", "address"])
      },
      {
        name: "holderMintSupply",
        type: 'input',
        message: "Please enter Holder Mint Supply",
        validate: (val) => validator(val, ["required", "number"])
      },
      {
        name: "holdersMintPrice",
        type: 'input',
        message: "Please input for Holder Mint Price",
        validate: (val) => validator(val, ["required", "number"])
      }  
    ],
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "whitelistMint",
    type: 'input',
    message: "Please input(Yes/No) for Whitelist Mint",
    subQuestions: [
      {
        name: "whitelistMintSupply",
        type: 'input',
        message: "Please enter whitelist Mint Supply",
        validate: (val) => validator(val, ["required", "number"])
      },
      {
        name: "whitelistMintPrice",
        type: 'input',
        message: "Please input for whitelist Mint Price",
        validate: (val) => validator(val, ["required", "number"])
      }  
    ],
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "publicMint",
    type: 'input',
    message: "Please input(Yes/No) for Public Mint",
    subQuestions: [
      {
        name: "publicMintSupply",
        type: 'input',
        message: "Please enter whitelist Mint Supply",
        validate: (val) => validator(val, ["required", "number"])
      },
      {
        name: "publicMintPrice",
        type: 'input',
        message: "Please input for whitelist Mint Price",
        validate: (val) => validator(val, ["required", "number"])
      },  
      {
        name: "maxBatchMint",
        type: 'input',
        message: "Please input for BatchMint size",
        validate: (val) => validator(val, ["required", "number"])
      }  
    ],
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "reserveMint",
    type: 'input',
    message: "Please input(Yes/No) for Reserve Mint",
    subQuestions: [
      {
        name: "reservedMintSupply",
        type: 'input',
        message: "Please enter Reserve Mint Supply",
        validate: (val) => validator(val, ["required", "number"])
      }
    ],
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "airdropMint",
    type: 'input',
    message: "Please input(Yes/No) for Airdrop Mint",
    validate: (val) => validator(val, ["yes/no"])
  }, 
  {
    name: "mintPhaseApiSigning",
    type: 'input',
    message: "Please input(Yes/No) in order to use Mint Phase API signing(protection from bot)",
    subQuestions: [
      {
        name: "signerAddress",
        type: 'input',
        message: "Please enter signerAddress",
        validate: (val) => validator(val, ["required", "address"])
      }
    ],
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "withdrawalSplit",
    type: 'input',
    message: "Please input(Yes/No) in order to use Withdrawal split",
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "mintPhaseStateReporting",
    type: 'input',
    message: "Please input(Yes/No) in order to use Mint phase state reporting",
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "mintPhasePause",
    type: 'input',
    message: "Please input(Yes/No) in order to use Mint phase pause",
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "administratorPermissions",
    type: 'input',
    message: "Please input(Yes/No) in order to use Administration permissions",
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "royaltyInterface",
    type: 'input',
    message: "Please input(Yes/No) in order to use Royalty Interface",
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "Burning",
    type: 'input',
    message: "Please input(Yes/No) in order to use Burning",
    validate: (val) => validator(val, ["yes/no"])
  },
  {
    name: "updateBaseURI",
    type: 'input',
    message: "Please input(Yes/No) in order to use update baseURI",
    subQuestions: [
      {
        name: "baseURI",
        type: 'input',
        message: "Please enter baseURI",
        validate: (val) => validator(val, ["required"])
      }
    ],
    validate: (val) => validator(val, ["yes/no"])
  }  
];

module.exports = { question };