# Bounds

While working with LootJS we often need to specify a bounding. For these cases we have `Bounds`. Bounds are similar to `NumberProvider` but with the difference, that bounds don't generate a random value but instead they test if the value is within the bounds.

When a function requires either `Bounds` we can easily rely on automatically type wrapping by passing directly a `number` or `number[]` to the function.

## Bounds

-   Syntax:
    -   `Bounds.exactly(value: number)`
    -   `Bounds.atLeast(value: number)`
    -   `Bounds.atMost(value: number)`
    -   `Bounds.between(min: number, max: number)`

```js
const condition = LootCondition.distance(10) // exactly 10
```

```js
const condition = LootCondition.distance([0, 10]) // between 0 and 10
```

```js
const condition = LootCondition.distance(Bounds.atLeast(20)) // at least 20
```
