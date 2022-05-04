import { Address } from "@graphprotocol/graph-ts";

class schema {
  // feed price
  ORACLE_AVAX: Address;
  ORACLE_sAVAX: Address;
  ORACLE_JOE: Address;
  ORACLE_USDC: Address;
  ORACLE_USDT: Address;
  ORACLE_UST: Address;
  ORACLE_DAI: Address;
  ORACLE_MIM: Address;
  ORACLE_FRAX: Address;
  TJ_LP_PTP: Address;
  TJ_LP_xPTP: Address;
  TJ_LP_VTX: Address;
  // feed tvl
  MASTER_CHEF_VTX: Address;
  MASTER_CHEF_JOE: Address;
  MAIN_STAKING_JOE: Address;
  LP_STAKED_VTX: Address;
  LP_LOCKED_VTX: Address;
  LP_STAKED_PTP: Address;
  LP_STAKED_JOE: Address;
  LP_VTX_AVAX: Address;
  LP_Pool2_xPTP: Address;
  LP_Main_DAIe: Address;
  LP_Main_USDC: Address;
  LP_Main_USDCe: Address;
  LP_Main_USDT: Address;
  LP_Main_USDTe: Address;
  LP_Alt_USDC_UST: Address;
  LP_Alt_UST_USDC: Address;
  LP_Alt_USDC_MIM: Address;
  LP_Alt_MIM_USDC: Address;
  LP_Alt_USDC_FRAX: Address;
  LP_Alt_FRAX_USDC: Address;
  LP_Alt_AVAX: Address;
  LP_Alt_sAVAX: Address;
  LP_TJ_USDC_AVAX: Address;
  LP_TJ_WETHe_AVAX: Address;
  LP_TJ_USDTe_AVAX: Address;
  LP_TJ_USDCe_AVAX: Address;
  LP_TJ_MIM_AVAX: Address;
  LP_TJ_WBTCe_AVAX: Address;
  LP_TJ_JOE_AVAX: Address;
  LP_TJ_JOE_USDC: Address;
  LP_TJ_2USDC: Address;
  LP_TJ_2USDT: Address;
  LP_TJ_LINKe_AVAX: Address;
  LP_TJ_BNB_AVAX: Address;
  LP_TJ_USDT_AVAX: Address;
}

export const ALL_ADDRESSES: schema = {
  ORACLE_AVAX: Address.fromString("0x0A77230d17318075983913bC2145DB16C7366156"),
  ORACLE_sAVAX: Address.fromString("0x2854Ca10a54800e15A2a25cFa52567166434Ff0a"),
  ORACLE_JOE: Address.fromString("0x02D35d3a8aC3e1626d3eE09A78Dd87286F5E8e3a"),
  ORACLE_USDC: Address.fromString("0xF096872672F44d6EBA71458D74fe67F9a77a23B9"),
  ORACLE_USDT: Address.fromString("0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a"),
  ORACLE_UST: Address.fromString("0xf58B78581c480caFf667C63feDd564eCF01Ef86b"),
  ORACLE_DAI: Address.fromString("0x51D7180edA2260cc4F6e4EebB82FEF5c3c2B8300"),
  ORACLE_MIM: Address.fromString("0x54EdAB30a7134A16a54218AE64C73e1DAf48a8Fb"),
  ORACLE_FRAX: Address.fromString("0xbBa56eF1565354217a3353a466edB82E8F25b08e"),
  TJ_LP_PTP: Address.fromString("0xcdfd91eea657cc2701117fe9711c9a4f61feed23"),
  TJ_LP_xPTP: Address.fromString("0xC4B7121b4FC065dECd26C33FB32e42C543E8850d"),
  TJ_LP_VTX: Address.fromString("0x9EF0C12b787F90F59cBBE0b611B82D30CAB92929"),

  MASTER_CHEF_VTX: Address.fromString("0x423d0fe33031aa4456a17b150804aa57fc157d97"),
  MASTER_CHEF_JOE: Address.fromString("0x4483f0b6e2f5486d06958c20f8c39a7abe87bf8f"),
  MAIN_STAKING_JOE: Address.fromString("0x0e25c07748f727d6cccd7d2711fd7bd13d13422d"),
  LP_STAKED_VTX: Address.fromString("0x5817d4f0b62a59b17f75207da1848c2ce75e7af4"),
  LP_LOCKED_VTX: Address.fromString("0x574679Ec54972cf6d705E0a71467Bb5BB362919D"),
  LP_STAKED_PTP: Address.fromString("0x060556209E507d30f2167a101bFC6D256Ed2f3e1"),
  LP_STAKED_JOE: Address.fromString("0x769bfeb9fAacD6Eb2746979a8dD0b7e9920aC2A4"),
  LP_VTX_AVAX: Address.fromString("0x9EF0C12b787F90F59cBBE0b611B82D30CAB92929"),
  LP_Pool2_xPTP: Address.fromString("0xC4B7121b4FC065dECd26C33FB32e42C543E8850d"),
  LP_Main_DAIe: Address.fromString("0x2FdC25cEc50Dab4E1ECCFa1Be40509ae049cEaE0"),
  LP_Main_USDC: Address.fromString("0x0ADab2F0455987098059Cfc10875C010800c659F"),
  LP_Main_USDCe: Address.fromString("0xc641350D40256120BED47cF0AD24B5ce01D04af3"),
  LP_Main_USDT: Address.fromString("0x3A51459e72e03c8D4213201feE9F5a2300b3D1fF"),
  LP_Main_USDTe: Address.fromString("0xB0e2d7d733e013e9005E1fc3Be70B30c58c7359b"),
  LP_Alt_USDC_UST: Address.fromString("0x48AbadaDCE4BaE4c47F9877D5C08705AD7131A05"),
  LP_Alt_UST_USDC: Address.fromString("0x03fE91A6c7996ED726dAbE386c91027899AeE45F"),
  LP_Alt_USDC_MIM: Address.fromString("0x3f941f31828E251aC24b445c5E318DEB691b5B68"),
  LP_Alt_MIM_USDC: Address.fromString("0x6e3Ce3bCa4a388298FeC0C526Fff7b71A77407Da"),
  LP_Alt_USDC_FRAX: Address.fromString("0x6D46346250A46516c0c1f51709c0330476069b41"),
  LP_Alt_FRAX_USDC: Address.fromString("0x245260481a824A6C0103B0d840EB87B8c6cA0e72"),
  LP_Alt_AVAX: Address.fromString("0x25DD42103b7DA808e68A2bae5e14F48871488a85"),
  LP_Alt_sAVAX: Address.fromString("0x8Aa347D9A2Bb8e32342f50939236251853604C79"),
  LP_TJ_USDC_AVAX: Address.fromString("0xf4003F4efBE8691B60249E6afbD307aBE7758adb"),
  LP_TJ_WETHe_AVAX: Address.fromString("0xFE15c2695F1F920da45C30AAE47d11dE51007AF9"),
  LP_TJ_USDTe_AVAX: Address.fromString("0xeD8CBD9F0cE3C6986b22002F03c6475CEb7a6256"),
  LP_TJ_USDCe_AVAX: Address.fromString("0xA389f9430876455C36478DeEa9769B7Ca4E3DDB1"),
  LP_TJ_MIM_AVAX: Address.fromString("0x781655d802670bbA3c89aeBaaEa59D3182fD755D"),
  LP_TJ_WBTCe_AVAX: Address.fromString("0xd5a37dC5C9A396A03dd1136Fc76A1a02B1c88Ffa"),
  LP_TJ_JOE_AVAX: Address.fromString("0x454E67025631C065d3cFAD6d71E6892f74487a15"),
  LP_TJ_JOE_USDC: Address.fromString("0x3bc40d4307cD946157447CD55d70ee7495bA6140"),
  LP_TJ_2USDC: Address.fromString("0x2A8A315e82F85D1f0658C5D66A452Bbdd9356783"),
  LP_TJ_2USDT: Address.fromString("0x74B651Eff97871eA99fcc14423E611d85Eb0EA93"),
  LP_TJ_LINKe_AVAX: Address.fromString("0x6F3a0C89f611Ef5dC9d96650324ac633D02265D3"),
  LP_TJ_BNB_AVAX: Address.fromString("0xeb8eB6300c53C3AddBb7382Ff6c6FbC4165B0742"),
  LP_TJ_USDT_AVAX: Address.fromString("0xbb4646a764358ee93c2a9c4a147d5aDEd527ab73"),
};