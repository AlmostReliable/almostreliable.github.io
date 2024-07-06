# Event Overview

The loot tables event contains multiple functions to modify or create new loot tables. The most common use is to add or remove items from existing loot tables, but it's also possible to remove existing conditions e. g changing the probability of an item.

## `getLootTableIds`

-   Returns an array of all loot table ids as `ResourceLocation`.
-   Example:

```js
LootJS.lootTables((event) => {
    let ids = event.getLootTableIds()

    // or

    let filteredIds = event.getLootTableIds(/.*chests\/.*/)
})
```

## `hasLootTable`

Returns `true` if the loot table with the given id exists.

-   Example:

```js
LootJS.lootTables((event) => {
    let exists = event.hasLootTable("minecraft:chests/simple_dungeon")
})
```

## `getLootTable`

Returns a mutable loot table by the given id which can be modified. Will return `null` if no loot table with the given id exists.

-   Syntax:
    -   `.getLootTable(id)`
-   Example:

```js
LootJS.lootTables((event) => {
    let table = event.getLootTable("minecraft:chests/simple_dungeon")
})
```

## `modifyLootTables`

Modify all matching loot tables by given filter.

-   Syntax:
    -   `.modifyLootTables(filter)`
-   Example:

```js
LootJS.lootTables((event) => {
    event.modifyLootTables(/.*chests\/.*/).createPool((pool) => {
        // editing the pool
    })
})
```

## `getBlockTable`

Returns a mutable loot table for the given block which can be modified. Will return `null` if no loot table found.

-   Syntax:
    -   `.getBlockTable(block)`
-   Example:

```js
LootJS.lootTables((event) => {
    let table = event.getBlockTable("minecraft:diamond_ore")
})
```

## `modifyBlockTables`

Modify all matching block loot by given filter.

-   Syntax:
    -   `.modifyBlockTables(filter: Block | Block[] | tag)`
-   Example:

```js
LootJS.lootTables((event) => {
    event.modifyBlockTables("minecraft:diamond_ore").createPool((pool) => {
        // editing the pool
    })
})
```

```js
LootJS.lootTables((event) => {
    event
        .modifyBlockTables(["minecraft:diamond_ore", "minecraft:emerald_ore"])
        .createPool((pool) => {
            // editing the pool
        })
})
```

```js
LootJS.lootTables((event) => {
    event.modifyBlockTables("#minecraft:logs").createPool((pool) => {
        // editing the pool
    })
})
```

## `getEntityTable`

Returns a mutable loot table for the given entity which can be modified. Will return `null` if no loot table found.

-   Syntax:
    -   `.getEntityTable(entity)`
-   Example:

```js
LootJS.lootTables((event) => {
    let table = event.getEntityTable("minecraft:sheep")
})
```

## `modifyEntityTables`

Modify all matching entity loot by given filter.

-   Syntax:
    -   `.modifyEntityTables(filter: Entity | Entity[] | tag)`
-   Example:

```js
LootJS.lootTables((event) => {
    event.modifyEntityTables("minecraft:sheep").createPool((pool) => {
        // editing the pool
    })
})
```

## `modifyLootTypeTables`

Modify all matching loot tables by given type. Loot tables mostly have a type e.g `minecraft:blocks/bricks` in line 2.

```json{2}
{
  "type": "minecraft:block",
  "pools": [
    {
      // ...
    }
  ],
  "random_sequence": "minecraft:blocks/bricks"
}
```

-   Syntax:
    -   `.modifyLootTypeTables(type: LootType | LootType[])`
-   Example:

```js
LootJS.lootTables((event) => {
    event.modifyLootTypeTables(LootType.CHEST).createPool((pool) => {
        // editing the pool
    })

    // As kubejs automatically type wraps Enums, we can just use the name of the enum
    event.modifyLootTypeTables("chest").createPool((pool) => {
        // editing the pool
    })

    // If we want to match multiple types, we can use an array
    event
        .modifyLootTypeTables([LootType.CHEST, LootType.ENTITY])
        .createPool((pool) => {
            // editing the pool
        })
})
```

## `clearLootTables`

Clear all loot tables matching the given filter.

-   Syntax:
    -   `.clearLootTables(filter: string | regex)`
-   Example:

```js
LootJS.lootTables((event) => {
    event.clearLootTables(/.*chests/.*);
});
```

Alternative to `clearLootTable` we can call `.clear()` on `MutableLootTables` ourself.

## `create`

Create a new loot table.

-   Syntax:
    -   `.create(id: string, type?: LootType)`_, default to `LootType.CHEST` if not provided_
-   Example:

```js
LootJS.lootTables((event) => {
    event.create("lootjs:table1", LootType.CHEST).createPool((pool) => {
        // editing the pool
    })

    // We can skip the type argument if we want to use the default
    event.create("lootjs:table2").createPool((pool) => {
        // editing the pool
    })
})
```

[ResourceLocationFilter]: ./test.md
[LootType]: ./test.md
