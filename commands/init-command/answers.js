const {
  ERC721AGiveawayMintable, ERC721AHoldersMintable, ERC721APublicMintable, ERC721AWhitelistMintable,
  ERC721AReservedMintable, ERC721ABaseURI, ERC721ABurnable, ERC721ASizeable, ERC721AMintPausable, ERC721ARoyalty,
  AdminPermissionable, Signable, WithdrawalSplittable
} = require('./extensions');

exports.processAnswers = async(answers) => {

   
    let projectName = answers[0].projectName;
    let totalCollectionSize = answers[1].totalCollectionSize;
    let holdersMint = answers[2].holdersMint;
    let whitelistMint = answers[3].whitelistMint;
    let publicMint = answers[4].publicMint;
    let reserveMint = answers[5].reserveMint;
    let airdropMint = answers[6].airdropMint;
    let mintPhaseApiSigning = answers[7].mintPhaseApiSigning;
    let withdrawalSplit = answers[8].withdrawalSplit;
    let mintPhaseStateReporting = answers[9].mintPhaseStateReporting;
    let mintPhasePause = answers[10].mintPhasePause;
    let administratorPermissions = answers[11].administratorPermissions;
    let royaltyInterface = answers[12].royaltyInterface;
    let Burning = answers[13].Burning;
    let updateBaseURI = answers[14].updateBaseURI;

    projectName =  projectName.charAt(0).toUpperCase() + projectName.slice(1)

    const fileName = `${projectName}.sol`;
    var parentcontractBody = '';
    var contractBody = '';
    var contractHeader = `// SPDX-License-Identifier: MIT \npragma solidity ^0.8.4; \n\nimport ${ERC721ASizeable}`;
    var constructorArgument = `    constructor( uint256 _maxSupply,`;
    var deployConstructorArgument = ` ${totalCollectionSize},`;
    var parentConstructorName = `        ERC721ASizeable(_maxSupply)\n`;

    if (holdersMint.toUpperCase() == 'YES' || holdersMint.toUpperCase() == 'Y'){

      contractHeader += `\nimport ${ERC721AHoldersMintable}`;
      parentcontractBody += 'ERC721AHoldersMintable, ';
      constructorArgument += ` address _tokenContract, uint256 _holderMintSupply, uint256 _holdersMintPrice,`;
      parentConstructorName += `        ERC721AHoldersMintable(_tokenContract, _holderMintSupply, _holdersMintPrice)\n`;
      deployConstructorArgument += `'${answers[2].subAnwers['tokenContract']}', ${answers[2].subAnwers['holderMintSupply']}, ${answers[2].subAnwers['holdersMintPrice']},`;
    }
    if (whitelistMint.toUpperCase() == 'YES' || whitelistMint.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721AWhitelistMintable}`;
      parentcontractBody += 'ERC721AWhitelistMintable, ';
      constructorArgument += ` uint256 _whitelistMintSupply, uint256 _whitelistMintPrice,`;
      parentConstructorName += `        ERC721AWhitelistMintable(_whitelistMintSupply, _whitelistMintPrice)\n`;
      deployConstructorArgument += `${answers[3].subAnwers['whitelistMintSupply']}, ${answers[3].subAnwers['whitelistMintPrice']},`;
    }
    if (publicMint.toUpperCase() == 'YES' || publicMint.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721APublicMintable}`;
      parentcontractBody += 'ERC721APublicMintable, ';
      constructorArgument += ` uint256 _publicMintSupply,  uint256 _publicMintPrice,  uint256 _maxBatchMint,`;
      parentConstructorName += `        ERC721APublicMintable(_publicMintSupply, _publicMintPrice, _maxBatchMint)\n`;
      deployConstructorArgument += `${answers[4].subAnwers['publicMintSupply']}, ${answers[4].subAnwers['publicMintPrice']}, ${answers[4].subAnwers['maxBatchMint']},`;
    }
    if (reserveMint.toUpperCase() == 'YES' || reserveMint.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721AReservedMintable}`;
      parentcontractBody += 'ERC721AReservedMintable, ';
      constructorArgument += ` uint256 _reservedMintSupply,`;
      parentConstructorName += `        ERC721AReservedMintable(_reservedMintSupply)\n`;
      deployConstructorArgument += `${answers[5].subAnwers['reservedMintSupply']},`;  
    }
    if (airdropMint.toUpperCase() == 'YES' || airdropMint.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721AGiveawayMintable}`;
      parentcontractBody += 'ERC721AGiveawayMintable, ';
    }
    if (mintPhaseApiSigning.toUpperCase() == 'YES' || mintPhaseApiSigning.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${Signable}`;
      parentcontractBody += 'Signable, ';
      constructorArgument += ` address _signer,`;
      parentConstructorName += `        Signable(_signer)\n`;
      deployConstructorArgument += `${answers[7].subAnwers['signerAddress']},`;
    }
    if (withdrawalSplit.toUpperCase() == 'YES' || withdrawalSplit.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${WithdrawalSplittable}`;
      parentcontractBody += 'WithdrawalSplittable, ';
    }
    if (mintPhaseStateReporting.toUpperCase() == 'YES' || mintPhaseStateReporting.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721AMintPausable}`;
      parentcontractBody += 'ERC721AMintPausable, ';
    }
    if (mintPhasePause.toUpperCase() == 'YES' || mintPhasePause.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721AMintPausable}`;
      parentcontractBody += 'ERC721AMintPausable, ';
    }
    if (administratorPermissions.toUpperCase() == 'YES' || administratorPermissions.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${AdminPermissionable}`;
      parentcontractBody += 'AdminPermissionable, ';
    }
    if (royaltyInterface.toUpperCase() == 'YES' || royaltyInterface.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721ARoyalty}`;
      parentcontractBody += 'ERC721ARoyalty, ';
    }
    if (Burning.toUpperCase() == 'YES' || Burning.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721ABurnable}`;
      parentcontractBody += 'ERC721ABurnable, ';
    }
    if (updateBaseURI.toUpperCase() == 'YES' || updateBaseURI.toUpperCase() == 'Y'){
      contractHeader += `\nimport ${ERC721ABaseURI}`;
      parentcontractBody += 'ERC721ABaseURI, ';
      constructorArgument += ` string memory _baseURI,`;
      parentConstructorName += `        ERC721ABaseURI(_baseURI)\n`;
      deployConstructorArgument += `'${answers[14].subAnwers['baseURI']}',`;
    }

    if(constructorArgument.charAt(constructorArgument.length-1) == ','){
      constructorArgument= constructorArgument.slice(0, -1);
    }

    if(deployConstructorArgument.charAt(deployConstructorArgument.length-1) == ','){
      deployConstructorArgument= deployConstructorArgument.slice(0, -1);
    }

    parentcontractBody= parentcontractBody.slice(0, -2);

    contractBody = `\ncontract ${projectName} is ${parentcontractBody}\n{\n`;

    contractBody += constructorArgument + ") \n";
    contractBody += parentConstructorName + "    {  \n\n\n    } \n";
    
    contractBody = contractBody + "\n}";

    var totalContent = contractHeader + "\n" + contractBody;
    
 
    return {fileName, projectName, deployConstructorArgument, totalContent};
} 