# Add trades

## Simple trade

-   Villager syntax:
    -   `.addTrade(profession: string, level: number, input: Item | Item[], output: Item)`
    -   `.addTrade(profession: string, level: number, input: TradeItem | TradeItem[], output: Item)`
-   Wanderer syntax:
    -   `.addTrade(level: number, input: Item | Item[], output: Item)`
    -   `.addTrade(level: number, input: TradeItem | TradeItem[], output: Item)`

Examples are for villagers, if you want to target wanderer please use `MoreJS.wandererTrades`.

```js
MoreJS.villagerTrades((event) => {
    event.addTrade(
        "minecraft:farmer",
        2,
        Item.of("minecraft:diamond", 10),
        "minecraft:stick"
    )

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
    event.addTrade(
        "minecraft:farmer",
        2,
        TradeItem.of("minecraft:diamond", 3, 10),
        "minecraft:stick"
    )
})
```

## Special trade

MoreJS has a util class to create some special trades, e.g. map trade, enchanted trades etc.
You can find all available trades under [`VillagerUtils`](/villager-utils).

-   Villager syntax:
    -   `.addTrade(profession: string, level: number, trade: Trade)`
-   Wanderer syntax:
    -   `.addTrade(level: number, trade: Trade)`

```js
MoreJS.villagerTrades((event) => {
    const jungleMapTrade = VillagerUtils.createBiomeMapTrade(
        "minecraft:diamond",
        "minecraft:jungle"
    )

    event.addTrade("minecraft:farmer", 1, jungleMapTrade)
})
```

## Custom trade

-   Villager syntax:
    -   `.addCustomTrade(profession: string, level: number, (offer, entity, random) => {})`
-   Wanderer syntax:
    -   `.addTrade(level: number, (offer, entity, random) => {})`

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
        offer.rewardExp = 20
    })
})
```

## Further modify trades

`.addTrade` and `.addCustomTrade` returns the created or passed trade object. You can use this object to further modify the trade. Different types of trades may offer different methods.

But all of them share one special method `.transform()`, this method allows to register a function that will be called when the trade will create a new offer.

```js
MoreJS.villagerTrades((event) => {
    event.addTrade(
        "minecraft:farmer",
        2,
        "minecraft:diamond",
        "minecraft:stick"
    )
})
```
