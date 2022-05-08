import { ethereum, log } from "@graphprotocol/graph-ts";
import { feedStats } from "./feedStats";
import { feedPool } from "./feedPool";
import { feedTjPair } from "./feedTjPair";
import { joePair as joePairTemplate } from "../generated/templates";
import { Swap } from "../generated/templates/joePair/joePair";
import { ALL_ADDRESSES } from "./constants";

export function handleBlock(block: ethereum.Block): void {
  // Every 100 block
  if (block.number.toI32() % 100 == 0) {
    feedStats(block);
    feedPool(block);
  }
  // add event handlers for all joe pairs
  if (block.number.toI32() == 14405001) {
    // change this number to deploy block
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_WBTCe_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_USDT_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_USDTe_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_USDCe_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_USDC_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_MIM_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_JOE_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_JOE_USDC);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_2USDC);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_2USDT);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_BNB_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_LINKe_AVAX);
    joePairTemplate.create(ALL_ADDRESSES.LP_TJ_USDT_AVAX);
    // pool2
    joePairTemplate.create(ALL_ADDRESSES.LP_Pool2_VTX);
    joePairTemplate.create(ALL_ADDRESSES.LP_Pool2_xPTP);
    joePairTemplate.create(ALL_ADDRESSES.LP_Pool2_zJOE);
    log.info("add event handlers", []);
  }
}

export function handleSwap(event: Swap): void {
  feedTjPair(event);
}
