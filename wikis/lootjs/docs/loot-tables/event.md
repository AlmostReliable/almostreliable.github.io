# Loot Table Event

This event allows you to modify loot tables directly. To read more about the differences between the two main events, check out the [event difference page](/difference).

The event fires after other mods inject their loot changes into vanilla tables allowing you to remove or update them.

## Loot Tables

### `getLootTableIds`

Returns an array of all available loot table ids. Can optionally be filtered.

-   Syntax:
    -   `getLootTableIds()`
    -   `getLootTableIds(filter: string | regex)`

::: code-group

```js [Without Filter]
LootJS.lootTables(event => {
    let ids = event.getLootTableIds()
})
```

```js [With Filter]
LootJS.lootTables(event => {
    let ids = event.getLootTableIds(/.*chests\/.*/)
})
```

:::

### `getLootTable`

Returns a [loot table] by the given id or `null` if no loot table is found.

-   Syntax:
    -   `getLootTable(id: string)`

```js
LootJS.lootTables(event => {
    let table = event.getLootTable("minecraft:chests/simple_dungeon")
})
```

### `hasLootTable`

Returns whether the loot table with the given id exists.

-   Syntax:
    -   `hasLootTable(id: string)`

```js
LootJS.lootTables(event => {
    let exists = event.hasLootTable("minecraft:chests/simple_dungeon")
})
```

### `clearLootTables`

Clears all loot tables matching the given filter.

Alternatively, you can call `.clear()` directly on the loot table object obtained from `getLootTable`.

-   Syntax:
    -   `clearLootTables(filter: string | regex)`

```js
LootJS.lootTables(event => {
    event.clearLootTables(/.*chests.*/)
})
```

### `create`

Creates a new [loot table].

-   Syntax:
    -   `create(id: string, type?: LootType)`, _defaults to `LootType.CHEST` if not provided_

```js
LootJS.lootTables(event => {
    event.create("lootjs:table1", LootType.ENTITY).createPool(pool => {
        // edit the pool
    })

    // uses default type
    event.create("lootjs:table2").createPool(pool => {
        // edit the pool
    })
})
```

### `modifyLootTables`

Returns all [loot table]s matching the given filters as a compound. The compound allows you to modify all loot tables at once.

Alternatively, you can filter by loot table type. Loot table types are defined under the `type` key within the table JSON. As an example, the loot table `minecraft:blocks/bricks` in the JSON below uses `block` as its type in line 2.

```json
{
    "type": "minecraft:block", // [!code focus]
    "pools": [
        {
            // ...
        }
    ],
    "random_sequence": "minecraft:blocks/bricks"
}
```

-   Syntax:
    -   `modifyLootTables(filter: LootTableFilter | LootTableFilter[])`

A `LootTableFilter` can be a string, regex, or a `LootType`.

```ts
enum LootType {
    CHEST,
    BLOCK,
    ENTITY,
    EQUIPMENT,
    FISHING,
    ARCHAEOLOGY,
    GIFT,
    VAULT,
    SHEARING,
    PIGLIN_BARTER,
}
```

::: code-group

```js [Single Filter]
LootJS.lootTables(event => {
    event.modifyLootTables(/.*chests\/.*/).createPool(pool => {
        // edit the pool
    })

    event.modifyLootTables(LootType.CHEST).createPool(pool => {
        // edit the pool
    })
})
```

```js [Multiple Filters]
LootJS.lootTables(event => {
    event.modifyLootTables(LootType.CHEST, "minecraft:gameplay/fishing").createPool(pool => {
        // edit the pool
    })

    event.modifyLootTables(LootType.CHEST, LootType.ENTITY).createPool(pool => {
        // edit the pool
    })
})
```

:::

## Block Loot Tables

### `getBlockTable`

Returns a [loot table] for the given block or `null` if no loot table is found.

-   Syntax:
    -   `getBlockTable(block: string | Block)`

```js
LootJS.lootTables(event => {
    let table = event.getBlockTable("minecraft:diamond_ore")
})
```

### `modifyBlockTables`

Returns all [loot table]s matching the given blocks as a compound. The compound allows you to modify all loot tables at once.

> [!IMPORTANT]
> Because of the load order of Minecraft since **1.21**, loot tables are loaded before tags exist. It's not possible to use `modifyBlockTables` with a tag.
>
> If you need to modify by tags, consider using the [loot modifier event].

-   Syntax:
    -   `modifyBlockTables(filter: string | string[] | Block | Block[])`

::: code-group

```js [Single Filter]
LootJS.lootTables(event => {
    event.modifyBlockTables("minecraft:diamond_ore").createPool(pool => {
        // edit the pool
    })
})
```

```js [Multiple Filters]
LootJS.lootTables(event => {
    event.modifyBlockTables("minecraft:diamond_ore", "minecraft:emerald_ore").createPool(pool => {
        // edit the pool
    })
})
```

:::

## Entity Loot Tables

### `getEntityTable`

Returns a [loot table] for the given entity or `null` if no loot table is found.

-   Syntax:
    -   `getEntityTable(entity: string | EntityType)`

```js
LootJS.lootTables(event => {
    let table = event.getEntityTable("minecraft:sheep")
})
```

### `modifyEntityTables`

Returns all [loot table]s matching the given entities as a compound. The compound allows you to modify all loot tables at once.

> [!IMPORTANT]
> Because of the load order of Minecraft since **1.21**, loot tables are loaded before tags exist. It's not possible to use `modifyEntityTables` with a tag.
>
> If you need to modify by tags, consider using the [loot modifier event].

-   Syntax:
    -   `modifyEntityTables(filter: string | string[] | EntityType | EntityType[])`

::: code-group

```js [Single Filter]
LootJS.lootTables(event => {
    event.modifyEntityTables("minecraft:sheep").createPool(pool => {
        // edit the pool
    })
})
```

```js [Multiple Filters]
LootJS.lootTables(event => {
    event.modifyEntityTables("minecraft:sheep", "minecraft:pig").createPool(pool => {
        // edit the pool
    })
})
```

:::

<!-- Links -->

[loot table]: /api/loot-table
[loot modifier event]: /loot-modifiers/event
