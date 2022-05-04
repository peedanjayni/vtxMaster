import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { ALL_ADDRESSES } from "./constants";
import {
  allPrice,
  allTvl,
  baseAprEachTjPool,
  boostAprEachTjPool,
  joeAprEachPool,
  lpAprEachTjPool,
  ptpAprEachPool,
  qiAprEachPool,
  ustAprEachPool,
  vtxAprEachPool,
  xptpAprEachPool,
  zjoeAprEachPool,
} from "../generated/schema";
import { masterChefVTX } from "../generated/vtxMaster/masterChefVTX";
import { mvDecimals } from "./helpers";

// feed apr
export function feedApr(block: ethereum.Block): void {
  // load entities
  let id = block.number.toHex();
  let tvlFeed = allTvl.load(id);
  let priceFeed = allPrice.load(id);
  let vtxApr = vtxAprEachPool.load(id);
  let ptpApr = ptpAprEachPool.load(id);
  let joeApr = joeAprEachPool.load(id);
  let xptpApr = xptpAprEachPool.load(id);
  let zjoeApr = zjoeAprEachPool.load(id);
  let lpApr = lpAprEachTjPool.load(id);
  let baseApr = baseAprEachTjPool.load(id);
  let boostApr = boostAprEachTjPool.load(id);
  let ustApr = ustAprEachPool.load(id);
  let qiApr = qiAprEachPool.load(id);
  if (tvlFeed && priceFeed) {
    if (!vtxApr) {
      vtxApr = new vtxAprEachPool(id);
    }
    if (!ptpApr) {
      ptpApr = new ptpAprEachPool(id);
    }
    if (!joeApr) {
      joeApr = new joeAprEachPool(id);
    }
    if (!xptpApr) {
      xptpApr = new xptpAprEachPool(id);
    }
    if (!zjoeApr) {
      zjoeApr = new zjoeAprEachPool(id);
    }
    if (!lpApr) {
      lpApr = new lpAprEachTjPool(id);
    }
    if (!baseApr) {
      baseApr = new baseAprEachTjPool(id);
    }
    if (!boostApr) {
      boostApr = new boostAprEachTjPool(id);
    }
    if (!ustApr) {
      ustApr = new ustAprEachPool(id);
    }
    if (!qiApr) {
      qiApr = new qiAprEachPool(id);
    }
    // Allocations
    let vtxPerSec = masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).vtxPerSec();
    let totalPoint = masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).totalAllocPoint();
    // staked VTX APRs
    let vtxAprStakedVTX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000)) // anually
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_STAKED_VTX) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlStakedVTX), // tvl
      10
    );
    let vtxAprLockedVTX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_LOCKED_VTX) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlLockedVTX), // tvl
      10
    );
    let vtxAprStakedPTP = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_STAKED_PTP) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlStakedPTP), // tvl
      10
    );
    let vtxAprStakedJOE = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_STAKED_JOE) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlStakedJOE), // tvl
      10
    );
    let vtxAprPool2VTXAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_VTX_AVAX) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlPool2VTXAVAX), // tvl
      10
    );
    let vtxAprPool2xPTP = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Pool2_xPTP) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlPool2xPTP), // tvl
      10
    );
    let vtxAprMainPoolDAIe = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Main_DAIe) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlMainPoolDAIe), // tvl
      10
    );
    let vtxAprMainPoolUSDC = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Main_USDC) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlMainPoolUSDC), // tvl
      10
    );
    let vtxAprMainPoolUSDCe = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Main_USDCe) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlMainPoolUSDCe), // tvl
      10
    );
    let vtxAprMainPoolUSDT = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Main_USDT) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlMainPoolUSDT), // tvl
      10
    );
    let vtxAprMainPoolUSDTe = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Main_USDTe) // LP
            .value1
        )
        .div(totalPoint)
        .div(tvlFeed.tvlMainPoolUSDTe), // tvl
      10
    );
    let vtxAprAltPoolUSDCinUSDCUST = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_UST).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolUSDCinUSDCMIM), // tvl
      10
    );
    let vtxAprAltPoolUSTinUSDCUST = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_UST).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolUSTinUSDCUST), // tvl
      10
    );
    let vtxAprAltPoolUSDCinUSDCMIM = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_MIM).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolUSDCinUSDCMIM), // tvl
      10
    );
    let vtxAprAltPoolMIMinUSDCMIM = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_MIM).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolMIMinUSDCMIM), // tvl
      10
    );
    let vtxAprAltPoolUSDCinUSDCFRAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_FRAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolUSDCinUSDCFRAX), // tvl
      10
    );
    let vtxAprAltPoolFRAXinUSDCFRAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_Alt_USDC_FRAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolFRAXinUSDCFRAX), // tvl
      10
    );
    let vtxAprAltPoolAVAXin2AVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Alt_AVAX)
            .value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolAVAXin2AVAX), // tvl
      10
    );
    let vtxAprAltPoolSAVAXin2AVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_Alt_sAVAX)
            .value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlAltPoolSAVAXin2AVAX), // tvl
      10
    );
    let vtxAprTJUSDCAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_USDC_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJUSDCAVAX), // tvl
      10
    );
    let vtxAprTJWETHeAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJWETHeAVAX), // tvl
      10
    );
    let vtxAprTJUSDTeAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_USDTe_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJUSDTeAVAX), // tvl
      10
    );
    let vtxAprTJUSDCeAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_USDCe_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJUSDCeAVAX), // tvl
      10
    );
    let vtxAprTJMIMAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_MIM_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJMIMAVAX), // tvl
      10
    );
    let vtxAprTJWBTCeAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJWBTCeAVAX), // tvl
      10
    );
    let vtxAprTJJOEAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_JOE_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJJOEAVAX), // tvl
      10
    );
    let vtxAprTJJOEUSDC = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_JOE_USDC).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJJOEUSDC), // tvl
      10
    );
    let vtxAprTJ2USDC = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_TJ_2USDC)
            .value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJ2USDC), // tvl
      10
    );
    let vtxAprTJ2USDT = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(ALL_ADDRESSES.LP_TJ_2USDT)
            .value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJ2USDT), // tvl
      10
    );
    let vtxAprTJLINKeAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_LINKe_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJLINKeAVAX), // tvl
      10
    );
    let vtxAprTJBNBAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_BNB_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJBNBAVAX), // tvl
      10
    );
    let vtxAprTJUSDtAVAX = mvDecimals(
      vtxPerSec
        .times(priceFeed.priceVTX) // price
        .times(BigInt.fromI32(31536000))
        .times(
          masterChefVTX
            .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
            .getPoolInfo(ALL_ADDRESSES.LP_TJ_USDT_AVAX).value1 // LP
        )
        .div(totalPoint)
        .div(tvlFeed.tvlTJUSDtAVAX), // tvl
      10
    );
    // save VTX APRs
    vtxApr.blockNumber = block.number;
    vtxApr.blockTimestamp = block.timestamp;
    vtxApr.vtxAprStakedVTX = vtxAprStakedVTX;
    vtxApr.vtxAprLockedVTX = vtxAprLockedVTX;
    vtxApr.vtxAprStakedPTP = vtxAprStakedPTP;
    vtxApr.vtxAprStakedJOE = vtxAprStakedJOE;
    vtxApr.vtxAprPool2VTXAVAX = vtxAprPool2VTXAVAX;
    vtxApr.vtxAprPool2xPTP = vtxAprPool2xPTP;
    vtxApr.vtxAprMainPoolDAIe = vtxAprMainPoolDAIe;
    vtxApr.vtxAprMainPoolUSDC = vtxAprMainPoolUSDC;
    vtxApr.vtxAprMainPoolUSDCe = vtxAprMainPoolUSDCe;
    vtxApr.vtxAprMainPoolUSDT = vtxAprMainPoolUSDT;
    vtxApr.vtxAprMainPoolUSDTe = vtxAprMainPoolUSDTe;
    vtxApr.vtxAprAltPoolUSDCinUSDCUST = vtxAprAltPoolUSDCinUSDCUST;
    vtxApr.vtxAprAltPoolUSTinUSDCUST = vtxAprAltPoolUSTinUSDCUST;
    vtxApr.vtxAprAltPoolUSDCinUSDCMIM = vtxAprAltPoolUSDCinUSDCMIM;
    vtxApr.vtxAprAltPoolMIMinUSDCMIM = vtxAprAltPoolMIMinUSDCMIM;
    vtxApr.vtxAprAltPoolUSDCinUSDCFRAX = vtxAprAltPoolUSDCinUSDCFRAX;
    vtxApr.vtxAprAltPoolFRAXinUSDCFRAX = vtxAprAltPoolFRAXinUSDCFRAX;
    vtxApr.vtxAprAltPoolAVAXin2AVAX = vtxAprAltPoolAVAXin2AVAX;
    vtxApr.vtxAprAltPoolSAVAXin2AVAX = vtxAprAltPoolSAVAXin2AVAX;
    vtxApr.vtxAprTJUSDCAVAX = vtxAprTJUSDCAVAX;
    vtxApr.vtxAprTJWETHeAVAX = vtxAprTJWETHeAVAX;
    vtxApr.vtxAprTJUSDTeAVAX = vtxAprTJUSDTeAVAX;
    vtxApr.vtxAprTJUSDCeAVAX = vtxAprTJUSDCeAVAX;
    vtxApr.vtxAprTJMIMAVAX = vtxAprTJMIMAVAX;
    vtxApr.vtxAprTJWBTCeAVAX = vtxAprTJWBTCeAVAX;
    vtxApr.vtxAprTJJOEAVAX = vtxAprTJJOEAVAX;
    vtxApr.vtxAprTJJOEUSDC = vtxAprTJJOEUSDC;
    vtxApr.vtxAprTJ2USDC = vtxAprTJ2USDC;
    vtxApr.vtxAprTJ2USDT = vtxAprTJ2USDT;
    vtxApr.vtxAprTJLINKeAVAX = vtxAprTJLINKeAVAX;
    vtxApr.vtxAprTJBNBAVAX = vtxAprTJBNBAVAX;
    vtxApr.vtxAprTJUSDtAVAX = vtxAprTJUSDtAVAX;
    vtxApr.save();
    // save PTP APRs
    ptpApr.save();
    // save JOE APRs
    joeApr.save();
    // save xptp APRs
    xptpApr.save();
    // save zjoe APRs
    zjoeApr.save();
    // save Traderjoe LP APRs
    lpApr.save();
    // save Traderjoe base APRs
    baseApr.save();
    // save Traderjoe boost APRs
    boostApr.save();
    // save bonus UST APRs
    ustApr.save();
    // save bonus QI APRs
    qiApr.save();
  }
}
