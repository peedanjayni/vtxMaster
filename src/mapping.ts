import { ethereum } from "@graphprotocol/graph-ts";
import { feedPrice } from "./feedPrice";
import { feedPool } from "./feedPool";

export function handleBlock(block: ethereum.Block): void {
  // Every 10 block
  if (block.number.toI32() % 10 == 0) {
    feedPrice(block);
    feedPool(block);
    // apr feed
    // rewarded feed
  }
}
