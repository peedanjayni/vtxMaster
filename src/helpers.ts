import { Address, BigInt } from "@graphprotocol/graph-ts";
import { masterChefVTX } from "../generated/vtxMaster/masterChefVTX";
import { masterChefJOE } from "../generated/vtxMaster/masterChefJOE";
import { masterChefPTP } from "../generated/vtxMaster/masterChefPTP";
import { platypusAsset } from "../generated/vtxMaster/platypusAsset";
import { traderjoeLP } from "../generated/vtxMaster/traderjoeLP";
import { ptpBonusRewarder } from "../generated/vtxMaster/ptpBonusRewarder";
import { ustToken } from "../generated/vtxMaster/ustToken";
import { usdcToken } from "../generated/vtxMaster/usdcToken";
import { wavaxToken } from "../generated/vtxMaster/wavaxToken";
import { savaxToken } from "../generated/vtxMaster/savaxToken";
import { ALL_ADDRESSES } from "./constants";
import { TJPair } from "../generated/schema";

export function mvDecimals(_inputInt: BigInt, _decimal: u8): BigInt {
  return _inputInt.div(BigInt.fromI32(10).pow(_decimal));
}

export function addDecimals(_inputInt: BigInt, _decimal: u8): BigInt {
  return _inputInt.times(BigInt.fromI32(10).pow(_decimal));
}

export function to18Decimals(_inputInt: BigInt, _orignalDecimal: BigInt): BigInt {
  return BigInt.fromI32(0);
}

export function fetchVectorPoolsTVL(_lpAddress: Address, _price: BigInt, _decimal: u8): BigInt {
  return mvDecimals(
    masterChefVTX
      .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
      .getPoolInfo(_lpAddress)
      .value2.times(_price),
    _decimal
  );
}

export function fetchVectorPool2TVL(_lpAddress: Address, _price: BigInt, _valueNumber: i32, _decimal: u8): BigInt {
  let x =
    _valueNumber === 0
      ? traderjoeLP.bind(_lpAddress).getReserves().value0
      : traderjoeLP.bind(_lpAddress).getReserves().value1;
  return mvDecimals(
    masterChefVTX
      .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
      .getPoolInfo(_lpAddress)
      .value2.times(_price)
      .times(BigInt.fromI32(2))
      .times(x)
      .div(traderjoeLP.bind(_lpAddress).totalSupply()),
    _decimal
  );
}

export function fetchPlatypusPoolsTVL(_lpAddress: Address, _price: BigInt, _decimal: u8): BigInt {
  return mvDecimals(
    masterChefVTX
      .bind(ALL_ADDRESSES.MASTER_CHEF_VTX)
      .getPoolInfo(_lpAddress)
      .value2.times(_price),
    _decimal
  );
}

export function fetcchTraderjoePoolsTVL(
  _lpAddress: Address,
  _poolNumber: i32,
  _valueNumber: i32,
  _price: BigInt,
  _decimal: u8
): BigInt {
  let x =
    _valueNumber === 0
      ? traderjoeLP.bind(_lpAddress).getReserves().value0
      : traderjoeLP.bind(_lpAddress).getReserves().value1;
  return mvDecimals(
    masterChefJOE
      .bind(ALL_ADDRESSES.MASTER_CHEF_JOE)
      .userInfo(BigInt.fromI32(_poolNumber), ALL_ADDRESSES.MAIN_STAKING_JOE)
      .value0.times(x)
      .times(BigInt.fromI32(2))
      .times(_price)
      .div(traderjoeLP.bind(_lpAddress).totalSupply()),
    _decimal
  );
}

export function fetchVtxAPR(
  _lpAddress: Address,
  _price: BigInt,
  _tvl: BigInt,
  _vtxPerSec: BigInt,
  _totalPoint: BigInt
): BigInt {
  return mvDecimals(
    _vtxPerSec
      .times(_price)
      .times(BigInt.fromI32(31536000)) // anually
      .times(
        masterChefVTX.bind(ALL_ADDRESSES.MASTER_CHEF_VTX).getPoolInfo(_lpAddress).value1 // LP
      )
      .div(_totalPoint)
      .div(_tvl), // tvl
    10
  );
}

export function fetchPTPBonusApr(_symbol: string, _rewardTokenPrice: BigInt, _poolTokenPrice: BigInt): BigInt {
  let _rewarder = Address.zero(),
    _tvl = BigInt.zero();

  if (_symbol === "UST" || _symbol === "USDC") {
    if (_symbol === "UST") {
      _rewarder = ALL_ADDRESSES.REWARDER_UST_UST;
      _tvl = ustToken
        .bind(ALL_ADDRESSES.UST_TOKEN)
        .balanceOf(ALL_ADDRESSES.LP_PTP_UST_UST)
        .times(_poolTokenPrice);
    } else {
      _rewarder = ALL_ADDRESSES.REWARDER_USDC_UST;
      _tvl = usdcToken
        .bind(ALL_ADDRESSES.USDC_TOKEN)
        .balanceOf(ALL_ADDRESSES.LP_PTP_USDC_UST)
        .times(_poolTokenPrice);
    }
    return addDecimals(
      ptpBonusRewarder
        .bind(_rewarder)
        .tokenPerSec()
        .times(BigInt.fromI32(31536000))
        .times(_rewardTokenPrice),
      8
    ).div(_tvl);
  } else if (_symbol === "AVAX" || _symbol === "sAVAX") {
    if (_symbol === "AVAX") {
      _rewarder = ALL_ADDRESSES.REWARDER_AVAX_QI;
      _tvl = wavaxToken
        .bind(ALL_ADDRESSES.WAVAX_TOKEN)
        .balanceOf(ALL_ADDRESSES.LP_PTP_AVAX_AVAX)
        .times(_poolTokenPrice);
    } else {
      _rewarder = ALL_ADDRESSES.REWARDER_SAVAX_QI;
      _tvl = savaxToken
        .bind(ALL_ADDRESSES.SAVAX_TOKEN)
        .balanceOf(ALL_ADDRESSES.LP_PTP_SAVAX_AVAX)
        .times(_poolTokenPrice);
    }
    return addDecimals(
      ptpBonusRewarder
        .bind(_rewarder)
        .tokenPerSec()
        .times(BigInt.fromI32(31536000))
        .times(_rewardTokenPrice),
      8
    ).div(_tvl);
  } else {
    return BigInt.zero();
  }
}

// sqrt(totalVePTP * totalTVL) = totalFactor
// totalTVL = totalFactor^2 / totalVePTP

export function fetchPTPAPR(_number: i32, _lp: Address, _ptpPrice: BigInt, _totalVePTP: BigInt, _tvl: BigInt): BigInt {
  let _poolNumber = BigInt.fromI32(_number);
  let baseShare = masterChefPTP.bind(ALL_ADDRESSES.MASTER_CHEF_PTP).dialutingRepartition(); // 375 means .375
  let boostShare = masterChefPTP.bind(ALL_ADDRESSES.MASTER_CHEF_PTP).nonDialutingRepartition(); // 625 means .625
  let ptpEmission = masterChefPTP
    .bind(ALL_ADDRESSES.MASTER_CHEF_PTP)
    .ptpPerSec()
    .times(BigInt.fromI32(31536000)); // 18
  let adjustedAllocPoint = masterChefPTP.bind(ALL_ADDRESSES.MASTER_CHEF_PTP).poolInfo(_poolNumber).value7; // 18
  let totalAdjustedAllocPoint = masterChefPTP.bind(ALL_ADDRESSES.MASTER_CHEF_PTP).totalAdjustedAllocPoint(); // 18
  let userFactor = masterChefPTP
    .bind(ALL_ADDRESSES.MASTER_CHEF_PTP)
    .userInfo(_poolNumber, ALL_ADDRESSES.MAIN_STAKING_PTP).value2; // 18
  let totalFactor = masterChefPTP.bind(ALL_ADDRESSES.MASTER_CHEF_PTP).poolInfo(_poolNumber).value5; // 18
  let userAmount = masterChefPTP
    .bind(ALL_ADDRESSES.MASTER_CHEF_PTP)
    .userInfo(_poolNumber, ALL_ADDRESSES.MAIN_STAKING_PTP).value0; // depends on coin
  // let underlyingTokenDecimal = u8(platypusAsset.bind(_lp).decimals());
  let poolAmount = platypusAsset.bind(_lp).underlyingTokenBalance(); // same as userAmount
  // apr = (baseRewards + boostRewards) / _tvl
  let baseRewards = mvDecimals(
    ptpEmission
      .times(adjustedAllocPoint)
      .times(userAmount)
      .times(baseShare)
      .times(_ptpPrice)
      .div(totalAdjustedAllocPoint)
      .div(poolAmount)
      .div(BigInt.fromI32(1000)), // 375 to .375
    18
  );
  let boostRewards = mvDecimals(
    ptpEmission
      .times(adjustedAllocPoint)
      .times(userFactor)
      .times(boostShare)
      .times(_ptpPrice)
      .div(totalAdjustedAllocPoint)
      .div(totalFactor)
      .div(BigInt.fromI32(1000)),
    18
  );
  let apr = addDecimals(baseRewards.plus(boostRewards), 8).div(_tvl);
  // hair cut 18%
  apr = apr.times(BigInt.fromI32(82)).div(BigInt.fromI32(100));

  return apr;
}

export function fetchTJlpApr(_lp: Address): BigInt {
  let tjPair = TJPair.load(_lp.toString());
  let lpApr = BigInt.fromI32(0);
  if (tjPair) {
    lpApr = tjPair.lpApr;
    return lpApr;
  } else {
    return BigInt.fromI32(0);
  }
}
