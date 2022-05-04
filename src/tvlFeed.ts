import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import { ALL_ADDRESSES } from "./constants";
import { mvDecimals } from "./helpers";
import { allPrice, allTvl } from "../generated/schema";
import { masterChefVTX } from "../generated/vtxMaster/masterChefVTX";
import { masterChefJOE } from "../generated/vtxMaster/masterChefJOE";
import { traderjoeLP } from "../generated/vtxMaster/traderjoeLP";

// feed tvl
export function feedTVL(block: ethereum.Block): void {
  // load price entity
  let id = block.number.toHex();
  let tvlFeed = allTvl.load(id);
  let priceFeed = allPrice.load(id);
  if (priceFeed) {
    if (!tvlFeed) {
      tvlFeed = new allTvl(id);
    }
    let blockNumber = block.number;
    let blockTimestamp = block.timestamp;
    let priceAVAX = priceFeed.priceAVAX;
    let pricePTP = priceFeed.pricePTP;
    let priceJOE = priceFeed.priceJOE;
    let priceVTX = priceFeed.priceVTX;
    let priceDAI = priceFeed.priceDAI;
    let priceUSDC = priceFeed.priceUSDC;
    let priceUSDT = priceFeed.priceUSDT;
    let priceUST = priceFeed.priceUST;
    let priceMIM = priceFeed.priceMIM;
    let priceFRAX = priceFeed.priceFRAX;
    let priceSAVAX = priceFeed.priceSAVAX;
    // vector Pools
    let tvlStakedVTX = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_STAKED_VTX)
        .value2.times(priceVTX),
      18
    ); // 26 -> 8 staked VTX
    let tvlLockedVTX = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_LOCKED_VTX)
        .value2.times(priceVTX),
      18
    ); // 26 -> 8 locked VTX
    let tvlStakedPTP = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_STAKED_PTP)
        .value2.times(pricePTP),
      18
    ); // 26 -> 8 staked PTP
    let tvlStakedJOE = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_STAKED_JOE)
        .value2.times(priceJOE),
      18
    ); // 26 -> 8 staked JOE
    let tvlPool2VTXAVAX = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_VTX_AVAX)
        .value2.times(priceVTX)
        .times(BigInt.fromI32(2))
        .times(traderjoeLP.bind(ALL_ADDRESSES.LP_VTX_AVAX).getReserves().value0)
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_VTX_AVAX).totalSupply()),
      18
    ); // 26 -> 8 Pool2 VTX-AVAX
    let tvlPool2xPTP = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Pool2_xPTP)
        .value2.times(pricePTP)
        .times(BigInt.fromI32(2))
        .times(traderjoeLP.bind(ALL_ADDRESSES.LP_Pool2_xPTP).getReserves().value1)
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_Pool2_xPTP).totalSupply()),
      18
    ); // 26 -> 8 Pool2 xPTP-PTP

    // Platypus Main Pools
    let tvlMainPoolDAIe = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Main_DAIe)
        .value2.times(priceDAI),
      18
    ); // 26 -> 8 Main pool DAI.e
    let tvlMainPoolUSDC = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Main_USDC)
        .value2.times(priceUSDC),
      6
    ); // 14 -> 8 Main pool USDC
    let tvlMainPoolUSDCe = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Main_USDCe)
        .value2.times(priceUSDC),
      6
    ); // 14 -> 8 Main pool USDC.e
    let tvlMainPoolUSDT = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Main_USDT)
        .value2.times(priceUSDT),
      6
    ); // 14 -> 8 Main pool USDT
    let tvlMainPoolUSDTe = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Main_USDTe)
        .value2.times(priceUSDT),
      6
    ); // 14 -> 8 Main pool USDT.e
    let tvlAltPoolUSDCinUSDCUST = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_UST)
        .value2.times(priceUSDC),
      6
    ); // 14 -> 8 Alt Pool USDC in USDC_UST pool
    let tvlAltPoolUSTinUSDCUST = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_UST_USDC)
        .value2.times(priceUST),
      6
    ); // 14 -> 8 Alt Pool UST in USDC_UST pool
    let tvlAltPoolUSDCinUSDCMIM = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_MIM)
        .value2.times(priceUSDC),
      6
    ); // 14 -> 8 Alt Pool USDC in USDC_MIM pool
    let tvlAltPoolMIMinUSDCMIM = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_MIM_USDC)
        .value2.times(priceMIM),
      18
    ); // 26 -> 8 Alt Pool MIM in USDC_MIM pool
    let tvlAltPoolUSDCinUSDCFRAX = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_FRAX)
        .value2.times(priceUSDC),
      6
    ); // 14 -> 8 Alt Pool USDC in USDC_FRAX pool
    let tvlAltPoolFRAXinUSDCFRAX = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_FRAX_USDC)
        .value2.times(priceFRAX),
      18
    ); // 26 -> 8 Alt Pool FRAX in USDC_FRAX pool
    let tvlAltPoolAVAXin2AVAX = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_AVAX)
        .value2.times(priceAVAX),
      18
    ); // 26 -> 8 Alt Pool AVAX in AVAX_sAVAX pool
    let tvlAltPoolSAVAXin2AVAX = mvDecimals(
      masterChefVTX
        .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
        .getPoolInfo(ALL_ADDRESSES.LP_Alt_sAVAX)
        .value2.times(priceSAVAX),
      18
    ); // 26 -> 8 Alt Pool sAVAX in AVAX_sAVAX pool

    // Traderjoe Pools for 0 to 12
    let poolNumber = BigInt.fromI32(0);
    // pool 0 USDC_AVAX
    poolNumber = BigInt.fromI32(0); // change pool number
    let tvlTJUSDCAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDC_AVAX).getReserves().value0) // LP value0 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDC_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 1 WETH.e_AVAX
    poolNumber = BigInt.fromI32(1); // change pool number
    let tvlTJWETHeAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_WETHe_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_WETHe_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 2 USDT.e_AVAX
    poolNumber = BigInt.fromI32(2); // change pool number
    let tvlTJUSDTeAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDTe_AVAX).getReserves().value0) // LP value0 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDTe_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 3 USDC.e_AVAX
    poolNumber = BigInt.fromI32(3); // change pool number
    let tvlTJUSDCeAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDCe_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDCe_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 4 MIM_AVAX
    poolNumber = BigInt.fromI32(4); // change pool number
    let tvlTJMIMAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_MIM_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_MIM_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 5 WBTC.e_AVAX
    poolNumber = BigInt.fromI32(5); // change pool number
    let tvlTJWBTCeAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 6 JOE_AVAX
    poolNumber = BigInt.fromI32(6); // change pool number
    let tvlTJJOEAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_JOE_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_JOE_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 7 JOE_USDC
    poolNumber = BigInt.fromI32(7); // change pool number
    let tvlTJJOEUSDC = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_JOE_USDC).getReserves().value0) // LP value0 for JOE
        .times(BigInt.fromI32(2))
        .times(priceJOE) // price JOE
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_JOE_USDC).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 8 2USDC
    poolNumber = BigInt.fromI32(8); // change pool number
    let tvlTJ2USDC = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_2USDC).getReserves().value1) // LP value1 for USDC
        .times(BigInt.fromI32(2))
        .times(priceUSDC) // price USDC
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_2USDC).totalSupply()), // LP
      6 // move 6 decimals
    );
    // pool 9 2USDT
    poolNumber = BigInt.fromI32(9); // change pool number
    let tvlTJ2USDT = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_2USDT).getReserves().value0) // LP value0 for USDT
        .times(BigInt.fromI32(2))
        .times(priceUSDT) // price USDT
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_2USDT).totalSupply()), // LP
      6 // move 6 decimals
    );
    // pool 10 LINK.e_AVAX
    poolNumber = BigInt.fromI32(10); // change pool number
    let tvlTJLINKeAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_LINKe_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_LINKe_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 11 BNB_AVAX
    poolNumber = BigInt.fromI32(11); // change pool number
    let tvlTJBNBAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_BNB_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_BNB_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // pool 12 USDt_AVAX
    poolNumber = BigInt.fromI32(12); // change pool number
    let tvlTJUSDtAVAX = mvDecimals(
      masterChefJOE
        .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
        .userInfo(poolNumber, ALL_ADDRESSES.MAIN_STAKING_JOE)
        .value0.times(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDT_AVAX).getReserves().value1) // LP value1 for AVAX
        .times(BigInt.fromI32(2))
        .times(priceAVAX) // price AVAX
        .div(traderjoeLP.bind(ALL_ADDRESSES.LP_TJ_USDT_AVAX).totalSupply()), // LP
      18 // move 18 decimals
    );
    // save
    tvlFeed.blockNumber = blockNumber;
    tvlFeed.blockTimestamp = blockTimestamp;
    tvlFeed.tvlStakedVTX = tvlStakedVTX;
    tvlFeed.tvlLockedVTX = tvlLockedVTX;
    tvlFeed.tvlStakedPTP = tvlStakedPTP;
    tvlFeed.tvlStakedJOE = tvlStakedJOE;
    tvlFeed.tvlPool2VTXAVAX = tvlPool2VTXAVAX;
    tvlFeed.tvlPool2xPTP = tvlPool2xPTP;
    tvlFeed.tvlMainPoolDAIe = tvlMainPoolDAIe;
    tvlFeed.tvlMainPoolUSDC = tvlMainPoolUSDC;
    tvlFeed.tvlMainPoolUSDCe = tvlMainPoolUSDCe;
    tvlFeed.tvlMainPoolUSDT = tvlMainPoolUSDT;
    tvlFeed.tvlMainPoolUSDTe = tvlMainPoolUSDTe;
    tvlFeed.tvlAltPoolUSDCinUSDCUST = tvlAltPoolUSDCinUSDCUST;
    tvlFeed.tvlAltPoolUSTinUSDCUST = tvlAltPoolUSTinUSDCUST;
    tvlFeed.tvlAltPoolUSDCinUSDCMIM = tvlAltPoolUSDCinUSDCMIM;
    tvlFeed.tvlAltPoolMIMinUSDCMIM = tvlAltPoolMIMinUSDCMIM;
    tvlFeed.tvlAltPoolUSDCinUSDCFRAX = tvlAltPoolUSDCinUSDCFRAX;
    tvlFeed.tvlAltPoolFRAXinUSDCFRAX = tvlAltPoolFRAXinUSDCFRAX;
    tvlFeed.tvlAltPoolAVAXin2AVAX = tvlAltPoolAVAXin2AVAX;
    tvlFeed.tvlAltPoolSAVAXin2AVAX = tvlAltPoolSAVAXin2AVAX;
    tvlFeed.tvlTJUSDCAVAX = tvlTJUSDCAVAX;
    tvlFeed.tvlTJWETHeAVAX = tvlTJWETHeAVAX;
    tvlFeed.tvlTJUSDTeAVAX = tvlTJUSDTeAVAX;
    tvlFeed.tvlTJUSDCeAVAX = tvlTJUSDCeAVAX;
    tvlFeed.tvlTJMIMAVAX = tvlTJMIMAVAX;
    tvlFeed.tvlTJWBTCeAVAX = tvlTJWBTCeAVAX;
    tvlFeed.tvlTJJOEAVAX = tvlTJJOEAVAX;
    tvlFeed.tvlTJJOEUSDC = tvlTJJOEUSDC;
    tvlFeed.tvlTJ2USDC = tvlTJ2USDC;
    tvlFeed.tvlTJ2USDT = tvlTJ2USDT;
    tvlFeed.tvlTJLINKeAVAX = tvlTJLINKeAVAX;
    tvlFeed.tvlTJBNBAVAX = tvlTJBNBAVAX;
    tvlFeed.tvlTJUSDtAVAX = tvlTJUSDtAVAX;

    tvlFeed.save();
  }
}
