# Loot Table Event

LootJS let's you modify or create loot tables through the `LootJS.lootTables` event. With this event you directly modify the loot tables, which are loaded through data packs.

The event also loads after other mods may inject their custom loot tables into vanilla ones, so you will be able to remove or update these changes.

## `getLootTableIds`

Returns an array of all loot table ids. Can also be filtered.

-   Syntax:
    -   `.getLootTableIds()`
    -   `.getLootTableIds(filter)`

```js
LootJS.lootTables((event) => {
    let ids = event.getLootTableIds()
})
```

It's also possible to filter them through regex:

```js
LootJS.lootTables((event) => {
    let ids = event.getLootTableIds(/.*chests\/.*/)
})
```

## `hasLootTable`

Will return `true` if the loot table with the given id exists.

-   Syntax:
    -   `.hasLootTable(id)`

```js
LootJS.lootTables((event) => {
    let exists = event.hasLootTable("minecraft:chests/simple_dungeon")
})
```

## `getLootTable`

Returns a loot table by the given id which can be modified. Will return `null` if no loot table found.

-   Syntax:
    -   `.getLootTable(id)`

```js
LootJS.lootTables((event) => {
    let table = event.getLootTable("minecraft:chests/simple_dungeon")
})
```

## `modifyLootTables`

Modify all matching loot tables by given filter.

-   Syntax:
    -   `.modifyLootTables(filter)`

```js
LootJS.lootTables((event) => {
    event.modifyLootTables(/.*chests\/.*/).createPool((pool) => {
        // editing the pool
    })
})
```

## `getBlockTable`

Returns a loot table for the given block which can be modified. Will return `null` if no loot table found.

-   Syntax:
    -   `.getBlockTable(block)`

```js
LootJS.lootTables((event) => {
    let table = event.getBlockTable("minecraft:diamond_ore")
})
```

## `modifyBlockTables`

Modify all matching block loot by given filter.

-   Syntax:
    -   `.modifyBlockTables(filter: Block | Block[])`

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

::: info
Because of the load order inside minecraft, since **1.21** loot tables are loaded before tags even exist. So it's not possible to use `modifyBlockTables` with a tag.

If you really need to modify by tags, consider to use the loot modifier event.
:::

## `getEntityTable`

Returns a loot table for the given entity which can be modified. Will return `null` if no loot table found.

-   Syntax:
    -   `.getEntityTable(entity: EntityType)`

```js
LootJS.lootTables((event) => {
    let table = event.getEntityTable("minecraft:sheep")
})
```

## `modifyEntityTables`

Modify all matching entity loot by given filter.

-   Syntax:
    -   `.modifyEntityTables(filter: EntityType | EntityType[])`
-   Example:

```js
LootJS.lootTables((event) => {
    event.modifyEntityTables("minecraft:sheep").createPool((pool) => {
        // editing the pool
    })
})
```

## `modifyLootTypeTables`

Modify all matching loot tables by given type. Loot tables mostly have a type e.g the loot table `minecraft:blocks/bricks` uses `block` as type in line 2.

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

Valid loot types are `chest`, `block`, `entity`, `fishing`, `archaeology`, `gift`, `vault`, `shearing`, `piglin_barter`

-   Syntax:
    -   `.modifyLootTypeTables(type: LootType | LootType[])`

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
        .modifyLootTypeTables(LootType.CHEST, LootType.ENTITY)
        .createPool((pool) => {
            // editing the pool
        })
})
```

## `clearLootTables`

Clear all loot tables matching the given filter.

-   Syntax:
    -   `.clearLootTables(filter: string | regex)`
    -

```js
LootJS.lootTables((event) => {
    event.clearLootTables(/.*chests/.*);
});
```

::: info
Alternative to `clearLootTable` we can call `.clear()` directly on our `LootTable`.
:::

## `create`

Create a new loot table.

-   Syntax:
    -   `.create(id: string, type?: LootType)`_, default to `LootType.CHEST` if not provided_

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
