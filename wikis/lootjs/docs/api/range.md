# Range

While working with LootJS we often need to specify a range between two values. For these cases we have `Range`. When a function requires a `Range` we can easily rely on automatically type wrapping by passing directly a `number` or `number[]` to the function.

-   Syntax:
    -   `Range.exactly(value: number)`
    -   `Range.atLeast(value: number)`
    -   `Range.atMost(value: number)`
    -   `Range.between(min: number, max: number)`

```js
const condition = LootCondition.distance(10) // exactly 10
```

```js
const condition = LootCondition.distance([0, 10]) // between 0 and 10
```

```js
const condition = LootCondition.distance(Range.atLeast(20)) // at least 20
```
