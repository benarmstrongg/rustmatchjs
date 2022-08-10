import type { MatchExprArm, MatchExprDefaultArm, MatchExprArmMatcher, MatchExprArmMatcherFn } from './arm';
import { matchValue, matchDefault, matchFn } from "./arm";

export type MatchExpr = (<I, O> (value: I, ...arms: [...MatchExprArm<I, O>[], MatchExprDefaultArm<I, O>]) => O) & {
    val: typeof matchValue;
    fn: typeof matchFn;
    default: typeof matchDefault;
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
match.fn = matchFn;
match.default = matchDefault;
match._ = matchDefault;