import { ethereum } from "@graphprotocol/graph-ts";
import { mvDecimals } from "./helpers";
import { Stat } from "../generated/schema";
import { traderjoeLP } from "../generated/vtxMaster/traderjoeLP";
import { oracleFactory } from "../generated/vtxMaster/oracleFactory";
import { vePTP } from "../generated/vtxMaster/vePTP";
import { ALL_ADDRESSES } from "./constants";

// feed price
export function feedPrice(block: ethereum.Block): void {
  // load entity
  let id = block.number.toHex();
  let baseStats = Stat.load(id);
  if (!baseStats) {
    baseStats = new Stat(id);
  }
  let blockNumber = block.number;
  let blockTimestamp = block.timestamp;
  // oracle price feed
  let priceAVAX = oracleFactory.bind(ALL_ADDRESSES.ORACLE_AVAX).latestAnswer(); // AVAX 8
  let priceSAVAX = mvDecimals(oracleFactory.bind(ALL_ADDRESSES.ORACLE_sAVAX).latestAnswer(), 10); // sAVAX 18 -> 8
  let priceJOE = oracleFactory.bind(ALL_ADDRESSES.ORACLE_JOE).latestAnswer(); // JOE 8
  let priceUSDC = oracleFactory.bind(ALL_ADDRESSES.ORACLE_USDC).latestAnswer(); // USDC 8
  let priceUSDT = oracleFactory.bind(ALL_ADDRESSES.ORACLE_USDT).latestAnswer(); // USDT 8
  let priceUST = oracleFactory.bind(ALL_ADDRESSES.ORACLE_UST).latestAnswer(); // UST 8
  let priceDAI = oracleFactory.bind(ALL_ADDRESSES.ORACLE_DAI).latestAnswer(); // DAI 8
  let priceMIM = oracleFactory.bind(ALL_ADDRESSES.ORACLE_MIM).latestAnswer(); // MIM 8
  let priceFRAX = oracleFactory.bind(ALL_ADDRESSES.ORACLE_FRAX).latestAnswer(); // FRAX 8
  let priceQI = oracleFactory.bind(ALL_ADDRESSES.ORACLE_QI).latestAnswer(); // QI 8

  // pricePTP =  reverve1 / reserve0 * priceAVAX traderjoe pair price feed
  let r0 = traderjoeLP.bind(ALL_ADDRESSES.TJ_LP_PTP).getReserves().value0;
  let r1 = traderjoeLP.bind(ALL_ADDRESSES.TJ_LP_PTP).getReserves().value1;
  let pricePTP = r1.times(priceAVAX).div(r0); // PTP 8

  // pricexPTP = reverve1 / reserve0 * pricePTP traderjoe pair price feed
  r0 = traderjoeLP.bind(ALL_ADDRESSES.TJ_LP_xPTP).getReserves().value0;
  r1 = traderjoeLP.bind(ALL_ADDRESSES.TJ_LP_xPTP).getReserves().value1;
  let pricexPTP = r1.times(pricePTP).div(r0); // xPTP 8

  // priceVTX = reverve1 / reserve0 * priceAVAX traderjoe pair price feed
  r0 = traderjoeLP.bind(ALL_ADDRESSES.TJ_LP_VTX).getReserves().value0;
  r1 = traderjoeLP.bind(ALL_ADDRESSES.TJ_LP_VTX).getReserves().value1;
  let priceVTX = r1.times(priceAVAX).div(r0); // VTX 8

  // vePTP
  let totalVePTP = mvDecimals(vePTP.bind(ALL_ADDRESSES.PLATYPUSVENOM).totalSupply(), 10); // 18->8

  // save
  baseStats.blockNumber = blockNumber;
  baseStats.blockTimestamp = blockTimestamp;
  baseStats.priceAVAX = priceAVAX;
  baseStats.priceSAVAX = priceSAVAX;
  baseStats.priceJOE = priceJOE;
  baseStats.priceUSDC = priceUSDC;
  baseStats.priceUSDT = priceUSDT;
  baseStats.priceUST = priceUST;
  baseStats.priceDAI = priceDAI;
  baseStats.priceMIM = priceMIM;
  baseStats.priceFRAX = priceFRAX;
  baseStats.pricePTP = pricePTP;
  baseStats.pricexPTP = pricexPTP;
  baseStats.priceVTX = priceVTX;
  baseStats.priceQI = priceQI;
  baseStats.totalVePTP = totalVePTP;
  baseStats.save();
}
