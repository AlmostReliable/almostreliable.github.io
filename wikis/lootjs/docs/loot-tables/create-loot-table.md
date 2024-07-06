# Create a loot table

With LootJS you can simply create your own loot tables. Please note, that depending on what type of loot table you create it will not be automatically be triggered.

In this section we will create our own little loot table which may roll some rare items. We will also split the items between pools. The first pool will contain a few rare items and the second pool will have a chance to roll an epic item.

After this we will append this loot table to an existing loot table with a low chance to be rolled.

## Create the table

Create a loot table with one pool is pretty simple:

```js
LootJS.lootTables((event) => {
    event.create("lootjs:rare_equipment").createPool((pool) => {
        // ...
    })
})
```

## First pool

We want to add a some gear to the first pool but first let's take a look how such a loot entry would look like in a datapack.

### First item

This is one entry example from `minecraft:chests/end_city_treasure`. You can see the full loot table [here](https://misode.github.io/loot-table/?version=1.21&preset=chests/end_city_treasure).

```json
{
    "type": "minecraft:item",
    "name": "minecraft:diamond_leggings",
    "weight": 3,
    "functions": [
        {
            "function": "minecraft:enchant_with_levels",
            "levels": {
                "type": "minecraft:uniform",
                "min": 20,
                "max": 39
            },
            "options": "#minecraft:on_random_loot"
        }
    ]
}
```

Now let's add it:

```js
LootJS.lootTables((event) => {
    event.create("lootjs:rare_equipment").createPool((pool) => {
        // Per default it will always be `#minecraft:on_random_loot` for `enchantWithLevels`
        pool.addEntry(
            LootEntry.of("minecraft:diamond_leggings")
                .withWeight(3)
                .enchantWithLevels([20, 39])
        )
    })
})
```

### More items

Let's add some more items to the first pool.

```js
LootJS.lootTables((event) => {
    event.create("lootjs:rare_equipment").createPool((pool) => {
        pool.addEntry(
            LootEntry.of("minecraft:diamond_leggings")
                .withWeight(3)
                .enchantWithLevels([20, 39])
        )

        pool.addEntry(
            LootEntry.of("minecraft:iron_pickaxe")
                .withWeight(10)
                .enchantWithLevels([10, 19])
        )

        pool.addEntry(
            LootEntry.of("minecraft:diamond_sword")
                .withWeight(5)
                .enchantWithLevels([30, 50])
                .damage([0.3, 0.5])
        )

        pool.addEntry("minecraft:diamond_horse_armor")

        pool.addEntry(LootEntry.of("minecraft:diamond").setCount([2, 5]))
    })
})
```

## Second pool

Now let's add a special sword to the second pool. But we want to make it rare.

```js
LootJS.lootTables((event) => {
    event
        .create("lootjs:rare_equipment")
        .createPool((pool) => {
            // first pool
        })
        .createPool((pool) => {
            pool.addEntry(
                LootEntry.of("minecraft:netherite_sword").enchant((builder) => {
                    builder.withEnchantment("minecraft:sharpness", [4, 5])
                    builder.withEnchantment("minecraft:unbreaking", 3)
                    builder.withEnchantment("minecraft:knockback", 2)
                    builder.withEnchantment("minecraft:mending", 1)
                })
            )

            // Vanilla often uses an empty entry with a weight instead of `randomChance`
            // For this tutorial we will do the same.
            pool.addEntry(LootEntry.empty().withWeight(20))
        })
})
```

## Append our loot table

Now we want to add our loot table to the `minecraft:gameplay/fishing` loot table. We also will use `randomChance` for our reference to make it even more rare.

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:gameplay/fishing").firstPool((pool) => {
        pool.addEntry(
            LootEntry.reference("lootjs:rare_equipment").randomChance(0.1)
        )
    })
})
```
