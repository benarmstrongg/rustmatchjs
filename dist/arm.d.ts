export declare type MatchExprArm<I, O> = {
    matcher: MatchExprArmMatcher<I>;
    res: MatchExprArmResolver<I, O>;
    __input?: I;
};
export declare type MatchExprDefaultArm<I, O> = MatchExprArm<I, O> & {
    res: (() => O) | O;
    __isDefaultArm: true;
};
export declare type MatchExprArmMatcher<I> = I | MatchExprArmMatcherFn<I>;
export declare type MatchExprArmMatcherFn<I> = {
    fn: (value: I) => boolean;
    __IsFnArm: true;
};
export declare type MatchExprArmResolver<I, O> = O | (() => O);
export declare function matchValue<I, O>(val: I, res: MatchExprArmResolver<I, O>): MatchExprArm<I, O>;
export declare function matchDefault<O>(res: ((_: any) => O) | O): MatchExprDefaultArm<any, O>;
export declare function matchFn<I, O>(fn: (value: I) => boolean, res: MatchExprArmResolver<I, O>): MatchExprArm<I, O>;
