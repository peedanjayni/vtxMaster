import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ALL_ADDRESSES } from "./constants";
import {
  fetcchTraderjoePoolsTVL,
  fetchPTPBonusApr,
  fetchPlatypusPoolsTVL,
  fetchVectorPool2TVL,
  fetchVectorPoolsTVL,
  fetchVtxAPR,
  fetchPTPAPR,
  fetchTJlpApr,
  fetchTJbaseApr,
  fetchTJboostApr,
  addDecimals,
} from "./helpers";
import { Stat, Pool } from "../generated/schema";
import { masterChefVTX } from "../generated/vtxMaster/masterChefVTX";

export function feedPool(block: ethereum.Block): void {
  // load base stats
  let id = block.number.toString();
  let baseStats = Stat.load(id) === null ? new Stat(id) : Stat.load(id);
  let blockNumber = block.number;
  if (baseStats) {
    // stats
    let blockTimestamp = block.timestamp;
    let priceAVAX = baseStats.priceAVAX;
    let pricePTP = baseStats.pricePTP;
    let pricexPTP = baseStats.pricexPTP;
    let priceJOE = baseStats.priceJOE;
    let priceVTX = baseStats.priceVTX;
    let priceDAI = baseStats.priceDAI;
    let priceUSDC = baseStats.priceUSDC;
    let priceUSDT = baseStats.priceUSDT;
    let priceUST = baseStats.priceUST;
    let priceMIM = baseStats.priceMIM;
    let priceFRAX = baseStats.priceFRAX;
    let priceSAVAX = baseStats.priceSAVAX;
    let priceQI = baseStats.priceQI;
    let totalVePTP = baseStats.totalVePTP;
    // load pools
    let poolStakedVTX =
      Pool.load("poolStakedVTX") === null ? new Pool("poolStakedVTX") : Pool.load("poolStakedVTX");
    let poolLockedVTX =
      Pool.load("poolLockedVTX") === null ? new Pool("poolLockedVTX") : Pool.load("poolLockedVTX");
    let poolStakedPTP =
      Pool.load("poolStakedPTP") === null ? new Pool("poolStakedPTP") : Pool.load("poolStakedPTP");
    let poolStakedJOE =
      Pool.load("poolStakedJOE") === null ? new Pool("poolStakedJOE") : Pool.load("poolStakedJOE");
    let pool2VTXAVAX =
      Pool.load("pool2VTXAVAX") === null ? new Pool("pool2VTXAVAX") : Pool.load("pool2VTXAVAX");
    let pool2PTP = Pool.load("pool2PTP") === null ? new Pool("pool2PTP") : Pool.load("pool2PTP");
    let pool2JOE = Pool.load("pool2JOE") === null ? new Pool("pool2JOE") : Pool.load("pool2JOE");
    let poolMainDAIe =
      Pool.load("poolMainDAIe") === null ? new Pool("poolMainDAIe") : Pool.load("poolMainDAIe");
    let poolMainUSDC =
      Pool.load("poolMainUSDC") === null ? new Pool("poolMainUSDC") : Pool.load("poolMainUSDC");
    let poolMainUSDCe =
      Pool.load("poolMainUSDCe") === null ? new Pool("poolMainUSDCe") : Pool.load("poolMainUSDCe");
    let poolMainUSDT =
      Pool.load("poolMainUSDT") === null ? new Pool("poolMainUSDT") : Pool.load("poolMainUSDT");
    let poolMainUSDTe =
      Pool.load("poolMainUSDTe") === null ? new Pool("poolMainUSDTe") : Pool.load("poolMainUSDTe");
    let poolAltUSDCUST =
      Pool.load("poolAltUSDCUST") === null
        ? new Pool("poolAltUSDCUST")
        : Pool.load("poolAltUSDCUST");
    let poolAltUSDCMIM =
      Pool.load("poolAltUSDCMIM") === null
        ? new Pool("poolAltUSDCMIM")
        : Pool.load("poolAltUSDCMIM");
    let poolAltUSDCFRAX =
      Pool.load("poolAltUSDCFRAX") === null
        ? new Pool("poolAltUSDCFRAX")
        : Pool.load("poolAltUSDCFRAX");
    let poolAlt2AVAX =
      Pool.load("poolAlt2AVAX") === null ? new Pool("poolAlt2AVAX") : Pool.load("poolAlt2AVAX");
    let poolBnbAVAX =
      Pool.load("poolBnbAVAX") === null ? new Pool("poolBnbAVAX") : Pool.load("poolBnbAVAX");
    let poolJoeAVAX =
      Pool.load("poolJoeAVAX") === null ? new Pool("poolJoeAVAX") : Pool.load("poolJoeAVAX");
    let poolJoeUSDC =
      Pool.load("poolJoeUSDC") === null ? new Pool("poolJoeUSDC") : Pool.load("poolJoeUSDC");
    let poolLinkeAVAX =
      Pool.load("poolLinkeAVAX") === null ? new Pool("poolLinkeAVAX") : Pool.load("poolLinkeAVAX");
    let poolMimAVAX =
      Pool.load("poolMimAVAX") === null ? new Pool("poolMimAVAX") : Pool.load("poolMimAVAX");
    let poolUsdcAVAX =
      Pool.load("poolUsdcAVAX") === null ? new Pool("poolUsdcAVAX") : Pool.load("poolUsdcAVAX");
    let poolUsdceAVAX =
      Pool.load("poolUsdceAVAX") === null ? new Pool("poolUsdceAVAX") : Pool.load("poolUsdceAVAX");
    let pool2USDC =
      Pool.load("pool2USDC") === null ? new Pool("pool2USDC") : Pool.load("pool2USDC");
    let poolUsdteAVAX =
      Pool.load("poolUsdteAVAX") === null ? new Pool("poolUsdteAVAX") : Pool.load("poolUsdteAVAX");
    let poolUsdtAVAX =
      Pool.load("poolUsdtAVAX") === null ? new Pool("poolUsdtAVAX") : Pool.load("poolUsdtAVAX");
    let pool2USDT =
      Pool.load("pool2USDT") === null ? new Pool("pool2USDT") : Pool.load("pool2USDT");
    let poolWbtceAVAX =
      Pool.load("poolWbtceAVAX") === null ? new Pool("poolWbtceAVAX") : Pool.load("poolWbtceAVAX");
    let poolWetheAVAX =
      Pool.load("poolWetheAVAX") === null ? new Pool("poolWetheAVAX") : Pool.load("poolWetheAVAX");
    // Allocations
    let vtxPerSec = masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).vtxPerSec();
    let totalPoint = masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).totalAllocPoint();
    // vector Pools
    if (poolStakedVTX) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_STAKED_VTX, priceVTX, 18); // 26 -> 8 staked VTX;
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_STAKED_VTX, priceVTX, tvl, vtxPerSec, totalPoint);
      let xptpApr = addDecimals(
        baseStats.platformPtpRevenueAnually.times(BigInt.fromI32(2)).div(BigInt.fromI32(18)),
        8
      ).div(tvl); // 2% out of 18%
      let zjoeApr = addDecimals(
        baseStats.platformJoeRevenueAnually.times(BigInt.fromI32(2)).div(BigInt.fromI32(18)),
        8
      ).div(tvl); // 2% out of 18%
      poolStakedVTX.blockNumber = blockNumber;
      poolStakedVTX.blockTimestamp = blockTimestamp;
      poolStakedVTX.tvl = tvl;
      poolStakedVTX.vtxApr = vtxApr;
      poolStakedVTX.xptpApr = xptpApr;
      poolStakedVTX.zjoeApr = zjoeApr;
      poolStakedVTX.save();
    }
    if (poolLockedVTX) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_LOCKED_VTX, priceVTX, 18); // 26 -> 8 locked VTX
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_LOCKED_VTX, priceVTX, tvl, vtxPerSec, totalPoint);
      let xptpApr = addDecimals(
        baseStats.platformPtpRevenueAnually.times(BigInt.fromI32(6)).div(BigInt.fromI32(18)),
        8
      ).div(tvl); // 6% out of 18%
      let zjoeApr = addDecimals(
        baseStats.platformJoeRevenueAnually.times(BigInt.fromI32(6)).div(BigInt.fromI32(18)),
        8
      ).div(tvl); // 6% out of 18%
      poolLockedVTX.blockNumber = blockNumber;
      poolLockedVTX.blockTimestamp = blockTimestamp;
      poolLockedVTX.tvl = tvl;
      poolLockedVTX.vtxApr = vtxApr;
      poolLockedVTX.xptpApr = xptpApr;
      poolLockedVTX.zjoeApr = zjoeApr;
      poolLockedVTX.save();
    }
    if (poolStakedPTP) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_STAKED_PTP, pricexPTP, 18); // 26 -> 8 staked PTP
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_STAKED_PTP, priceVTX, tvl, vtxPerSec, totalPoint);
      let ptpApr = addDecimals(
        baseStats.platformPtpRevenueAnually.times(BigInt.fromI32(12)).div(BigInt.fromI32(18)),
        8
      ).div(tvl); // 12% out of 18%
      poolStakedPTP.blockNumber = blockNumber;
      poolStakedPTP.blockTimestamp = blockTimestamp;
      poolStakedPTP.tvl = tvl;
      poolStakedPTP.vtxApr = vtxApr;
      poolStakedPTP.ptpApr = ptpApr;
      poolStakedPTP.save();
    }
    if (poolStakedJOE) {
      let tvl = fetchVectorPoolsTVL(ALL_ADDRESSES.LP_STAKED_JOE, priceJOE, 18); // 26 -> 8 staked JOE
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_STAKED_JOE, priceVTX, tvl, vtxPerSec, totalPoint);
      let joeApr = addDecimals(
        baseStats.platformJoeRevenueAnually.times(BigInt.fromI32(12)).div(BigInt.fromI32(18)),
        8
      ).div(tvl); // 12% out of 18%
      poolStakedJOE.blockNumber = blockNumber;
      poolStakedJOE.blockTimestamp = blockTimestamp;
      poolStakedJOE.tvl = tvl;
      poolStakedJOE.vtxApr = vtxApr;
      poolStakedJOE.joeApr = joeApr;
      poolStakedJOE.save();
    }
    if (pool2VTXAVAX) {
      let tvl = fetchVectorPool2TVL(ALL_ADDRESSES.LP_Pool2_VTX, priceVTX, 0, 18); // 26 -> 8 Pool2 VTX-AVAX
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Pool2_VTX, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_Pool2_VTX);
      pool2VTXAVAX.blockNumber = blockNumber;
      pool2VTXAVAX.blockTimestamp = blockTimestamp;
      pool2VTXAVAX.tvl = tvl;
      pool2VTXAVAX.vtxApr = vtxApr;
      pool2VTXAVAX.lpApr = lpApr;
      pool2VTXAVAX.save();
    }
    if (pool2PTP) {
      let tvl = fetchVectorPool2TVL(ALL_ADDRESSES.LP_Pool2_xPTP, pricePTP, 1, 18); // 26 -> 8 Pool2 xPTP-PTP
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Pool2_xPTP, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_Pool2_xPTP);
      pool2PTP.blockNumber = blockNumber;
      pool2PTP.blockTimestamp = blockTimestamp;
      pool2PTP.tvl = tvl;
      pool2PTP.vtxApr = vtxApr;
      pool2PTP.lpApr = lpApr;
      pool2PTP.save();
    }
    if (pool2JOE) {
      let tvl = fetchVectorPool2TVL(ALL_ADDRESSES.LP_Pool2_zJOE, priceJOE, 0, 18); // 26 -> 8 Pool2 xPTP-PTP
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Pool2_zJOE, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_Pool2_zJOE);
      pool2JOE.blockNumber = blockNumber;
      pool2JOE.blockTimestamp = blockTimestamp;
      pool2JOE.tvl = tvl;
      pool2JOE.vtxApr = vtxApr;
      pool2JOE.lpApr = lpApr;
      pool2JOE.save();
    }
    // Platypus Main Pools
    // USDT.e#0 USDC.e#1 DAI.e#2 USDC#4 USDT#5 FRAX#6 USDC_FRAX#7 UST#8 USDC_UST#9 MIM#10 USDC_MIM#11 AVAX#12 sAVAX#13
    if (poolMainDAIe) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_DAIe, priceDAI, 18); // 26 -> 8 Main pool DAI.e
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_DAIe, priceVTX, tvl, vtxPerSec, totalPoint);
      let ptpApr = fetchPTPAPR(2, ALL_ADDRESSES.LP_PTP_DAIe, pricePTP, totalVePTP, tvl);
      poolMainDAIe.blockNumber = blockNumber;
      poolMainDAIe.blockTimestamp = blockTimestamp;
      poolMainDAIe.tvl = tvl;
      poolMainDAIe.vtxApr = vtxApr;
      poolMainDAIe.ptpApr = ptpApr;
      poolMainDAIe.save();
    }
    if (poolMainUSDC) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDC, priceUSDC, 6); // 14 -> 8 Main pool USDC
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDC, priceVTX, tvl, vtxPerSec, totalPoint);
      let ptpApr = fetchPTPAPR(4, ALL_ADDRESSES.LP_PTP_USDC, pricePTP, totalVePTP, tvl);
      poolMainUSDC.blockNumber = blockNumber;
      poolMainUSDC.blockTimestamp = blockTimestamp;
      poolMainUSDC.tvl = tvl;
      poolMainUSDC.vtxApr = vtxApr;
      poolMainUSDC.ptpApr = ptpApr;
      poolMainUSDC.save();
    }
    if (poolMainUSDCe) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDCe, priceUSDC, 6); // 14 -> 8 Main pool USDC.e
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDCe, priceVTX, tvl, vtxPerSec, totalPoint);
      let ptpApr = fetchPTPAPR(1, ALL_ADDRESSES.LP_PTP_USDCe, pricePTP, totalVePTP, tvl);
      poolMainUSDCe.blockNumber = blockNumber;
      poolMainUSDCe.blockTimestamp = blockTimestamp;
      poolMainUSDCe.tvl = tvl;
      poolMainUSDCe.vtxApr = vtxApr;
      poolMainUSDCe.ptpApr = ptpApr;
      poolMainUSDCe.save();
    }
    if (poolMainUSDT) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDT, priceUSDT, 6); // 14 -> 8 Main pool USDT
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDT, priceVTX, tvl, vtxPerSec, totalPoint);
      let ptpApr = fetchPTPAPR(5, ALL_ADDRESSES.LP_PTP_USDt, pricePTP, totalVePTP, tvl);
      poolMainUSDT.blockNumber = blockNumber;
      poolMainUSDT.blockTimestamp = blockTimestamp;
      poolMainUSDT.tvl = tvl;
      poolMainUSDT.vtxApr = vtxApr;
      poolMainUSDT.ptpApr = ptpApr;
      poolMainUSDT.save();
    }
    if (poolMainUSDTe) {
      let tvl = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Main_USDTe, priceUSDT, 6); // 14 -> 8 Main pool USDT.e
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.LP_Main_USDTe, priceVTX, tvl, vtxPerSec, totalPoint);
      let ptpApr = fetchPTPAPR(0, ALL_ADDRESSES.LP_PTP_USDTe, pricePTP, totalVePTP, tvl);
      poolMainUSDTe.blockNumber = blockNumber;
      poolMainUSDTe.blockTimestamp = blockTimestamp;
      poolMainUSDTe.tvl = tvl;
      poolMainUSDTe.vtxApr = vtxApr;
      poolMainUSDTe.ptpApr = ptpApr;
      poolMainUSDTe.save();
    }
    if (poolAltUSDCUST) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_USDC_UST, priceUSDC, 6); // 14 -> 8 Alt Pool USDC in USDC_UST pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_UST_USDC, priceUST, 6); // 14 -> 8 Alt Pool UST in USDC_UST pool
      let vtxApr1 = fetchVtxAPR(
        ALL_ADDRESSES.LP_Alt_USDC_UST,
        priceVTX,
        tvl1,
        vtxPerSec,
        totalPoint
      );
      let vtxApr2 = fetchVtxAPR(
        ALL_ADDRESSES.LP_Alt_UST_USDC,
        priceVTX,
        tvl2,
        vtxPerSec,
        totalPoint
      );
      let ustApr1 = fetchPTPBonusApr("USDC", priceUST, priceUSDC);
      let ustApr2 = fetchPTPBonusApr("UST", priceUST, priceUST);
      let ptpApr1 = fetchPTPAPR(9, ALL_ADDRESSES.LP_PTP_USDC_UST, pricePTP, totalVePTP, tvl1);
      let ptpApr2 = fetchPTPAPR(8, ALL_ADDRESSES.LP_PTP_UST_UST, pricePTP, totalVePTP, tvl2);
      poolAltUSDCUST.blockNumber = blockNumber;
      poolAltUSDCUST.blockTimestamp = blockTimestamp;
      poolAltUSDCUST.tvl1 = tvl1;
      poolAltUSDCUST.tvl2 = tvl2;
      poolAltUSDCUST.vtxApr1 = vtxApr1;
      poolAltUSDCUST.vtxApr2 = vtxApr2;
      poolAltUSDCUST.ustApr1 = ustApr1;
      poolAltUSDCUST.ustApr2 = ustApr2;
      poolAltUSDCUST.ptpApr1 = ptpApr1;
      poolAltUSDCUST.ptpApr2 = ptpApr2;
      poolAltUSDCUST.save();
    }
    if (poolAltUSDCMIM) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_USDC_MIM, priceUSDC, 6); // 14 -> 8 Alt Pool USDC in USDC_MIM pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_MIM_USDC, priceMIM, 18); // 26 -> 8 Alt Pool MIM in USDC_MIM pool
      let vtxApr1 = fetchVtxAPR(
        ALL_ADDRESSES.LP_Alt_USDC_MIM,
        priceVTX,
        tvl1,
        vtxPerSec,
        totalPoint
      );
      let vtxApr2 = fetchVtxAPR(
        ALL_ADDRESSES.LP_Alt_MIM_USDC,
        priceVTX,
        tvl2,
        vtxPerSec,
        totalPoint
      );
      let ptpApr1 = fetchPTPAPR(11, ALL_ADDRESSES.LP_PTP_USDC_MIM, pricePTP, totalVePTP, tvl1);
      let ptpApr2 = fetchPTPAPR(10, ALL_ADDRESSES.LP_PTP_MIM_MIM, pricePTP, totalVePTP, tvl2);
      poolAltUSDCMIM.blockNumber = blockNumber;
      poolAltUSDCMIM.blockNumber = blockNumber;
      poolAltUSDCMIM.blockTimestamp = blockTimestamp;
      poolAltUSDCMIM.tvl1 = tvl1;
      poolAltUSDCMIM.tvl2 = tvl2;
      poolAltUSDCMIM.vtxApr1 = vtxApr1;
      poolAltUSDCMIM.vtxApr2 = vtxApr2;
      poolAltUSDCMIM.ptpApr1 = ptpApr1;
      poolAltUSDCMIM.ptpApr2 = ptpApr2;
      poolAltUSDCMIM.save();
    }
    if (poolAltUSDCFRAX) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_USDC_FRAX, priceUSDC, 6); // 14 -> 8 Alt Pool USDC in USDC_FRAX pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_FRAX_USDC, priceFRAX, 18); // 26 -> 8 Alt Pool FRAX in USDC_FRAX pool
      let vtxApr1 = fetchVtxAPR(
        ALL_ADDRESSES.LP_Alt_USDC_FRAX,
        priceVTX,
        tvl1,
        vtxPerSec,
        totalPoint
      );
      let vtxApr2 = fetchVtxAPR(
        ALL_ADDRESSES.LP_Alt_FRAX_USDC,
        priceVTX,
        tvl2,
        vtxPerSec,
        totalPoint
      );
      let ptpApr1 = fetchPTPAPR(7, ALL_ADDRESSES.LP_PTP_USDC_FRAX, pricePTP, totalVePTP, tvl1);
      let ptpApr2 = fetchPTPAPR(6, ALL_ADDRESSES.LP_PTP_FRAX_FRAX, pricePTP, totalVePTP, tvl2);
      poolAltUSDCFRAX.blockNumber = blockNumber;
      poolAltUSDCFRAX.blockTimestamp = blockTimestamp;
      poolAltUSDCFRAX.tvl1 = tvl1;
      poolAltUSDCFRAX.tvl2 = tvl2;
      poolAltUSDCFRAX.vtxApr1 = vtxApr1;
      poolAltUSDCFRAX.vtxApr2 = vtxApr2;
      poolAltUSDCFRAX.ptpApr1 = ptpApr1;
      poolAltUSDCFRAX.ptpApr2 = ptpApr2;
      poolAltUSDCFRAX.save();
    }
    if (poolAlt2AVAX) {
      let tvl1 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_AVAX, priceAVAX, 18); // 26 -> 8 Alt Pool AVAX in AVAX_sAVAX pool
      let tvl2 = fetchPlatypusPoolsTVL(ALL_ADDRESSES.LP_Alt_sAVAX, priceSAVAX, 18); // 26 -> 8 Alt Pool sAVAX in AVAX_sAVAX pool
      let vtxApr1 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_AVAX, priceVTX, tvl1, vtxPerSec, totalPoint);
      let vtxApr2 = fetchVtxAPR(ALL_ADDRESSES.LP_Alt_sAVAX, priceVTX, tvl2, vtxPerSec, totalPoint);
      let ptpApr1 = fetchPTPAPR(12, ALL_ADDRESSES.LP_PTP_AVAX_AVAX, pricePTP, totalVePTP, tvl1);
      let ptpApr2 = fetchPTPAPR(13, ALL_ADDRESSES.LP_PTP_SAVAX_AVAX, pricePTP, totalVePTP, tvl2);
      let qiApr1 = fetchPTPBonusApr("AVAX", priceQI, priceAVAX);
      let qiApr2 = fetchPTPBonusApr("sAVAX", priceQI, priceSAVAX);
      poolAlt2AVAX.blockNumber = blockNumber;
      poolAlt2AVAX.blockTimestamp = blockTimestamp;
      poolAlt2AVAX.tvl1 = tvl1;
      poolAlt2AVAX.tvl2 = tvl2;
      poolAlt2AVAX.vtxApr1 = vtxApr1;
      poolAlt2AVAX.vtxApr2 = vtxApr2;
      poolAlt2AVAX.ptpApr1 = ptpApr1;
      poolAlt2AVAX.ptpApr2 = ptpApr2;
      poolAlt2AVAX.qiApr1 = qiApr1;
      poolAlt2AVAX.qiApr2 = qiApr2;
      poolAlt2AVAX.save();
    }
    // Traderjoe Pools for 0 to 12
    // pool 0 USDC_AVAX
    if (poolUsdcAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDC_AVAX, 0, 0, priceAVAX, 18); // LP value0 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(
        ALL_ADDRESSES.VLP_TJ_USDC_AVAX,
        priceVTX,
        tvl,
        vtxPerSec,
        totalPoint
      );
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_USDC_AVAX);
      let baseApr = fetchTJbaseApr(0, priceJOE, tvl);
      let boostApr = fetchTJboostApr(0, priceJOE, tvl);
      poolUsdcAVAX.blockNumber = blockNumber;
      poolUsdcAVAX.blockTimestamp = blockTimestamp;
      poolUsdcAVAX.tvl = tvl;
      poolUsdcAVAX.vtxApr = vtxApr;
      poolUsdcAVAX.lpApr = lpApr;
      poolUsdcAVAX.baseApr = baseApr;
      poolUsdcAVAX.boostApr = boostApr;
      poolUsdcAVAX.save();
    }
    // pool 1 WETH.e_AVAX
    if (poolWetheAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_WETHe_AVAX, 1, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(
        ALL_ADDRESSES.VLP_TJ_WETHe_AVAX,
        priceVTX,
        tvl,
        vtxPerSec,
        totalPoint
      );
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_WETHe_AVAX);
      let baseApr = fetchTJbaseApr(1, priceJOE, tvl);
      let boostApr = fetchTJboostApr(1, priceJOE, tvl);
      poolWetheAVAX.blockNumber = blockNumber;
      poolWetheAVAX.blockTimestamp = blockTimestamp;
      poolWetheAVAX.tvl = tvl;
      poolWetheAVAX.vtxApr = vtxApr;
      poolWetheAVAX.lpApr = lpApr;
      poolWetheAVAX.baseApr = baseApr;
      poolWetheAVAX.boostApr = boostApr;
      poolWetheAVAX.save();
    }
    // pool 2 USDT.e_AVAX
    if (poolUsdteAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDTe_AVAX, 2, 0, priceAVAX, 18); // LP value0 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(
        ALL_ADDRESSES.VLP_TJ_USDTe_AVAX,
        priceVTX,
        tvl,
        vtxPerSec,
        totalPoint
      );
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_USDTe_AVAX);
      let baseApr = fetchTJbaseApr(2, priceJOE, tvl);
      let boostApr = fetchTJboostApr(2, priceJOE, tvl);
      poolUsdteAVAX.blockNumber = blockNumber;
      poolUsdteAVAX.blockTimestamp = blockTimestamp;
      poolUsdteAVAX.tvl = tvl;
      poolUsdteAVAX.vtxApr = vtxApr;
      poolUsdteAVAX.lpApr = lpApr;
      poolUsdteAVAX.baseApr = baseApr;
      poolUsdteAVAX.boostApr = boostApr;
      poolUsdteAVAX.save();
    }
    // pool 3 USDC.e_AVAX
    if (poolUsdceAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDCe_AVAX, 3, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(
        ALL_ADDRESSES.VLP_TJ_USDCe_AVAX,
        priceVTX,
        tvl,
        vtxPerSec,
        totalPoint
      );
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_USDCe_AVAX);
      let baseApr = fetchTJbaseApr(3, priceJOE, tvl);
      let boostApr = fetchTJboostApr(3, priceJOE, tvl);
      poolUsdceAVAX.blockNumber = blockNumber;
      poolUsdceAVAX.blockTimestamp = blockTimestamp;
      poolUsdceAVAX.tvl = tvl;
      poolUsdceAVAX.vtxApr = vtxApr;
      poolUsdceAVAX.lpApr = lpApr;
      poolUsdceAVAX.baseApr = baseApr;
      poolUsdceAVAX.boostApr = boostApr;
      poolUsdceAVAX.save();
    }
    // pool 4 MIM_AVAX
    if (poolMimAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_MIM_AVAX, 4, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_MIM_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_MIM_AVAX);
      let baseApr = fetchTJbaseApr(4, priceJOE, tvl);
      let boostApr = fetchTJboostApr(4, priceJOE, tvl);
      poolMimAVAX.blockNumber = blockNumber;
      poolMimAVAX.blockTimestamp = blockTimestamp;
      poolMimAVAX.tvl = tvl;
      poolMimAVAX.vtxApr = vtxApr;
      poolMimAVAX.lpApr = lpApr;
      poolMimAVAX.baseApr = baseApr;
      poolMimAVAX.boostApr = boostApr;
      poolMimAVAX.save();
    }
    // pool 5 WBTC.e_AVAX
    if (poolWbtceAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX, 5, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(
        ALL_ADDRESSES.VLP_TJ_WBTCe_AVAX,
        priceVTX,
        tvl,
        vtxPerSec,
        totalPoint
      );
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX);
      let baseApr = fetchTJbaseApr(5, priceJOE, tvl);
      let boostApr = fetchTJboostApr(5, priceJOE, tvl);
      poolWbtceAVAX.blockNumber = blockNumber;
      poolWbtceAVAX.blockTimestamp = blockTimestamp;
      poolWbtceAVAX.tvl = tvl;
      poolWbtceAVAX.vtxApr = vtxApr;
      poolWbtceAVAX.lpApr = lpApr;
      poolWbtceAVAX.baseApr = baseApr;
      poolWbtceAVAX.boostApr = boostApr;
      poolWbtceAVAX.save();
    }
    // pool 6 JOE_AVAX
    if (poolJoeAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_JOE_AVAX, 6, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_JOE_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_JOE_AVAX);
      let baseApr = fetchTJbaseApr(6, priceJOE, tvl);
      let boostApr = fetchTJboostApr(6, priceJOE, tvl);
      poolJoeAVAX.blockNumber = blockNumber;
      poolJoeAVAX.blockTimestamp = blockTimestamp;
      poolJoeAVAX.tvl = tvl;
      poolJoeAVAX.vtxApr = vtxApr;
      poolJoeAVAX.lpApr = lpApr;
      poolJoeAVAX.baseApr = baseApr;
      poolJoeAVAX.boostApr = boostApr;
      poolJoeAVAX.save();
    }
    // pool 7 JOE_USDC
    if (poolJoeUSDC) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_JOE_USDC, 7, 0, priceJOE, 18); // LP value0 for JOE move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_JOE_USDC, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_JOE_USDC);
      let baseApr = fetchTJbaseApr(7, priceJOE, tvl);
      let boostApr = fetchTJboostApr(7, priceJOE, tvl);
      poolJoeUSDC.blockNumber = blockNumber;
      poolJoeUSDC.blockTimestamp = blockTimestamp;
      poolJoeUSDC.tvl = tvl;
      poolJoeUSDC.vtxApr = vtxApr;
      poolJoeUSDC.lpApr = lpApr;
      poolJoeUSDC.baseApr = baseApr;
      poolJoeUSDC.boostApr = boostApr;
      poolJoeUSDC.save();
    }
    // pool 8 2USDC
    if (pool2USDC) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_2USDC, 8, 1, priceUSDC, 6); // LP value1 for USDC move 6 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_2USDC, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_2USDC);
      let baseApr = fetchTJbaseApr(8, priceJOE, tvl);
      let boostApr = fetchTJboostApr(8, priceJOE, tvl);
      pool2USDC.blockNumber = blockNumber;
      pool2USDC.blockTimestamp = blockTimestamp;
      pool2USDC.tvl = tvl;
      pool2USDC.vtxApr = vtxApr;
      pool2USDC.lpApr = lpApr;
      pool2USDC.baseApr = baseApr;
      pool2USDC.boostApr = boostApr;
      pool2USDC.save();
    }
    // pool 9 2USDT
    if (pool2USDT) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_2USDT, 9, 0, priceUSDT, 6); // LP value0 for USDT move 6 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_2USDT, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_2USDT);
      let baseApr = fetchTJbaseApr(9, priceJOE, tvl);
      let boostApr = fetchTJboostApr(9, priceJOE, tvl);
      pool2USDT.blockNumber = blockNumber;
      pool2USDT.blockTimestamp = blockTimestamp;
      pool2USDT.tvl = tvl;
      pool2USDT.vtxApr = vtxApr;
      pool2USDT.lpApr = lpApr;
      pool2USDT.baseApr = baseApr;
      pool2USDT.boostApr = boostApr;
      pool2USDT.save();
    }
    // pool 10 LINK.e_AVAX
    if (poolLinkeAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_LINKe_AVAX, 10, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(
        ALL_ADDRESSES.VLP_TJ_LINKe_AVAX,
        priceVTX,
        tvl,
        vtxPerSec,
        totalPoint
      );
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_LINKe_AVAX);
      let baseApr = fetchTJbaseApr(10, priceJOE, tvl);
      let boostApr = fetchTJboostApr(10, priceJOE, tvl);
      poolLinkeAVAX.blockNumber = blockNumber;
      poolLinkeAVAX.blockTimestamp = blockTimestamp;
      poolLinkeAVAX.tvl = tvl;
      poolLinkeAVAX.vtxApr = vtxApr;
      poolLinkeAVAX.lpApr = lpApr;
      poolLinkeAVAX.baseApr = baseApr;
      poolLinkeAVAX.boostApr = boostApr;
      poolLinkeAVAX.save();
    }
    // pool 11 BNB_AVAX
    if (poolBnbAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_BNB_AVAX, 11, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(ALL_ADDRESSES.VLP_TJ_BNB_AVAX, priceVTX, tvl, vtxPerSec, totalPoint);
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_BNB_AVAX);
      let baseApr = fetchTJbaseApr(11, priceJOE, tvl);
      let boostApr = fetchTJboostApr(11, priceJOE, tvl);
      poolBnbAVAX.blockNumber = blockNumber;
      poolBnbAVAX.blockTimestamp = blockTimestamp;
      poolBnbAVAX.tvl = tvl;
      poolBnbAVAX.vtxApr = vtxApr;
      poolBnbAVAX.lpApr = lpApr;
      poolBnbAVAX.baseApr = baseApr;
      poolBnbAVAX.boostApr = boostApr;
      poolBnbAVAX.save();
    }
    // pool 12 USDt_AVAX
    if (poolUsdtAVAX) {
      let tvl = fetcchTraderjoePoolsTVL(ALL_ADDRESSES.LP_TJ_USDT_AVAX, 12, 1, priceAVAX, 18); // LP value1 for AVAX move 18 decimals
      let vtxApr = fetchVtxAPR(
        ALL_ADDRESSES.VLP_TJ_USDT_AVAX,
        priceVTX,
        tvl,
        vtxPerSec,
        totalPoint
      );
      let lpApr = fetchTJlpApr(ALL_ADDRESSES.LP_TJ_USDT_AVAX);
      let baseApr = fetchTJbaseApr(11, priceJOE, tvl);
      let boostApr = fetchTJboostApr(11, priceJOE, tvl);
      poolUsdtAVAX.blockNumber = blockNumber;
      poolUsdtAVAX.blockTimestamp = blockTimestamp;
      poolUsdtAVAX.tvl = tvl;
      poolUsdtAVAX.vtxApr = vtxApr;
      poolUsdtAVAX.lpApr = lpApr;
      poolUsdtAVAX.baseApr = baseApr;
      poolUsdtAVAX.boostApr = boostApr;
      poolUsdtAVAX.save();
    }
  }
}
