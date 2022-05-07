import { TJPair } from "../generated/schema";
import { Swap } from "../generated/templates/joePair/joePair";
import { joePair } from "../generated/templates/joePair/joePair";
import { BigInt } from "@graphprotocol/graph-ts";
import { addDecimals } from "./helpers";

export function feedTjPair(event: Swap): void {
  let addy = event.address; // LP Address
  let id = addy.toHex();
  let tjPair = TJPair.load(id);
  let blockNumber = event.block.number;
  let blockTimestamp = event.block.timestamp;
  if (!tjPair) {
    // new
    tjPair = new TJPair(id);
  } else {
    let reserve0 = joePair.bind(addy).getReserves().value0;
    if (reserve0.gt(BigInt.fromI32(0))) {
      let amount0In = event.params.amount0In;
      let amount0Out = event.params.amount0Out;
      let amount0 = amount0In.plus(amount0Out);
      // calc 24h volume
      // seprate a day into 86,400 seconds
      // seprate days by 12am
      let counter = tjPair.counter;
      let afternoon = tjPair.afternoon;
      let lpApr = tjPair.lpApr;
      let turnover = tjPair.turnover;
      if (blockTimestamp.mod(BigInt.fromI32(86400)).gt(BigInt.fromI32(43200))) {
        // Init
        if (counter == BigInt.fromI32(0)) {
          afternoon = BigInt.fromI32(1);
        }
        // afternoon
        if (afternoon == BigInt.fromI32(1)) {
          // continue counting afternoon=1
          counter = counter.plus(amount0);
        } else {
          // morning afternoon clear counter afternoon=0
          // calc lpApr = counter * 2 * 365 / reserve0
          turnover = addDecimals(counter.times(BigInt.fromI32(730)), 8).div(reserve0);
          lpApr = turnover.times(BigInt.fromI32(25)).div(BigInt.fromI32(10000));
          // to 8 decimals
          counter = BigInt.fromI32(0);
          counter = counter.plus(amount0);
          afternoon = BigInt.fromI32(1);
        }
      } else {
        // Init
        if (counter == BigInt.fromI32(0)) {
          afternoon = BigInt.fromI32(0);
        }
        // morning
        if (afternoon == BigInt.fromI32(0)) {
          // continue counting afternoon=0
          counter = counter.plus(amount0);
        } else {
          // afternoon afternoon clear counter and afternoon=1
          // calc lpApr = counter * 2 * 365 / reserve0
          turnover = addDecimals(counter.times(BigInt.fromI32(730)), 8).div(reserve0);
          lpApr = turnover.times(BigInt.fromI32(25)).div(BigInt.fromI32(10000));
          counter = BigInt.fromI32(0);
          counter = counter.plus(amount0);
          afternoon = BigInt.fromI32(0);
        }
      }
      tjPair.afternoon = afternoon;
      tjPair.counter = counter;
      tjPair.turnover = turnover;
      tjPair.lpApr = lpApr;
    }
  }
  tjPair.blockNumber = blockNumber;
  tjPair.blockTimestamp = blockTimestamp;
  tjPair.save();
}
