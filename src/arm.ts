export type MatchExprArm<I, O> = { matcher: MatchExprArmMatcher<I>, res: MatchExprArmValue<I, O> };
export type MatchExprDefaultArm<I, O> = MatchExprArm<I, O> & {
    res: ((_: any) => O) | O
    __rustmatchjsIsDefaultArm: true
};

export type MatchExprArmMatcher<I> = I | MatchExprArmMatcherFn<I>;
export type MatchExprArmMatcherFn<I> = { fn: (value: I) => boolean; __rustmatchjsIsConditionalMatcher: true };

export type MatchExprArmValue<I, O> = O | ((value: I) => O);

export function matchValue<I, O>(matcher: MatchExprArmMatcher<I>, res: MatchExprArmValue<I, O>): MatchExprArm<I, O> {
    return { matcher, res };
}

export function matchDefault<O>(res: ((_: any) => O) | O): MatchExprDefaultArm<any, O> {
    return { matcher: null as any, res, __rustmatchjsIsDefaultArm: true };
}

export function matchFn<I, O>(fn: (value: I) => boolean, res: MatchExprArmValue<I, O>): MatchExprArm<I, O> {
    const matcher: MatchExprArmMatcher<I> = { fn, __rustmatchjsIsConditionalMatcher: true };
    return { matcher, res };
}