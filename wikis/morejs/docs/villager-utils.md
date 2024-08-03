# VillagerUtils

## Methods

-   `isVanillaTypedTrade(trade: Trade)`
    -   Checks if given `trade` is using a vanilla trade class internally. Keep in mind that mods can do this too.
-   `isModdedTypedTrade(trade: Trade)`
-   `isCustomTypedTrade(trade: Trade)`
    -   Returns `true` for trade classes provided by `MoreJS`
-   `createSimpleTrade(input: Item | Item[], output: Item)`
-   `createCustomTrade((offer, entity, random) => {})`
-   `createStructureMapTrade(input: Item | Item[], structure: string | RegEx | string[])`
-   `createBiomeMapTrade(input: Item | Item[], biome: string | RegEx | string[])`
-   `createCustomMapTrade(input: Item | Item[], (level, entity) => {})`
-   `createEnchantedItemTrade(input: Item | Item[], output: Item)`
-   `createEnchantedItemTrade(input: Item | Item[], output: Item, enchantments: string | string[] | RegEx)`
-   `createStewTrade(input: Item | Item[])`
-   `createPotionTrade(input: Item | Item[])`
-   `getVillagerTrades(profession: string)`
    -   Returns a list of all trades for given profession
-   `getVillagerTrades(profession: string, level: number)`
    -   Returns a list of all trades for given profession and level
-   `getRandomVillagerTrade(profession: string)`
    -   Returns a random trade for given profession
-   `getRandomVillagerTrade(profession: string, level: number)`
    -   Returns a random trade for given profession and level
-   `getWandererTrades(level: number)`
    -   Returns a list of all trades for given level
-   `getRandomWandererTrade(level: number)`
    -   Returns a random trade for given level

## Usage

### Treasure map trades

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createStructureMapTrade("minecraft:diamond", "minecraft:stronghold")
    event.addTrade("minecraft:cartographer", 1, trade)
})
```

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createStructureMapTrade(
        ["minecraft:diamond", "minecraft:paper"],
        "minecraft:stronghold"
    )
    event.addTrade("minecraft:cartographer", 1, trade)
})
```

We can also use `#` to search for a tag. This works for structures and biomes.

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createBiomeMapTrade("5x minecraft:emerald", "#minecraft:is_forest")
    event.addTrade("minecraft:cartographer", 1, trade)
})
```

It's also possible to create a custom map trade by providing your own block pos. This example will get a random overworld biome and search for the position of the biome.

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createCustomMapTrade(
        ["10x minecraft:diamond", "minecraft:paper"],
        (level, entity) => {
            const rndBiome = Registry.of("worldgen/biome")
                .getValues("#minecraft:is_overworld")
                .getRandom()
            return MoreUtils.findBiome(entity.blockPosition(), level, rndBiome, 250)
        }
    )

    event.addTrade("minecraft:cartographer", 1, trade)
})
```

#### Further modify map trades

When creating a map trade we can further modify it. You can find possible map markers [here](https://minecraft.wiki/w/Map#Map_icons)

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createBiomeMapTrade("5x minecraft:emerald", "#minecraft:is_forest")
        .displayName("Nearest forest")
        .marker("banner_orange")
        .noPreview()
        .scale(4)

    event.addTrade("minecraft:cartographer", 1, trade)
})
```

### Enchanted trades

If no enchantments are provided the trade will use `#minecraft:on_traded_equipment` for the enchantments.

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createEnchantedItemTrade(
        "5x minecraft:emerald",
        "minecraft:diamond_pickaxe"
    )

    event.addTrade("minecraft:weaponsmith", 1, trade)
})
```

We can also provide which enchantments we want.

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createEnchantedItemTrade(
        "5x minecraft:emerald",
        "minecraft:diamond_pickaxe",
        "#morejs:our_cool_enchantments"
    )

    event.addTrade("minecraft:weaponsmith", 1, trade)
})
```

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createEnchantedItemTrade(
        "5x minecraft:emerald",
        "minecraft:diamond_pickaxe",
        ["minecraft:unbreaking", "minecraft:mending", "minecraft:fortune"]
    )

    event.addTrade("minecraft:weaponsmith", 1, trade)
})
```

#### Define the enchantment levels

The enchantment trade will enchant the given item by a given level or levels. We can set them by `.levels()`. The default value is `[5, 20]` which is the same as vanilla uses.

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createEnchantedItemTrade(
        "5x minecraft:emerald",
        "minecraft:diamond_pickaxe"
    ).levels(10)

    event.addTrade("minecraft:weaponsmith", 1, trade)
})
```

Or we can set them by `.levels([10, 30])` if we want a random range between the two values.

```js
MoreJS.villagerTrades(event => {
    const trade = VillagerUtils.createEnchantedItemTrade(
        "5x minecraft:emerald",
        "minecraft:diamond_pickaxe"
    ).levels([10, 30])

    event.addTrade("minecraft:weaponsmith", 1, trade)
})
```
