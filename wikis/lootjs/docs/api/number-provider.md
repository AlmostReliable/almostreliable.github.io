# NumberProvider

`NumberProvider`s are used in loot tables to create a random number depending on the loot context. Minecraft itself offers three number providers, but mods can add their own.

To simplify the usage of number providers LootJS does register a type wrapper in KubeJS. 

## Constant Number

Always create a constant number.

-   Syntax:
    -   `NumberProvider.constant(value: number)`
    -   Directly passing a `number` to the function

```js
LootEntry.of("minecraft:stick").setCount(NumberProvider.constant(42))

LootEntry.of("minecraft:stick").setCount(42)
```

## Uniform Number

Creates a random number between given `min` and `max`. Min and max also can be number providers, which allows nesting.

-   Syntax:
    -   `NumberProvider.uniform(min: number, max: number)`
    -   `NumberProvider.uniform(min: NumberProvider, max: number)`
    -   `NumberProvider.uniform(min: number, max: NumberProvider)`
    -   `NumberProvider.uniform(min: NumberProvider, max: NumberProvider)`
    -   Directly passing a `number[]` with two elements to the function

```js
LootEntry.of("minecraft:stick").setCount(NumberProvider.uniform(2, 10))

LootEntry.of("minecraft:stick").setCount([2, 10])

LootEntry.of("minecraft:stick").setCount(NumberProvider.uniform(2, [10, 15]) // With nesting
```

## Binomial Distribution

Minecraft also allows to use a [binomial distribution](https://en.wikipedia.org/wiki/Binomial_distribution) to create random numbers by providing `n` and `p`.

-   Syntax:
    -   `NumberProvider.binomial(n: number, p: number)`
    -   `NumberProvider.binomial(n: NumberProvider, p: number)`
    -   `NumberProvider.binomial(n: number, p: NumberProvider)`
    -   `NumberProvider.binomial(n: NumberProvider, p: NumberProvider)`
    -   Directly passing `{ n: number, p: number }` to the function

```js
LootEntry.of("minecraft:stick").setCount(NumberProvider.binomial(10, 0.25))

LootEntry.of("minecraft:stick").setCount({ n: 10, p: 0.25 })
```
