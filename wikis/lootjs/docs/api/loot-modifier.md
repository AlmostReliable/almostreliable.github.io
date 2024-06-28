# Loot Modifier

Loot modifiers offers different actions which can be applied like adding loot, replacing it or even modify it. On this section you will find different actions you can use.

Besides actions you can also apply any [loot condition](/api/loot-condition) and [loot function](/api/loot-function) to the loot modifier.

## `addLoot`

-   Syntax:
    -   `.addLoot(item: string | Item | LootEntry)`, _<sub>see [LootEntry]</sub>_

```js
LootJS.modifiers((event) => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .addLoot("minecraft:gunpowder")
})
```

```js
LootJS.modifiers((event) => {
    // We can also use a loot entry. If all conditions from the entry matches, it will be added
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .addLoot(LootEntry.of("minecraft:diamond").randomChance(0.3))
})
```

```js
LootJS.modifiers((event) => {
    // We can also use multiple ones
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .addLoot("minecraft:gunpowder", "minecraft:apple")
})
```

## `addAlternativesLoot`

According to the Minecraft Wiki: Will only add the first successful (conditions are met) item to the loot pool. If no item is successful, no item will be added.

-   Syntax:
    -   `.addAlternativesLoot(....items: string | Item | LootEntry)`, _<sub>see [LootEntry]</sub>_
    -

```js
LootJS.modifiers((event) => {
    /**
     * First loot entry with a condition. Will drop if the player has fortune.
     */
    const stickWhenFortune = LootEntry.of("minecraft:stick")
        .applyOreBonus("minecraft:fortune")
        .when((c) =>
            c.matchMainHand(ItemFilter.hasEnchantment("minecraft:fortune")),
        )

    /**
     * Second loot entry with a condition. Will drop if the player has silk touch and the first entry doesn't match.
     */
    const appleWhenSilkTouch = LootEntry.of("minecraft:apple").when((c) =>
        c.matchMainHand(ItemFilter.hasEnchantment("minecraft:silk_touch")),
    )

    /**
     * No conditions just an item, so this will always drop if the other two don't.
     */
    const ironIngot = "minecraft:iron_ingot"

    event
        .addBlockLootModifier("minecraft:iron_ore")
        .removeLoot(Ingredient.all)
        .addAlternativesLoot(stickWhenFortune, appleWhenSilkTouch, ironIngot)
})
```

## `addSequenceLoot`

Will add multiple items which will be rolled one after another. According to the Minecraft Wiki, it will add all items until one condition fails. After that no more items will be added.

-   Syntax:
    -   `.addSequenceLoot(....items: string | Item | LootEntry)`, _<sub>see [LootEntry]</sub>_

```js
LootJS.modifiers((event) => {
    /**
     * First loot entry with a condition. Will drop if the player has fortune.
     */
    const stickWhenFortune = LootEntry.of("minecraft:stick").when((c) =>
        c.matchMainHand(ItemFilter.hasEnchantment("minecraft:fortune")),
    )

    /**
     * Second loot entry with a condition. Will drop if the player has silk touch.
     */
    const appleWhenEfficiency = LootEntry.of("minecraft:apple").when((c) =>
        c.matchMainHand(ItemFilter.hasEnchantment("minecraft:efficiency")),
    )

    /**
     * Simple item without conditions or anything else, will drop
     */
    const flint = "minecraft:flint"

    /**
     * Random chance is 0 so no diamond will ever drop. Just to show, that it will skip all other entries.
     */
    const diamondNoDrop = LootEntry.of("minecraft:diamond").when((c) =>
        c.randomChance(0.0),
    )

    /**
     * No conditions just an item, but this will not drop, because the previous entry failed.
     */
    const ironIngot = "minecraft:iron_ingot"

    event
        .addBlockLootModifier("minecraft:coal_ore")
        .removeLoot(Ingredient.all)
        .addSequenceLoot(
            stickWhenFortune,
            appleWhenEfficiency,
            flint,
            diamondNoDrop,
            ironIngot,
        )
})
```

## `removeLoot`

Remove all `items` which matches the given [ItemFilter].

-   Syntax:
    -   `.removeLoot(items: string | Item | LootEntry)`, _<sub>see [LootEntry]</sub>_

```js
LootJS.modifiers((event) => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .removeLoot("minecraft:string")
})
```

```js
LootJS.modifiers((event) => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .removeLoot(ItemFilter.equipmentSlot("mainhand"))
})
```

## `replaceLoot`

Replaces all `items` which matches the given [ItemFilter] with a replacement. It's also possible to preserve the original count.

-   Syntax:
    -   `.replaceLoot(item: string | Item | LootEntry, replacement: string | Item | LootEntry)`, _<sub>see [LootEntry]</sub>_
    -   `.replaceLoot(item: string | Item | LootEntry, replacement: string | Item | LootEntry, preserveCount?: boolean)`

```js
LootJS.modifiers((event) => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .replaceLoot(ItemFilter.equipmentSlot("mainhand"), "minecraft:diamond")
})
```

```js
LootJS.modifiers((event) => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .replaceLoot("#c:ores", "minecraft:gunpowder", true)
})
```

## `modifyLoot`

For every `item` in the current loot pool which matches the given [ItemFilter], a callback will be called. `LootJS` will pass the item into the callback to modify it and return the `item`. Make sure to always return an `item`!

-   Syntax:
    -   `.modifyLoot(items: string | Item | LootEntry, onModify: (item) => { ... })`, _<sub>see [LootEntry]</sub>_

```js
LootJS.modifiers((event) => {
    event.addTypeModifier("chest").modifyLoot(ItemFilter.ENCHANTED, (item) => {
        // We will remove the enchantments component from the item
        // So un-enchant it.
        item.remove("minecraft:enchantments")
        return item
    })
})
```

## `triggerLightningStrike`

Triggers a lightning strike at the position the loot is dropped at. The `items` will not be destroyed.

-   Syntax:
    -   `.triggerLightningStrike(shouldDamagePlayer: boolean)`

```js
LootJS.modifiers((event) => {
    event.addTypeModifier("chest").triggerLightningStrike(false)
})
```

## `dropExperience`

Drops an `amount` of experience on the position where the loot will be dropped.

-   Syntax:
    -   `.dropExperience(amount: NumberProvider)`, _<sub>see [NumberProvider](/api/number-provider)</sub>_

```js
LootJS.modifiers((event) => {
    event.addTypeModifier("chest").triggerLightningStrike(false)
})
```

## `pool`

Creates a loot pool, which acts as a normal pool from a loot table. See [LootPool](/api/loot-pool) for more details.

-   Syntax:
    -   `.pool(onCreate: (pool) => { ... })`, _<sub>see [LootPool](/api/loot-pool)</sub>_

```js
LootJS.modifiers((event) => {
    event.addTableModifier("minecraft:chests/simple_dungeon").pool((pool) => {
        // Work with the pool
    })
})
```

## `group`

Creates a new nested loot modifier. You can also pre-filter it, so you can only work with a subset of items.

-   Syntax:
    -   `.group(onCreate: (modifier) => { ... })`
    -   `.group(filter: ItemFilter, onCreate: (modifier) => { ... })`, _<sub>see [ItemFilter]</sub>_

```js
LootJS.modifiers((event) => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .group((modifier) => {
            // Work with the modifier
        })
})
```

## `customAction`

Adds a custom action to the loot modifier. The action gives you access to the [LootContext](/api/loot-context) and a list of items which can be used to modify the loot.

-   Syntax:
    -   `.customAction(action: (context, bucket) => { ... })`

```js
LootJS.modifiers((event) => {
    event.addTypeModifier("chest").customAction((context, loot) => {
        if (loot.hasItem("#c:ores")) {
            loot.addItem("minecraft:gunpowder")
        }
    })
})
```

[LootEntry]: /api/loot-entry
[ItemFilter]: /api/item-filter
