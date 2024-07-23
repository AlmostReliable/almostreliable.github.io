# Villager Trades

## Intro

Basic event to modify villager trades. Make sure to understand the difference between a trade and an actual offer, you can read it [here](/understanding-trades)

Event can be used by using `MoreJS.villagerTrades((event) => {...})`

## Methods

-   `.addTrade(profession: string, level: number, input: Item | Item[], output: Item)`
-   `.addTrade(profession: string, level: number, trade: Trade)`
-   `.addCustomTrade(profession: string, level: number, (offer, entity, random) => {})`
-   `.removeTrade(filter: TradeFilter)`
    -   Allows better control over trade removal. See [example](#tradefilter) for usage.
-   `.removeVanillaTypedTrades(profession: string | string[], level: number | Range)`
-   `.removeVanillaTypedTrades(profession: string | string[])`
-   `.removeVanillaTypedTrades()`
-   `.removeModdedTypedTrades(professions: string | string[], level: number | Range)`
-   `.removeModdedTypedTrades(professions: string | string[])`
-   `.removeModdedTypedTrades()`

## Usage

### TradeFilter

::: info
Trade filters may not be supported by modded trades!
:::

A `TradeFilter` is an object with the following properties:

```ts
interface TradeFilter {
    first: string | Item | Ingredient
    second: string | Item | Ingredient
    output: string | Item | Ingredient
    firstCount: number | Range
    secondCount: number | Range
    outputCount: number | Range
    level: number | Range
    professions: string | string[]
}
```

All properties are optional, so you don't have to check the `second` input for example. For `Range` you can simple pass an array with two numbers, e.g. `[0, 32]`.

```js
MoreJS.villagerTrades((event) => {
    // This will remove the wheat trade from farmer level 1
    event.removeTrades({
        first: "#c:crops/wheat",
        outputCount: [0, 32],
        level: 1,
        professions: "minecraft:farmer",
    })
})
```

### Quick remove

::: info
Calling `removeVanillaTypedTrades` may also remove trades added from mods, as long they are using vanilla trade classes internally. There is no way for MoreJS to difference here.
:::

```js
MoreJS.villagerTrades((event) => {
    event.removeVanillaTypedTrades("minecraft:farmer", 2)
})
```

```js
MoreJS.villagerTrades((event) => {
    event.removeVanillaTypedTrades(["minecraft:farmer", "minecraft:worker"], 1)
})
```

```js
MoreJS.villagerTrades((event) => {
    // Removes all vanilla trades from farmer and workers
    event.removeVanillaTypedTrades(["minecraft:farmer", "minecraft:worker"], [1, 5])
})
```

### Add simple trade

```js
MoreJS.villagerTrades((event) => {
    event.addTrade("minecraft:farmer", 2, Item.of("minecraft:diamond", 10), "minecraft:stick")
})
```

```js
MoreJS.villagerTrades((event) => {
    // We can use an array with two values when we want to have two inputs for the trade
    event.addTrade(
        "minecraft:farmer",
        2,
        [Item.of("minecraft:diamond", 10), "minecraft:emerald"],
        "minecraft:stick"
    )
})
```

We also can use `TradeItem` if we want to have a random range for the costs.

```js
MoreJS.villagerTrades((event) => {
    // This will randomly pick the cost between 3 and 10
    event.addTrade("minecraft:farmer", 2, TradeItem.of("minecraft:diamond", 3, 10), "minecraft:stick")
})
```

### Add special trade

MoreJS has a util class to create some special trades, e.g. map trade, enchanted trades etc.
You can find all available trades under [`VillagerUtils`](/villager-utils).

```js
MoreJS.villagerTrades((event) => {
    const jungleMapTrade = VillagerUtils.createBiomeMapTrade("minecraft:diamond", "minecraft:jungle")

    event.addTrade("minecraft:farmer", 1, jungleMapTrade)
})
```

### Add custom trade

```js
MoreJS.villagerTrades((event) => {
    /**
     * - `offer`: The trade offer
     * - `entity`: The villager entity
     * - `random`: The random number generator
     */
    event.addCustomTrade("minecraft:farmer", 1, (offer, entity, random) => {
        offer.firstCost = "minecraft:diamond"
        offer.secondCost = "minecraft:emerald"
        offer.output = "minecraft:stick"

        offer.maxUses = 5
        offer.demand = 10
        offer.villagerExperience = 12
        offer.rewardExp = false
    })
})
```

### Further modify trades

`.addTrade` and `.addCustomTrade` returns the created or passed trade object. You can use this object to further modify the trade. Different types of trades may offer different methods.

But most of them share one special method `.transform()`, this method allows to register a function that will be called when the trade will create a new offer.

```ts
interface Offer {
    firstCost: Item
    secondCost: Item
    output: Item
    maxUses: number
    demand: number
    villagerExperience: number
    rewardExp: boolean
    isDisabled: boolean
    setDisabled(disabled: boolean): void
}
```

```js
MoreJS.villagerTrades((event) => {
    event
        .addTrade("minecraft:farmer", 2, "minecraft:diamond", "minecraft:stick")
        .transform((offer, entity, random) => {
            offer.maxUses = 42
            // etc
        })
})
```
