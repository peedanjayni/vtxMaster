// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Burn extends ethereum.Event {
  get params(): Burn__Params {
    return new Burn__Params(this);
  }
}

export class Burn__Params {
  _event: Burn;

  constructor(event: Burn) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Claimed extends ethereum.Event {
  get params(): Claimed__Params {
    return new Claimed__Params(this);
  }
}

export class Claimed__Params {
  _event: Claimed;

  constructor(event: Claimed) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Mint extends ethereum.Event {
  get params(): Mint__Params {
    return new Mint__Params(this);
  }
}

export class Mint__Params {
  _event: Mint;

  constructor(event: Mint) {
    this._event = event;
  }

  get beneficiary(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Staked extends ethereum.Event {
  get params(): Staked__Params {
    return new Staked__Params(this);
  }
}

export class Staked__Params {
  _event: Staked;

  constructor(event: Staked) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class StakedNft extends ethereum.Event {
  get params(): StakedNft__Params {
    return new StakedNft__Params(this);
  }
}

export class StakedNft__Params {
  _event: StakedNft;

  constructor(event: StakedNft) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Unstaked extends ethereum.Event {
  get params(): Unstaked__Params {
    return new Unstaked__Params(this);
  }
}

export class Unstaked__Params {
  _event: Unstaked;

  constructor(event: Unstaked) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class UnstakedNft extends ethereum.Event {
  get params(): UnstakedNft__Params {
    return new UnstakedNft__Params(this);
  }
}

export class UnstakedNft__Params {
  _event: UnstakedNft;

  constructor(event: UnstakedNft) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get nftId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class vePTP__usersResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class vePTP extends ethereum.SmartContract {
  static bind(address: Address): vePTP {
    return new vePTP("vePTP", address);
  }

  balanceOf(account: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  claimable(_addr: Address): BigInt {
    let result = super.call("claimable", "claimable(address):(uint256)", [
      ethereum.Value.fromAddress(_addr)
    ]);

    return result[0].toBigInt();
  }

  try_claimable(_addr: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("claimable", "claimable(address):(uint256)", [
      ethereum.Value.fromAddress(_addr)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  decimals(): i32 {
    let result = super.call("decimals", "decimals():(uint8)", []);

    return result[0].toI32();
  }

  try_decimals(): ethereum.CallResult<i32> {
    let result = super.tryCall("decimals", "decimals():(uint8)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  generationRate(): BigInt {
    let result = super.call("generationRate", "generationRate():(uint256)", []);

    return result[0].toBigInt();
  }

  try_generationRate(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "generationRate",
      "generationRate():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getStakedNft(_addr: Address): BigInt {
    let result = super.call("getStakedNft", "getStakedNft(address):(uint256)", [
      ethereum.Value.fromAddress(_addr)
    ]);

    return result[0].toBigInt();
  }

  try_getStakedNft(_addr: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getStakedNft",
      "getStakedNft(address):(uint256)",
      [ethereum.Value.fromAddress(_addr)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getStakedPtp(_addr: Address): BigInt {
    let result = super.call("getStakedPtp", "getStakedPtp(address):(uint256)", [
      ethereum.Value.fromAddress(_addr)
    ]);

    return result[0].toBigInt();
  }

  try_getStakedPtp(_addr: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getStakedPtp",
      "getStakedPtp(address):(uint256)",
      [ethereum.Value.fromAddress(_addr)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getVotes(_account: Address): BigInt {
    let result = super.call("getVotes", "getVotes(address):(uint256)", [
      ethereum.Value.fromAddress(_account)
    ]);

    return result[0].toBigInt();
  }

  try_getVotes(_account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getVotes", "getVotes(address):(uint256)", [
      ethereum.Value.fromAddress(_account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  invVoteThreshold(): BigInt {
    let result = super.call(
      "invVoteThreshold",
      "invVoteThreshold():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_invVoteThreshold(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "invVoteThreshold",
      "invVoteThreshold():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isUser(_addr: Address): boolean {
    let result = super.call("isUser", "isUser(address):(bool)", [
      ethereum.Value.fromAddress(_addr)
    ]);

    return result[0].toBoolean();
  }

  try_isUser(_addr: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("isUser", "isUser(address):(bool)", [
      ethereum.Value.fromAddress(_addr)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  masterPlatypus(): Address {
    let result = super.call("masterPlatypus", "masterPlatypus():(address)", []);

    return result[0].toAddress();
  }

  try_masterPlatypus(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "masterPlatypus",
      "masterPlatypus():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  maxCap(): BigInt {
    let result = super.call("maxCap", "maxCap():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxCap(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxCap", "maxCap():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  nft(): Address {
    let result = super.call("nft", "nft():(address)", []);

    return result[0].toAddress();
  }

  try_nft(): ethereum.CallResult<Address> {
    let result = super.tryCall("nft", "nft():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  onERC721Received(
    param0: Address,
    _from: Address,
    _tokenId: BigInt,
    param3: Bytes
  ): Bytes {
    let result = super.call(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(_from),
        ethereum.Value.fromUnsignedBigInt(_tokenId),
        ethereum.Value.fromBytes(param3)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC721Received(
    param0: Address,
    _from: Address,
    _tokenId: BigInt,
    param3: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(_from),
        ethereum.Value.fromUnsignedBigInt(_tokenId),
        ethereum.Value.fromBytes(param3)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  ptp(): Address {
    let result = super.call("ptp", "ptp():(address)", []);

    return result[0].toAddress();
  }

  try_ptp(): ethereum.CallResult<Address> {
    let result = super.tryCall("ptp", "ptp():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  users(param0: Address): vePTP__usersResult {
    let result = super.call(
      "users",
      "users(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new vePTP__usersResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_users(param0: Address): ethereum.CallResult<vePTP__usersResult> {
    let result = super.tryCall(
      "users",
      "users(address):(uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new vePTP__usersResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  whitelist(): Address {
    let result = super.call("whitelist", "whitelist():(address)", []);

    return result[0].toAddress();
  }

  try_whitelist(): ethereum.CallResult<Address> {
    let result = super.tryCall("whitelist", "whitelist():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ClaimCall extends ethereum.Call {
  get inputs(): ClaimCall__Inputs {
    return new ClaimCall__Inputs(this);
  }

  get outputs(): ClaimCall__Outputs {
    return new ClaimCall__Outputs(this);
  }
}

export class ClaimCall__Inputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class ClaimCall__Outputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _ptp(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _masterPlatypus(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _nft(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class OnERC721ReceivedCall extends ethereum.Call {
  get inputs(): OnERC721ReceivedCall__Inputs {
    return new OnERC721ReceivedCall__Inputs(this);
  }

  get outputs(): OnERC721ReceivedCall__Outputs {
    return new OnERC721ReceivedCall__Outputs(this);
  }
}

export class OnERC721ReceivedCall__Inputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get value3(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class OnERC721ReceivedCall__Outputs {
  _call: OnERC721ReceivedCall;

  constructor(call: OnERC721ReceivedCall) {
    this._call = call;
  }

  get value0(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetGenerationRateCall extends ethereum.Call {
  get inputs(): SetGenerationRateCall__Inputs {
    return new SetGenerationRateCall__Inputs(this);
  }

  get outputs(): SetGenerationRateCall__Outputs {
    return new SetGenerationRateCall__Outputs(this);
  }
}

export class SetGenerationRateCall__Inputs {
  _call: SetGenerationRateCall;

  constructor(call: SetGenerationRateCall) {
    this._call = call;
  }

  get _generationRate(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetGenerationRateCall__Outputs {
  _call: SetGenerationRateCall;

  constructor(call: SetGenerationRateCall) {
    this._call = call;
  }
}

export class SetInvVoteThresholdCall extends ethereum.Call {
  get inputs(): SetInvVoteThresholdCall__Inputs {
    return new SetInvVoteThresholdCall__Inputs(this);
  }

  get outputs(): SetInvVoteThresholdCall__Outputs {
    return new SetInvVoteThresholdCall__Outputs(this);
  }
}

export class SetInvVoteThresholdCall__Inputs {
  _call: SetInvVoteThresholdCall;

  constructor(call: SetInvVoteThresholdCall) {
    this._call = call;
  }

  get _invVoteThreshold(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetInvVoteThresholdCall__Outputs {
  _call: SetInvVoteThresholdCall;

  constructor(call: SetInvVoteThresholdCall) {
    this._call = call;
  }
}

export class SetMasterPlatypusCall extends ethereum.Call {
  get inputs(): SetMasterPlatypusCall__Inputs {
    return new SetMasterPlatypusCall__Inputs(this);
  }

  get outputs(): SetMasterPlatypusCall__Outputs {
    return new SetMasterPlatypusCall__Outputs(this);
  }
}

export class SetMasterPlatypusCall__Inputs {
  _call: SetMasterPlatypusCall;

  constructor(call: SetMasterPlatypusCall) {
    this._call = call;
  }

  get _masterPlatypus(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetMasterPlatypusCall__Outputs {
  _call: SetMasterPlatypusCall;

  constructor(call: SetMasterPlatypusCall) {
    this._call = call;
  }
}

export class SetMaxCapCall extends ethereum.Call {
  get inputs(): SetMaxCapCall__Inputs {
    return new SetMaxCapCall__Inputs(this);
  }

  get outputs(): SetMaxCapCall__Outputs {
    return new SetMaxCapCall__Outputs(this);
  }
}

export class SetMaxCapCall__Inputs {
  _call: SetMaxCapCall;

  constructor(call: SetMaxCapCall) {
    this._call = call;
  }

  get _maxCap(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetMaxCapCall__Outputs {
  _call: SetMaxCapCall;

  constructor(call: SetMaxCapCall) {
    this._call = call;
  }
}

export class SetNftAddressCall extends ethereum.Call {
  get inputs(): SetNftAddressCall__Inputs {
    return new SetNftAddressCall__Inputs(this);
  }

  get outputs(): SetNftAddressCall__Outputs {
    return new SetNftAddressCall__Outputs(this);
  }
}

export class SetNftAddressCall__Inputs {
  _call: SetNftAddressCall;

  constructor(call: SetNftAddressCall) {
    this._call = call;
  }

  get _nft(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetNftAddressCall__Outputs {
  _call: SetNftAddressCall;

  constructor(call: SetNftAddressCall) {
    this._call = call;
  }
}

export class SetWhitelistCall extends ethereum.Call {
  get inputs(): SetWhitelistCall__Inputs {
    return new SetWhitelistCall__Inputs(this);
  }

  get outputs(): SetWhitelistCall__Outputs {
    return new SetWhitelistCall__Outputs(this);
  }
}

export class SetWhitelistCall__Inputs {
  _call: SetWhitelistCall;

  constructor(call: SetWhitelistCall) {
    this._call = call;
  }

  get _whitelist(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetWhitelistCall__Outputs {
  _call: SetWhitelistCall;

  constructor(call: SetWhitelistCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnstakeNftCall extends ethereum.Call {
  get inputs(): UnstakeNftCall__Inputs {
    return new UnstakeNftCall__Inputs(this);
  }

  get outputs(): UnstakeNftCall__Outputs {
    return new UnstakeNftCall__Outputs(this);
  }
}

export class UnstakeNftCall__Inputs {
  _call: UnstakeNftCall;

  constructor(call: UnstakeNftCall) {
    this._call = call;
  }
}

export class UnstakeNftCall__Outputs {
  _call: UnstakeNftCall;

  constructor(call: UnstakeNftCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
