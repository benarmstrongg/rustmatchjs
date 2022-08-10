import type { MatchExprArm, MatchExprDefaultArm } from './arm';
import { matchValue, matchDefault, matchFn } from "./arm";
export declare type MatchExpr = (<I, O>(value: I, ...arms: [...MatchExprArm<I, O>[], MatchExprDefaultArm<I, O>]) => O) & {
    val: typeof matchValue;
    fn: typeof matchFn;
    default: typeof matchDefault;
    _: typeof matchDefault;
};
export declare const match: MatchExpr;
