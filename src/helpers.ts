import { BigInt } from "@graphprotocol/graph-ts";
export function mvDecimals(_input: BigInt, _decimal: u8): BigInt {
  return _input.div(BigInt.fromI32(10).pow(_decimal));
}
