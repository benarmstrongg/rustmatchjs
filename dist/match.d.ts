import type { MatchExprArm, MatchExprDefaultArm } from './arm';
import { matchValue, matchDefault, matchFn } from "./arm";
export declare type MatchExpr = (<I, O>(value: I, ...arms: [...MatchExprArm<I, O>[], MatchExprDefaultArm<I, O>]) => O) & {
    val: typeof matchValue;
    v: typeof matchValue;
    $: typeof matchValue;
    fn: typeof matchFn;
    f: typeof matchFn;
    $$: typeof matchFn;
    default: typeof matchDefault;
    d: typeof matchDefault;
    _: typeof matchDefault;
};
export declare const match: MatchExpr;
