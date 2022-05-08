import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import { Pool } from "../generated/schema";
import { mvDecimals } from "./helpers";

export function feedPlatformPtpRevenue(block: ethereum.Block): BigInt {
  let counter = BigInt.fromI32(0);

  // load pools
  let poolMainDAIe = Pool.load("poolMainDAIe");
  let poolMainUSDC = Pool.load("poolMainUSDC");
  let poolMainUSDCe = Pool.load("poolMainUSDCe");
  let poolMainUSDT = Pool.load("poolMainUSDT");
  let poolMainUSDTe = Pool.load("poolMainUSDTe");
  let poolAltUSDCUST = Pool.load("poolAltUSDCUST");
  let poolAltUSDCMIM = Pool.load("poolAltUSDCMIM");
  let poolAltUSDCFRAX = Pool.load("poolAltUSDCFRAX");
  let poolAlt2AVAX = Pool.load("poolAlt2AVAX");
  // count PTP revenue
  // Platypus main pools
  if (poolMainDAIe) {
    let r = poolMainDAIe.ptpApr.times(poolMainDAIe.tvl);
    counter = counter.plus(r);
  }
  if (poolMainUSDC) {
    let r = poolMainUSDC.ptpApr.times(poolMainUSDC.tvl);
    counter = counter.plus(r);
  }
  if (poolMainUSDCe) {
    let r = poolMainUSDCe.ptpApr.times(poolMainUSDCe.tvl);
    counter = counter.plus(r);
  }
  if (poolMainUSDT) {
    let r = poolMainUSDT.ptpApr.times(poolMainUSDT.tvl);
    counter = counter.plus(r);
  }
  if (poolMainUSDTe) {
    let r = poolMainUSDTe.ptpApr.times(poolMainUSDTe.tvl);
    counter = counter.plus(r);
  }
  // Platypus alt pools
  if (poolAltUSDCUST) {
    let r1 = poolAltUSDCUST.ptpApr1.times(poolAltUSDCUST.tvl1);
    let r2 = poolAltUSDCUST.ptpApr2.times(poolAltUSDCUST.tvl2);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolAltUSDCMIM) {
    let r1 = poolAltUSDCMIM.ptpApr1.times(poolAltUSDCMIM.tvl1);
    let r2 = poolAltUSDCMIM.ptpApr2.times(poolAltUSDCMIM.tvl2);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolAlt2AVAX) {
    let r1 = poolAlt2AVAX.ptpApr1.times(poolAlt2AVAX.tvl1);
    let r2 = poolAlt2AVAX.ptpApr2.times(poolAlt2AVAX.tvl2);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolAltUSDCFRAX) {
    let r1 = poolAltUSDCFRAX.ptpApr1.times(poolAltUSDCFRAX.tvl1);
    let r2 = poolAltUSDCFRAX.ptpApr2.times(poolAltUSDCFRAX.tvl2);
    counter = counter.plus(r1.plus(r2));
  }
  counter = counter.times(BigInt.fromI32(18)).div(BigInt.fromI32(82)); // 18% fee
  counter = mvDecimals(counter, 8);

  return counter;
}
