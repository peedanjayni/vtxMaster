import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ALL_ADDRESSES } from "./constants";
import {
  fetcchTraderjoePoolsTVL,
  fetchPlatypusPoolsTVL,
  fetchVectorPool2TVL,
  fetchVectorPoolsTVL,
  fetchVtxAPR,
} from "./helpers";
import {
  AllPrice,
  PoolStakedVTX,
  PoolLockedVTX,
  PoolStakedPTP,
  PoolStakedJOE,
  Pool2VTXAVAX,
  Pool2PTP,
  Pool2JOE,
  PoolMainDAIe,
  PoolMainUSDC,
  PoolMainUSDCe,
  PoolMainUSDT,
  PoolMainUSDTe,
  PoolAltUSDCUST,
  PoolAltUSDCMIM,
  PoolAltUSDCFRAX,
  PoolAlt2AVAX,
  PoolBnbAVAX,
  PoolJoeAVAX,
  PoolJoeUSDC,
  PoolLinkeAVAX,
  PoolMimAVAX,
  PoolUsdcAVAX,
  PoolUsdceAVAX,
  Pool2USDC,
  PoolUsdteAVAX,
  PoolUsdtAVAX,
  Pool2USDT,
  PoolWbtceAVAX,
  PoolWetheAVAX,
} from "../generated/schema";
import { masterChefVTX } from "../generated/vtxMaster/masterChefVTX";

export function feedPool(block: ethereum.Block): void {
  // load entities
  let id = block.number.toHex();
  let poolStakedVTX = PoolStakedVTX.load(id) === null ? new PoolStakedVTX(id) : PoolStakedVTX.load(id);
  let poolLockedVTX = PoolLockedVTX.load(id) === null ? new PoolLockedVTX(id) : PoolLockedVTX.load(id);
  let poolStakedPTP = PoolStakedPTP.load(id) === null ? new PoolStakedPTP(id) : PoolStakedPTP.load(id);
  let poolStakedJOE = PoolStakedJOE.load(id) === null ? new PoolStakedJOE(id) : PoolStakedJOE.load(id);
  let pool2VTXAVAX = Pool2VTXAVAX.load(id) === null ? new Pool2VTXAVAX(id) : Pool2VTXAVAX.load(id);
  let pool2PTP = Pool2PTP.load(id) === null ? new Pool2PTP(id) : Pool2PTP.load(id);
  let pool2JOE = Pool2JOE.load(id) === null ? new Pool2JOE(id) : Pool2JOE.load(id);
  let poolMainDAIe = PoolMainDAIe.load(id) === null ? new PoolMainDAIe(id) : PoolMainDAIe.load(id);
  let poolMainUSDC = PoolMainUSDC.load(id) === null ? new PoolMainUSDC(id) : PoolMainUSDC.load(id);
  let poolMainUSDCe = PoolMainUSDCe.load(id) === null ? new PoolMainUSDCe(id) : PoolMainUSDCe.load(id);
  let poolMainUSDT = PoolMainUSDT.load(id) === null ? new PoolMainUSDT(id) : PoolMainUSDT.load(id);
  let poolMainUSDTe = PoolMainUSDTe.load(id) === null ? new PoolMainUSDTe(id) : PoolMainUSDTe.load(id);
  let poolAltUSDCUST = PoolAltUSDCUST.load(id) === null ? new PoolAltUSDCUST(id) : PoolAltUSDCUST.load(id);
  let poolAltUSDCMIM = PoolAltUSDCMIM.load(id) === null ? new PoolAltUSDCMIM(id) : PoolAltUSDCMIM.load(id);
  let poolAltUSDCFRAX = PoolAltUSDCFRAX.load(id) === null ? new PoolAltUSDCFRAX(id) : PoolAltUSDCFRAX.load(id);
  let poolAlt2AVAX = PoolAlt2AVAX.load(id) === null ? new PoolAlt2AVAX(id) : PoolAlt2AVAX.load(id);
  let poolBnbAVAX = PoolBnbAVAX.load(id) === null ? new PoolBnbAVAX(id) : PoolBnbAVAX.load(id);
  let poolJoeAVAX = PoolJoeAVAX.load(id) === null ? new PoolJoeAVAX(id) : PoolJoeAVAX.load(id);
  let poolJoeUSDC = PoolJoeUSDC.load(id) === null ? new PoolJoeUSDC(id) : PoolJoeUSDC.load(id);
  let poolLinkeAVAX = PoolLinkeAVAX.load(id) === null ? new PoolLinkeAVAX(id) : PoolLinkeAVAX.load(id);
  let poolMimAVAX = PoolMimAVAX.load(id) === null ? new PoolMimAVAX(id) : PoolMimAVAX.load(id);
  let poolUsdcAVAX = PoolUsdcAVAX.load(id) === null ? new PoolUsdcAVAX(id) : PoolUsdcAVAX.load(id);
  let poolUsdceAVAX = PoolUsdceAVAX.load(id) === null ? new PoolUsdceAVAX(id) : PoolUsdceAVAX.load(id);
  let pool2USDC = Pool2USDC.load(id) === null ? new Pool2USDC(id) : Pool2USDC.load(id);
  let poolUsdteAVAX = PoolUsdteAVAX.load(id) === null ? new PoolUsdteAVAX(id) : PoolUsdteAVAX.load(id);
  let poolUsdtAVAX = PoolUsdtAVAX.load(id) === null ? new PoolUsdtAVAX(id) : PoolUsdtAVAX.load(id);
  let pool2USDT = Pool2USDT.load(id) === null ? new Pool2USDT(id) : Pool2USDT.load(id);
  let poolWbtceAVAX = PoolWbtceAVAX.load(id) === null ? new PoolWbtceAVAX(id) : PoolWbtceAVAX.load(id);
  let poolWetheAVAX = PoolWetheAVAX.load(id) === null ? new PoolWetheAVAX(id) : PoolWetheAVAX.load(id);
  let priceFeed = AllPrice.load(id) === null ? new AllPrice(id) : AllPrice.load(id);
  let blockNumber = block.number;
  if (priceFeed) {
    let blockTimestamp = block.timestamp;
    let priceAVAX = priceFeed.priceAVAX;
    let pricePTP = priceFeed.pricePTP;
    let pricexPTP = priceFeed.pricexPTP;
    let priceJOE = priceFeed.priceJOE;
    let priceVTX = priceFeed.priceVTX;
    let priceDAI = priceFeed.priceDAI;
    let priceUSDC = priceFeed.priceUSDC;
    let priceUSDT = priceFeed.priceUSDT;
    let priceUST = priceFeed.priceUST;
    let priceMIM = priceFeed.priceMIM;
    let priceFRAX = priceFeed.priceFRAX;
    let priceSAVAX = priceFeed.priceSAVAX;
    // Allocations
    let vtxPerSec = masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).vtxPerSec();
    let totalPoint = masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).totalAllocPoint();
    // vector Pools
    if (poolStakedVTX) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_STAKED_VTX, priceVTX, 18); // 26 -> 8 staked VTX;
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_STAKED_VTX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolStakedVTX.blockNumber = blockNumber;
      poolStakedVTX.blockTimestamp = blockTimestamp;
      poolStakedVTX.tvl = tvl;
      poolStakedVTX.vtxApr = vtxApr;
      // xxx
      poolStakedVTX.save();
    }
    if (poolLockedVTX) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_LOCKED_VTX, priceVTX, 18); // 26 -> 8 locked VTX
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_LOCKED_VTX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolLockedVTX.blockNumber = blockNumber;
      poolLockedVTX.blockTimestamp = blockTimestamp;
      poolLockedVTX.tvl = tvl;
      poolLockedVTX.vtxApr = vtxApr;
      // xxx
      poolLockedVTX.save();
    }
    if (poolStakedPTP) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_STAKED_PTP, pricexPTP, 18); // 26 -> 8 staked PTP
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_STAKED_PTP, priceVTX, tvl, vtxPerSec, totalPoint);
      poolStakedPTP.blockNumber = blockNumber;
      poolStakedPTP.blockTimestamp = blockTimestamp;
      poolStakedPTP.tvl = tvl;
      poolStakedPTP.vtxApr = vtxApr;
      // xxx
      poolStakedPTP.save();
    }
    if (poolStakedJOE) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_STAKED_JOE, priceJOE, 18); // 26 -> 8 staked JOE
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_STAKED_JOE, priceVTX, tvl, vtxPerSec, totalPoint);
      poolStakedJOE.blockNumber = blockNumber;
      poolStakedJOE.blockTimestamp = blockTimestamp;
      poolStakedJOE.tvl = tvl;
      poolStakedJOE.vtxApr = vtxApr;
      // xxx
      poolStakedJOE.save();
    }
    if (pool2VTXAVAX) {
      let tvl = fetchVectorPool2TVL(ALL_ADDRESSES.LP_VTX_AVAX, priceVTX, 0, 18); // 26 -> 8 Pool2 VTX-AVAX
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_VTX_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      pool2VTXAVAX.blockNumber = blockNumber;
      pool2VTXAVAX.blockTimestamp = blockTimestamp;
      pool2VTXAVAX.tvl = tvl;
      pool2VTXAVAX.vtxApr = vtxApr;
      // xxx
      pool2VTXAVAX.save();
    }
    if (pool2PTP) {
      let tvl = fetchVectorPool2TVL(ALL_ADDRESSES.LP_Pool2_xPTP, pricePTP, 1, 18); // 26 -> 8 Pool2 xPTP-PTP
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Pool2_xPTP, priceVTX, tvl, vtxPerSec, totalPoint);
      pool2PTP.blockNumber = blockNumber;
      pool2PTP.blockTimestamp = blockTimestamp;
      pool2PTP.tvl = tvl;
      pool2PTP.vtxApr = vtxApr;
      // xxx
      pool2PTP.save();
    }

    // Platypus Main Pools
    if (poolMainDAIe) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_DAIe, priceDAI, 18); // 26 -> 8 Main pool DAI.e
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_DAIe, priceVTX, tvl, vtxPerSec, totalPoint);
      poolMainDAIe.blockNumber = blockNumber;
      poolMainDAIe.blockTimestamp = blockTimestamp;
      poolMainDAIe.tvl = tvl;
      poolMainDAIe.vtxApr = vtxApr;
      // xxx
      poolMainDAIe.save();
    }
    if (poolMainUSDC) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDC, priceUSDC, 6); // 14 -> 8 Main pool USDC
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDC, priceVTX, tvl, vtxPerSec, totalPoint);
      poolMainUSDC.blockNumber = blockNumber;
      poolMainUSDC.blockTimestamp = blockTimestamp;
      poolMainUSDC.tvl = tvl;
      poolMainUSDC.vtxApr = vtxApr;
      // xxx
      poolMainUSDC.save();
    }
    if (poolMainUSDCe) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDCe, priceUSDC, 6); // 14 -> 8 Main pool USDC.e
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDCe, priceVTX, tvl, vtxPerSec, totalPoint);
      poolMainUSDCe.blockNumber = blockNumber;
      poolMainUSDCe.blockTimestamp = blockTimestamp;
      poolMainUSDCe.tvl = tvl;
      poolMainUSDCe.vtxApr = vtxApr;
      // xxx
      poolMainUSDCe.save();
    }
    if (poolMainUSDT) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDT, priceUSDT, 6); // 14 -> 8 Main pool USDT
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDT, priceVTX, tvl, vtxPerSec, totalPoint);
      poolMainUSDT.blockNumber = blockNumber;
      poolMainUSDT.blockTimestamp = blockTimestamp;
      poolMainUSDT.tvl = tvl;
      poolMainUSDT.vtxApr = vtxApr;
      // xxx
      poolMainUSDT.save();
    }
    if (poolMainUSDTe) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDTe, priceUSDT, 6); // 14 -> 8 Main pool USDT.e
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDTe, priceVTX, tvl, vtxPerSec, totalPoint);
      poolMainUSDTe.blockNumber = blockNumber;
      poolMainUSDTe.blockTimestamp = blockTimestamp;
      poolMainUSDTe.tvl = tvl;
      poolMainUSDTe.vtxApr = vtxApr;
      // xxx
      poolMainUSDTe.save();
    }
    if (poolAltUSDCUST) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_USDC_UST, priceUSDC, 6); // 14 -> 8 Alt Pool USDC in USDC_UST pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_UST_USDC, priceUST, 6); // 14 -> 8 Alt Pool UST in USDC_UST pool
      let vtxApr1 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_USDC_UST, priceVTX, tvl1, vtxPerSec, totalPoint);
      let vtxApr2 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_UST_USDC, priceVTX, tvl2, vtxPerSec, totalPoint);
      poolAltUSDCUST.blockNumber = blockNumber;
      poolAltUSDCUST.blockTimestamp = blockTimestamp;
      poolAltUSDCUST.tvl1 = tvl1;
      poolAltUSDCUST.tvl2 = tvl2;
      poolAltUSDCUST.vtxApr1 = vtxApr1;
      poolAltUSDCUST.vtxApr2 = vtxApr2;
      // xxx
      poolAltUSDCUST.save();
    }
    if (poolAltUSDCMIM) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_USDC_MIM, priceUSDC, 6); // 14 -> 8 Alt Pool USDC in USDC_MIM pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_MIM_USDC, priceMIM, 18); // 26 -> 8 Alt Pool MIM in USDC_MIM pool
      let vtxApr1 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_USDC_MIM, priceVTX, tvl1, vtxPerSec, totalPoint);
      let vtxApr2 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_MIM_USDC, priceVTX, tvl2, vtxPerSec, totalPoint);
      poolAltUSDCMIM.blockNumber = blockNumber;
      poolAltUSDCMIM.blockTimestamp = blockTimestamp;
      poolAltUSDCMIM.tvl1 = tvl1;
      poolAltUSDCMIM.tvl2 = tvl2;
      poolAltUSDCMIM.vtxApr1 = vtxApr1;
      poolAltUSDCMIM.vtxApr2 = vtxApr2;
      // xxx
      poolAltUSDCMIM.save();
    }
    if (poolAltUSDCFRAX) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_USDC_FRAX, priceUSDC, 6); // 14 -> 8 Alt Pool USDC in USDC_FRAX pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_FRAX_USDC, priceFRAX, 18); // 26 -> 8 Alt Pool FRAX in USDC_FRAX pool
      let vtxApr1 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_USDC_FRAX, priceVTX, tvl1, vtxPerSec, totalPoint);
      let vtxApr2 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_FRAX_USDC, priceVTX, tvl2, vtxPerSec, totalPoint);
      poolAltUSDCFRAX.blockNumber = blockNumber;
      poolAltUSDCFRAX.blockTimestamp = blockTimestamp;
      poolAltUSDCFRAX.tvl1 = tvl1;
      poolAltUSDCFRAX.tvl2 = tvl2;
      poolAltUSDCFRAX.vtxApr1 = vtxApr1;
      poolAltUSDCFRAX.vtxApr2 = vtxApr2;
      // xxx
      poolAltUSDCFRAX.save();
    }
    if (poolAlt2AVAX) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_AVAX, priceAVAX, 18); // 26 -> 8 Alt Pool AVAX in AVAX_sAVAX pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_sAVAX, priceSAVAX, 18); // 26 -> 8 Alt Pool sAVAX in AVAX_sAVAX pool
      let vtxApr1 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_AVAX, priceVTX, tvl1, vtxPerSec, totalPoint);
      let vtxApr2 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_sAVAX, priceVTX, tvl2, vtxPerSec, totalPoint);
      poolAlt2AVAX.blockNumber = blockNumber;
      poolAlt2AVAX.blockTimestamp = blockTimestamp;
      poolAlt2AVAX.tvl1 = tvl1;
      poolAlt2AVAX.tvl2 = tvl2;
      poolAlt2AVAX.vtxApr1 = vtxApr1;
      poolAlt2AVAX.vtxApr2 = vtxApr2;
      // xxx
      poolAlt2AVAX.save();
    }
    // Traderjoe Pools for 0 to 12
    // pool 0 USDC_AVAX
    if (poolUsdcAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDC_AVAX, 0, 0, priceAVAX, 18); // LP value0 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_USDC_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolUsdcAVAX.blockNumber = blockNumber;
      poolUsdcAVAX.blockTimestamp = blockTimestamp;
      poolUsdcAVAX.tvl = tvl;
      poolUsdcAVAX.vtxApr = vtxApr;
      // xxx
      poolUsdcAVAX.save();
    }
    // pool 1 WETH.e_AVAX
    if (poolWetheAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_WETHe_AVAX, 1, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_WETHe_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolWetheAVAX.blockNumber = blockNumber;
      poolWetheAVAX.blockTimestamp = blockTimestamp;
      poolWetheAVAX.tvl = tvl;
      poolWetheAVAX.vtxApr = vtxApr;
      // xxx
      poolWetheAVAX.save();
    }
    // pool 2 USDT.e_AVAX
    if (poolUsdteAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDTe_AVAX, 2, 0, priceAVAX, 18); // LP value0 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_USDTe_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolUsdteAVAX.blockNumber = blockNumber;
      poolUsdteAVAX.blockTimestamp = blockTimestamp;
      poolUsdteAVAX.tvl = tvl;
      poolUsdteAVAX.vtxApr = vtxApr;
      // xxx
      poolUsdteAVAX.save();
    }
    // pool 3 USDC.e_AVAX
    if (poolUsdceAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDCe_AVAX, 3, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_USDCe_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolUsdceAVAX.blockNumber = blockNumber;
      poolUsdceAVAX.blockTimestamp = blockTimestamp;
      poolUsdceAVAX.tvl = tvl;
      poolUsdceAVAX.vtxApr = vtxApr;
      // xxx
      poolUsdceAVAX.save();
    }
    // pool 4 MIM_AVAX
    if (poolMimAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_MIM_AVAX, 4, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_MIM_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolMimAVAX.blockNumber = blockNumber;
      poolMimAVAX.blockTimestamp = blockTimestamp;
      poolMimAVAX.tvl = tvl;
      poolMimAVAX.vtxApr = vtxApr;
      // xxx
      poolMimAVAX.save();
    }
    // pool 5 WBTC.e_AVAX
    if (poolWbtceAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX, 5, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_WBTCe_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolWbtceAVAX.blockNumber = blockNumber;
      poolWbtceAVAX.blockTimestamp = blockTimestamp;
      poolWbtceAVAX.tvl = tvl;
      poolWbtceAVAX.vtxApr = vtxApr;
      // xxx
      poolWbtceAVAX.save();
    }
    // pool 6 JOE_AVAX
    if (poolJoeAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_JOE_AVAX, 6, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_JOE_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolJoeAVAX.blockNumber = blockNumber;
      poolJoeAVAX.blockTimestamp = blockTimestamp;
      poolJoeAVAX.tvl = tvl;
      poolJoeAVAX.vtxApr = vtxApr;
      // xxx
      poolJoeAVAX.save();
    }
    // pool 7 JOE_USDC
    if (poolJoeUSDC) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_JOE_USDC, 7, 0, priceJOE, 18); // LP value0 for JOE move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_JOE_USDC, priceVTX, tvl, vtxPerSec, totalPoint);
      poolJoeUSDC.blockNumber = blockNumber;
      poolJoeUSDC.blockTimestamp = blockTimestamp;
      poolJoeUSDC.tvl = tvl;
      poolJoeUSDC.vtxApr = vtxApr;
      // xxx
      poolJoeUSDC.save();
    }
    // pool 8 2USDC
    if (pool2USDC) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_2USDC, 8, 1, priceUSDC, 6); // LP value1 for USDC move 6 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_2USDC, priceVTX, tvl, vtxPerSec, totalPoint);
      pool2USDC.blockNumber = blockNumber;
      pool2USDC.blockTimestamp = blockTimestamp;
      pool2USDC.tvl = tvl;
      pool2USDC.vtxApr = vtxApr;
      // xxx
      pool2USDC.save();
    }
    // pool 9 2USDT
    if (pool2USDT) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_2USDT, 9, 0, priceUSDT, 6); // LP value0 for USDT move 6 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_2USDT, priceVTX, tvl, vtxPerSec, totalPoint);
      pool2USDT.blockNumber = blockNumber;
      pool2USDT.blockTimestamp = blockTimestamp;
      pool2USDT.tvl = tvl;
      pool2USDT.vtxApr = vtxApr;
      // xxx
      pool2USDT.save();
    }
    // pool 10 LINK.e_AVAX
    if (poolLinkeAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_LINKe_AVAX, 10, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_LINKe_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolLinkeAVAX.blockNumber = blockNumber;
      poolLinkeAVAX.blockTimestamp = blockTimestamp;
      poolLinkeAVAX.tvl = tvl;
      poolLinkeAVAX.vtxApr = vtxApr;
      // xxx
      poolLinkeAVAX.save();
    }
    // pool 11 BNB_AVAX
    if (poolBnbAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_BNB_AVAX, 11, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_BNB_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolBnbAVAX.blockNumber = blockNumber;
      poolBnbAVAX.blockTimestamp = blockTimestamp;
      poolBnbAVAX.tvl = tvl;
      poolBnbAVAX.vtxApr = vtxApr;
      // xxx
      poolBnbAVAX.save();
    }
    // pool 12 USDt_AVAX
    if (poolUsdtAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDT_AVAX, 12, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_USDT_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      poolUsdtAVAX.blockNumber = blockNumber;
      poolUsdtAVAX.blockTimestamp = blockTimestamp;
      poolUsdtAVAX.tvl = tvl;
      poolUsdtAVAX.vtxApr = vtxApr;
      // xxx
      poolUsdtAVAX.save();
    }
  }
}
