import type { MatchExprArm, MatchExprDefaultArm, MatchExprArmMatcher, MatchExprArmMatcherFn } from './arm';
import { matchValue, matchDefault, matchFn } from "./arm";

export type MatchExpr = (<I, O> (value: I, ...arms: [...MatchExprArm<I, O>[], MatchExprDefaultArm<I, O>]) => O) & {
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

export const match: MatchExpr = <I, O>(value: I, ...arms: [...MatchExprArm<I, O>[], MatchExprDefaultArm<I, O>]) => {
    function isConditinalMatcher(matcher: MatchExprArmMatcher<I>): matcher is MatchExprArmMatcherFn<I> {
        return (matcher as MatchExprArmMatcherFn<I>).__rustmatchjsIsConditionalMatcher === true;
    }
    const defaultArm = arms.pop()!;
    const matchingArm = arms.find(arm => isConditinalMatcher(arm.matcher) ?
        arm.matcher.fn(value)
        : arm.matcher === value
    );
    const getResult = (arm: MatchExprArm<I, O>) => {
        return typeof arm.res === 'function' ? (arm.res as ((val: I) => O))(value) : arm.res;
    }
    return getResult(matchingArm || defaultArm);
}
match.val = matchValue;
match.v = matchValue;
match.$ = matchValue;
match.default = matchDefault;
match.d = matchDefault;
match._ = matchDefault;
match.fn = matchFn;
match.f = matchFn;
match.$$ = matchFn;