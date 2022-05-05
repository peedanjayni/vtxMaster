import { Address, BigInt } from "@graphprotocol/graph-ts";
import { masterChefVTX } from "../generated/vtxMaster/masterChefVTX";
import { masterChefJOE } from "../generated/vtxMaster/masterChefJOE";
import { traderjoeLP } from "../generated/vtxMaster/traderjoeLP";
import { ALL_ADDRESSES } from "./constants";

export function mvDecimals(_inputInt: BigInt, _decimal: u8): BigInt {
  return _inputInt.div(BigInt.fromI32(10).pow(_decimal));
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
