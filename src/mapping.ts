import { ethereum } from "@graphprotocol/graph-ts";
import { feedPrice } from "./priceFeed";
import { feedTVL } from "./tvlFeed";
import { feedApr } from "./feedApr";
export function handleBlock(block: ethereum.Block): void {
  feedPrice(block);
  feedTVL(block);
  // apr feed
  feedApr(block);
  // rewarded feed
}
