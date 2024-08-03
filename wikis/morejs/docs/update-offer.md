# On update offer

## Intro

Villagers will create new offers as soon they receive their professions or they level up. Wanderers will only create offers on spawn. With the `updateOffer` event we can modify the offer before it will be added to the villager. It's also possible to cancel the event, which will prevent the offer from being added.

Event can be used by using `MoreJS.updateOffer((event) => {...})`

## Methods

-   `getEntity()`
-   `isVillager()`
-   `isWanderer()`
-   `isUnknownTrader()`
    -   Useful for custom traders from mods
-   `getVillagerData()`
    -   Will return `null` if entity is wanderer or some custom trader
-   `isProfession(profession: string)`
-   `getProfession()`
    -   Return the profession of the trader. If no profession exist return `minecraft:none`
-   `getVillagerLevel()`
    -   Return `-1` if trader doesn't have a level
-   `getAllOffers()`
    -   Returns a mutable list of all current existing offers from the trader
-   `getOffer()`
    -   Returns the offer which will be added to the trader
-   `setOffer(offer: Offer)`
-   `getUsedTrades()`
    -   Get all trades which are currently used to create offers for the entity.
-   `getRandomOffer()` or `getRandomOffer(trades: Trade[])`
    -   Create a random offer from given trades (If no trades provided, `getUsedTrades` is used automatically). This offer will not be automatically added to the trader!
-   `getVillagerTrades(profession: string)`
-   `getVillagerTrades(profession: string, int level)`
-   `getWandererTrades(int level)`
-   `getRandom()`

## Usage

### Block specific items

```js
MoreJS.updateOffer(event => {
    if (event.offer.firstCost.id === "minecraft:beetroot") {
        console.log("Blocked beetroot!")
        return event.cancel()
    }
})
```

### Change to random offer

We will remove the clay trade from the mason and replace it with a trade from the shepherd

```js
MoreJS.updateOffer(event => {
    if (event.isProfession("minecraft:mason") && event.offer.firstCost.id === "minecraft:clay_ball") {
        // Get all level 2 trades from shepherd
        const shepherdTrades = event.getVillagerTrades("minecraft:shepherd", 2)

        // Now create a random offer from these trades
        const newOffer = event.createRandomOffer(shepherdTrades)

        // Set the new offer, which will override the coal offer
        event.setOffer(newOffer)
    }
})
```

### Random offer generation

We will add a 20% chance to replace an offer with a random biome map for the cartographer

```js
MoreJS.updateOffer(event => {
    if (event.isProfession("minecraft:cartographer") && event.random.nextDouble() < 0.2) {
        const randomBiome = Registry.of("worldgen/biome")
            .getValues("#minecraft:is_overworld")
            .getRandom()
        const trade = VillagerUtils.createBiomeMapTrade(
            "minecraft:emerald_block",
            randomBiome
        ).displayName("Random biome")
        event.setOffer(trade)
    }
})
```
