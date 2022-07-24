#!/usr/bin/env node
const { showTable } = require(`${__dirname}/../util/showTable`)

var templateList = {
    "app":"https://gitlab.com/massless.io/smart-contract-library",
    "Holoders_Mint":"ERC721AHoldersMintable",
    "Whitelist_Mint":"ERC721AWhitelistMintable",
    "Public_Mint":"ERC721APublicMintable",
    "Reserve_Mint":"ERC721AReservedMintable",
    "Airdrop_Mint":"ERC721AGiveawayMintable",
    "Mint_phase_API_signing":"Signable",
    "Withdrawal_split":"WithdrawalSplittable",
    "Mint_phase_pause":"ERC721AMintPausable",
    "Administrator_permissions":"AdminPermissionable",
    "Royalty_Interface":"ERC721ARoyalty",
    "Burning":"ERC721ABurnable",
    "Update_baseURI":"ERC721ABaseURI",
}

showTable(templateList)
