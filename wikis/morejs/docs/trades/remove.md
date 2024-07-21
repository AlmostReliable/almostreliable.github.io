# Remove Trades

## Removing through trade filter

Allows to remove trades by given trade filter. 
::: info
Trade filters may not be supported by modded trades!
:::

A `TradeFilter` is an object with the following properties:
```ts
interface TradeFilter {
    first: string | Item | Ingredient;
    second: string | Item | Ingredient;
    output: string | Item | Ingredient;
    firstCount: number | Range;
    secondCount: number | Range;
    outputCount: number | Range;
    level: number | Range;
    professions: string | string[];
}
```

All properties are optional, so you don't have to check the `second` input for example. For `Range` you can simple pass an array with two numbers, e.g. `[0, 32]`.

- Syntax:
    - `.removeTrades(filter: TradeFilter)`
  
```js
MoreJS.villagerTrades((event) => {
    // This will remove the wheat trade from farmer level 1
    event.removeTrades({
        first: "#c:crops/wheat",
        outputCount: [0, 32],
        level: 1,
        professions: "minecraft:farmer"
    });
});
```

For wandering traders you can use following:
```js
MoreJS.wandererTrades((event) => {
    event.removeTrades({
        first: "#c:crops/wheat",
        outputCount: [0, 32],
    });
});
```

## Quick remove

::: info 
Calling `removeVanillaTypedTrades` may also remove trades added from mods, as long they are using vanilla trade classes internally. There is no way for MoreJS to difference here.
::: 

### Villager
- Syntax:
    - `.removeVanillaTypedTrades(professions: string | string[], level: number | Range)`
    - `.removeVanillaTypedTrades(professions: string | string[])`
    - `.removeVanillaTypedTrades()`
    - `.removeModdedTypedTrades(professions: string | string[], level: number | Range)`
    - `.removeModdedTypedTrades(professions: string | string[])`
    - `.removeModdedTypedTrades()`

```js
MoreJS.villagerTrades((event) => {
    event.removeVanillaTypedTrades("minecraft:farmer", 2);
});
```

```js
MoreJS.villagerTrades((event) => {
    event.removeVanillaTypedTrades(["minecraft:farmer", "minecraft:worker"], 1);
});
```

```js
MoreJS.villagerTrades((event) => {
    // Removes all vanilla trades from farmer and workers
    event.removeVanillaTypedTrades(["minecraft:farmer", "minecraft:worker"], [1, 5]);
});
```


### Wandering Trader

Wanderer has two different levels. The first one are all common trades and the second one are for some special rare trades. 

- Syntax:
    - `.removeVanillaTypedTrades(level: number)`
    - `.removeVanillaTypedTrades()`
    - `.removeModdedTypedTrades(level: number)`
    - `.removeModdedTypedTrades()`

```js
MoreJS.wandererTrades((event) => {
    // Removes the rare trades
    event.removeVanillaTypedTrades(2);
});
```
