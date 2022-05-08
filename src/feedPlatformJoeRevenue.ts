import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import { Pool } from "../generated/schema";
import { mvDecimals } from "./helpers";
export function feedPlatformJoeRevenue(block: ethereum.Block): BigInt {
  let counter = BigInt.fromI32(0);

  // load pools
  let poolBnbAVAX = Pool.load("poolBnbAVAX");
  let poolJoeAVAX = Pool.load("poolJoeAVAX");
  let poolJoeUSDC = Pool.load("poolJoeUSDC");
  let poolLinkeAVAX = Pool.load("poolLinkeAVAX");
  let poolMimAVAX = Pool.load("poolMimAVAX");
  let poolUsdcAVAX = Pool.load("poolUsdcAVAX");
  let poolUsdceAVAX = Pool.load("poolUsdceAVAX");
  let pool2USDC = Pool.load("pool2USDC");
  let poolUsdteAVAX = Pool.load("poolUsdteAVAX");
  let poolUsdtAVAX = Pool.load("poolUsdtAVAX");
  let pool2USDT = Pool.load("pool2USDT");
  let poolWbtceAVAX = Pool.load("poolWbtceAVAX");
  let poolWetheAVAX = Pool.load("poolWetheAVAX");
  // count JOE revenue
  if (poolBnbAVAX) {
    let r1 = poolBnbAVAX.baseApr.times(poolBnbAVAX.tvl);
    let r2 = poolBnbAVAX.boostApr.times(poolBnbAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolJoeAVAX) {
    let r1 = poolJoeAVAX.baseApr.times(poolJoeAVAX.tvl);
    let r2 = poolJoeAVAX.boostApr.times(poolJoeAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolJoeUSDC) {
    let r1 = poolJoeUSDC.baseApr.times(poolJoeUSDC.tvl);
    let r2 = poolJoeUSDC.boostApr.times(poolJoeUSDC.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolLinkeAVAX) {
    let r1 = poolLinkeAVAX.baseApr.times(poolLinkeAVAX.tvl);
    let r2 = poolLinkeAVAX.boostApr.times(poolLinkeAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolMimAVAX) {
    let r1 = poolMimAVAX.baseApr.times(poolMimAVAX.tvl);
    let r2 = poolMimAVAX.boostApr.times(poolMimAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolUsdcAVAX) {
    let r1 = poolUsdcAVAX.baseApr.times(poolUsdcAVAX.tvl);
    let r2 = poolUsdcAVAX.boostApr.times(poolUsdcAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolUsdceAVAX) {
    let r1 = poolUsdceAVAX.baseApr.times(poolUsdceAVAX.tvl);
    let r2 = poolUsdceAVAX.boostApr.times(poolUsdceAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (pool2USDC) {
    let r1 = pool2USDC.baseApr.times(pool2USDC.tvl);
    let r2 = pool2USDC.boostApr.times(pool2USDC.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolUsdteAVAX) {
    let r1 = poolUsdteAVAX.baseApr.times(poolUsdteAVAX.tvl);
    let r2 = poolUsdteAVAX.boostApr.times(poolUsdteAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolUsdtAVAX) {
    let r1 = poolUsdtAVAX.baseApr.times(poolUsdtAVAX.tvl);
    let r2 = poolUsdtAVAX.boostApr.times(poolUsdtAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (pool2USDT) {
    let r1 = pool2USDT.baseApr.times(pool2USDT.tvl);
    let r2 = pool2USDT.boostApr.times(pool2USDT.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolWbtceAVAX) {
    let r1 = poolWbtceAVAX.baseApr.times(poolWbtceAVAX.tvl);
    let r2 = poolWbtceAVAX.boostApr.times(poolWbtceAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  if (poolWetheAVAX) {
    let r1 = poolWetheAVAX.baseApr.times(poolWetheAVAX.tvl);
    let r2 = poolWetheAVAX.boostApr.times(poolWetheAVAX.tvl);
    counter = counter.plus(r1.plus(r2));
  }
  counter = counter.times(BigInt.fromI32(18)).div(BigInt.fromI32(82)); // 18% fee
  counter = mvDecimals(counter, 8);

  return counter;
}
