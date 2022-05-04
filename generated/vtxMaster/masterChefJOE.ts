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

export class Add extends ethereum.Event {
  get params(): Add__Params {
    return new Add__Params(this);
  }
}

export class Add__Params {
  _event: Add;

  constructor(event: Add) {
    this._event = event;
  }

  get pid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get allocPoint(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get veJoeShareBp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get lpToken(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get rewarder(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class EmergencyWithdraw extends ethereum.Event {
  get params(): EmergencyWithdraw__Params {
    return new EmergencyWithdraw__Params(this);
  }
}

export class EmergencyWithdraw__Params {
  _event: EmergencyWithdraw;

  constructor(event: EmergencyWithdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Harvest extends ethereum.Event {
  get params(): Harvest__Params {
    return new Harvest__Params(this);
  }
}

export class Harvest__Params {
  _event: Harvest;

  constructor(event: Harvest) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Init extends ethereum.Event {
  get params(): Init__Params {
    return new Init__Params(this);
  }
}

export class Init__Params {
  _event: Init;

  constructor(event: Init) {
    this._event = event;
  }

  get amount(): BigInt {
    return this._event.parameters[0].value.toBigInt();
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

export class Set extends ethereum.Event {
  get params(): Set__Params {
    return new Set__Params(this);
  }
}

export class Set__Params {
  _event: Set;

  constructor(event: Set) {
    this._event = event;
  }

  get pid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get allocPoint(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get veJoeShareBp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get rewarder(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get overwrite(): boolean {
    return this._event.parameters[4].value.toBoolean();
  }
}

export class UpdatePool extends ethereum.Event {
  get params(): UpdatePool__Params {
    return new UpdatePool__Params(this);
  }
}

export class UpdatePool__Params {
  _event: UpdatePool;

  constructor(event: UpdatePool) {
    this._event = event;
  }

  get pid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get lastRewardTimestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get lpSupply(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get accJoePerShare(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get accJoePerFactorPerShare(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class masterChefJOE__pendingTokensResult {
  value0: BigInt;
  value1: Address;
  value2: string;
  value3: BigInt;

  constructor(value0: BigInt, value1: Address, value2: string, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class masterChefJOE__poolInfoResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: Address;
  value6: BigInt;
  value7: BigInt;
  value8: BigInt;

  constructor(
    value0: Address,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: Address,
    value6: BigInt,
    value7: BigInt,
    value8: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromAddress(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromUnsignedBigInt(this.value8));
    return map;
  }
}

export class masterChefJOE__userInfoResult {
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

export class masterChefJOE extends ethereum.SmartContract {
  static bind(address: Address): masterChefJOE {
    return new masterChefJOE("masterChefJOE", address);
  }

  JOE(): Address {
    let result = super.call("JOE", "JOE():(address)", []);

    return result[0].toAddress();
  }

  try_JOE(): ethereum.CallResult<Address> {
    let result = super.tryCall("JOE", "JOE():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  MASTER_CHEF_V2(): Address {
    let result = super.call("MASTER_CHEF_V2", "MASTER_CHEF_V2():(address)", []);

    return result[0].toAddress();
  }

  try_MASTER_CHEF_V2(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "MASTER_CHEF_V2",
      "MASTER_CHEF_V2():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  MASTER_PID(): BigInt {
    let result = super.call("MASTER_PID", "MASTER_PID():(uint256)", []);

    return result[0].toBigInt();
  }

  try_MASTER_PID(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("MASTER_PID", "MASTER_PID():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  VEJOE(): Address {
    let result = super.call("VEJOE", "VEJOE():(address)", []);

    return result[0].toAddress();
  }

  try_VEJOE(): ethereum.CallResult<Address> {
    let result = super.tryCall("VEJOE", "VEJOE():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  claimableJoe(param0: BigInt, param1: Address): BigInt {
    let result = super.call(
      "claimableJoe",
      "claimableJoe(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_claimableJoe(
    param0: BigInt,
    param1: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "claimableJoe",
      "claimableJoe(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  joePerSec(): BigInt {
    let result = super.call("joePerSec", "joePerSec():(uint256)", []);

    return result[0].toBigInt();
  }

  try_joePerSec(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("joePerSec", "joePerSec():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  pendingTokens(
    _pid: BigInt,
    _user: Address
  ): masterChefJOE__pendingTokensResult {
    let result = super.call(
      "pendingTokens",
      "pendingTokens(uint256,address):(uint256,address,string,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_pid),
        ethereum.Value.fromAddress(_user)
      ]
    );

    return new masterChefJOE__pendingTokensResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toString(),
      result[3].toBigInt()
    );
  }

  try_pendingTokens(
    _pid: BigInt,
    _user: Address
  ): ethereum.CallResult<masterChefJOE__pendingTokensResult> {
    let result = super.tryCall(
      "pendingTokens",
      "pendingTokens(uint256,address):(uint256,address,string,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_pid),
        ethereum.Value.fromAddress(_user)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new masterChefJOE__pendingTokensResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toString(),
        value[3].toBigInt()
      )
    );
  }

  poolInfo(param0: BigInt): masterChefJOE__poolInfoResult {
    let result = super.call(
      "poolInfo",
      "poolInfo(uint256):(address,uint96,uint256,uint256,uint64,address,uint32,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new masterChefJOE__poolInfoResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toAddress(),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toBigInt()
    );
  }

  try_poolInfo(
    param0: BigInt
  ): ethereum.CallResult<masterChefJOE__poolInfoResult> {
    let result = super.tryCall(
      "poolInfo",
      "poolInfo(uint256):(address,uint96,uint256,uint256,uint64,address,uint32,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new masterChefJOE__poolInfoResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toAddress(),
        value[6].toBigInt(),
        value[7].toBigInt(),
        value[8].toBigInt()
      )
    );
  }

  poolLength(): BigInt {
    let result = super.call("poolLength", "poolLength():(uint256)", []);

    return result[0].toBigInt();
  }

  try_poolLength(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("poolLength", "poolLength():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalAllocPoint(): BigInt {
    let result = super.call(
      "totalAllocPoint",
      "totalAllocPoint():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_totalAllocPoint(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalAllocPoint",
      "totalAllocPoint():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userInfo(param0: BigInt, param1: Address): masterChefJOE__userInfoResult {
    let result = super.call(
      "userInfo",
      "userInfo(uint256,address):(uint256,uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return new masterChefJOE__userInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_userInfo(
    param0: BigInt,
    param1: Address
  ): ethereum.CallResult<masterChefJOE__userInfoResult> {
    let result = super.tryCall(
      "userInfo",
      "userInfo(uint256,address):(uint256,uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new masterChefJOE__userInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }
}

export class AddCall extends ethereum.Call {
  get inputs(): AddCall__Inputs {
    return new AddCall__Inputs(this);
  }

  get outputs(): AddCall__Outputs {
    return new AddCall__Outputs(this);
  }
}

export class AddCall__Inputs {
  _call: AddCall;

  constructor(call: AddCall) {
    this._call = call;
  }

  get _allocPoint(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _veJoeShareBp(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _lpToken(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _rewarder(): Address {
    return this._call.inputValues[3].value.toAddress();
  }
}

export class AddCall__Outputs {
  _call: AddCall;

  constructor(call: AddCall) {
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

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class EmergencyWithdrawCall extends ethereum.Call {
  get inputs(): EmergencyWithdrawCall__Inputs {
    return new EmergencyWithdrawCall__Inputs(this);
  }

  get outputs(): EmergencyWithdrawCall__Outputs {
    return new EmergencyWithdrawCall__Outputs(this);
  }
}

export class EmergencyWithdrawCall__Inputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EmergencyWithdrawCall__Outputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }
}

export class HarvestFromMasterChefCall extends ethereum.Call {
  get inputs(): HarvestFromMasterChefCall__Inputs {
    return new HarvestFromMasterChefCall__Inputs(this);
  }

  get outputs(): HarvestFromMasterChefCall__Outputs {
    return new HarvestFromMasterChefCall__Outputs(this);
  }
}

export class HarvestFromMasterChefCall__Inputs {
  _call: HarvestFromMasterChefCall;

  constructor(call: HarvestFromMasterChefCall) {
    this._call = call;
  }
}

export class HarvestFromMasterChefCall__Outputs {
  _call: HarvestFromMasterChefCall;

  constructor(call: HarvestFromMasterChefCall) {
    this._call = call;
  }
}

export class InitCall extends ethereum.Call {
  get inputs(): InitCall__Inputs {
    return new InitCall__Inputs(this);
  }

  get outputs(): InitCall__Outputs {
    return new InitCall__Outputs(this);
  }
}

export class InitCall__Inputs {
  _call: InitCall;

  constructor(call: InitCall) {
    this._call = call;
  }

  get _dummyToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitCall__Outputs {
  _call: InitCall;

  constructor(call: InitCall) {
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

  get _MASTER_CHEF_V2(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _joe(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _veJoe(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _MASTER_PID(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class MassUpdatePoolsCall extends ethereum.Call {
  get inputs(): MassUpdatePoolsCall__Inputs {
    return new MassUpdatePoolsCall__Inputs(this);
  }

  get outputs(): MassUpdatePoolsCall__Outputs {
    return new MassUpdatePoolsCall__Outputs(this);
  }
}

export class MassUpdatePoolsCall__Inputs {
  _call: MassUpdatePoolsCall;

  constructor(call: MassUpdatePoolsCall) {
    this._call = call;
  }
}

export class MassUpdatePoolsCall__Outputs {
  _call: MassUpdatePoolsCall;

  constructor(call: MassUpdatePoolsCall) {
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

export class SetCall extends ethereum.Call {
  get inputs(): SetCall__Inputs {
    return new SetCall__Inputs(this);
  }

  get outputs(): SetCall__Outputs {
    return new SetCall__Outputs(this);
  }
}

export class SetCall__Inputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _allocPoint(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _veJoeShareBp(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _rewarder(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _overwrite(): boolean {
    return this._call.inputValues[4].value.toBoolean();
  }
}

export class SetCall__Outputs {
  _call: SetCall;

  constructor(call: SetCall) {
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

export class UpdateFactorCall extends ethereum.Call {
  get inputs(): UpdateFactorCall__Inputs {
    return new UpdateFactorCall__Inputs(this);
  }

  get outputs(): UpdateFactorCall__Outputs {
    return new UpdateFactorCall__Outputs(this);
  }
}

export class UpdateFactorCall__Inputs {
  _call: UpdateFactorCall;

  constructor(call: UpdateFactorCall) {
    this._call = call;
  }

  get _user(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _newVeJoeBalance(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class UpdateFactorCall__Outputs {
  _call: UpdateFactorCall;

  constructor(call: UpdateFactorCall) {
    this._call = call;
  }
}

export class UpdatePoolCall extends ethereum.Call {
  get inputs(): UpdatePoolCall__Inputs {
    return new UpdatePoolCall__Inputs(this);
  }

  get outputs(): UpdatePoolCall__Outputs {
    return new UpdatePoolCall__Outputs(this);
  }
}

export class UpdatePoolCall__Inputs {
  _call: UpdatePoolCall;

  constructor(call: UpdatePoolCall) {
    this._call = call;
  }

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdatePoolCall__Outputs {
  _call: UpdatePoolCall;

  constructor(call: UpdatePoolCall) {
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

  get _pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}