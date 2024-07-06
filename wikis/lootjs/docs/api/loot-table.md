# LootTable

Loot tables are used dictate what items should be dropped through specific actions.

`LootTables` in LootJS extends from `LootEntriesTransformer`. See [`LootEntriesTransformer`](/api/loot-entries-transformer) for more information.

## `firstPool`

Returns the first pool inside a loot table. If no pool exist, it will create one and return it.

-   Syntax:
    -   `.firstPool()`
    -   `.firstPool((pool) => {})`

```js
LootJS.lootTables((event) => {
    let pool = event.getLootTable("minecraft:chests/simple_dungeon").firstPool()
})
```

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").firstPool((pool) => {
        // modify the pool here
    })
})
```

## `createPool`

Creates a new pool and returns it.

-   Syntax:
    -   `.createPool()`
    -   `.createPool((pool) => {})`

```js
LootJS.lootTables((event) => {
    let pool = event
        .getLootTable("minecraft:chests/simple_dungeon")
        .createPool()
})
```

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").createPool((pool) => {
        // modify the pool here
    })
})
```

## `getFunctions`

Returns a list of all [item functions](/api/loot-function) attached to the loot table.

-   Syntax:
    -   `.getFunctions()`

```js
LootJS.lootTables((event) => {
    let functions = event
        .getLootTable("minecraft:chests/simple_dungeon")
        .getFunctions()
})
```

## `onDrop`

Adds a custom callback when the loot table is rolled.

-   Syntax:
    -   `.onDrop((context, loot) => {})`

```js
LootJS.lootTables((event) => {
    event
        .getLootTable("minecraft:chests/simple_dungeon")
        .onDrop((context, loot) => {
            for (let item of loot) {
                console.log(item)
            }
        })
})
```

## `getLocation`

Get the loot table id

-   Syntax:
    -   `.getLocation()`

```js
LootJS.lootTables((event) => {
    let table = event.getLootTable("minecraft:chests/simple_dungeon")
    let location = table.getLocation() // Would return `"minecraft:chests/simple_dungeon"`
})
```

## `getLootType`

-   Syntax:
    -   `.getLootType()`

```js
LootJS.lootTables((event) => {
    let table = event.getLootTable("minecraft:chests/simple_dungeon")
    let type = table.getLootType() // Would return `LootType.CHEST`
})
```

## `clear`

Clears the loot table. This will remove all item functions and pools from the table.

-   Syntax:
    -   `.clear()`

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").clear()
})
```

## `print`

Logs the loot table. Can be used for debugging.

-   Syntax:
    -   `.print()`

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").print()
})
```
