# rustmatchjs

![bundle size](https://img.badgesize.io/benarmstrongg/rustmatchjs/main/dist/index.js?compression=gzip)

Rust `match` is cool. I wish it were in js.

This package provides a set of functions to replicate the Rust language's `match` expression. Unlike the `switch` statement in Javascript, `match` is an expression, which makes it perfect for conditionally assigning one value based on another in a readable way.

The first matching arm will be executed and its value returned. Thanks to some magic from Typescript, this can come kinda close to Rust `match`. The input type, `I`, will be inferred from the first argument and passed into arms' callback functions. The output type, `O`, will be inferred from the type or return type of the first arm's `res` arg. Finally, a default arm *must* be included as the last argument. Since Typescript can't make sure your branches are exhaustive, this ensures some value is always returned.

Sample:
```typescript
const message = match(response.code,
    match.val(200, 'Fetched successfully!'),
    match.val(404, code => {
        console.log('Not found');
        return '404 :0';
    }),
    match.fn(code => code >= 500 && code < 600, code => {
        console.log(`Server error ${code}. Err: ${response.error}`);
        return 'Not your fault friend';
    }),
    match.default(_ => 'What is this?')
);
```

Each sub-method also comes with 2 shorthand aliases.
```typescript
const tags = match(product, 
    // val
    match.v({ ...product, id: 8005882300 }, (product) => {
        console.log('Empire');
        return ['t-shirts', 'long sleeve tees', 'today']
    }),
    match.$({ ...product, noTags: true }, (product) => []),
    // fn
    match.f(product => product.description.includes('summer'), ['summer', 'outdoor', 'sale']),
    match.$$(product => {
            const isTv = product.description === 'This is a TV.';
            if (isTv) {
                console.log('remove this from the store its a clothing store');
                return true;
            }
            return false;
        }, product => ['hidden', product.name]
    ),
    // default
    match.d(_ => ['untagged']),
    match._(_ => [])
);
```