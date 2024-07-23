# LootPool

`LootPool` is used to define what items should be dropped through specific actions. It helps to group up loot in loot tables by using multiple different pools.

As `LootPool` extends from [`LootEntriesTransformer`](/api/loot-entries-transformer), every function from it can be applied onto loot pools.

## `getName`

Get the name of the pool. May return `null` if no name is set. Some mods will give their injected pools a name, so you can use this to identify them.

-   Syntax:
    -   `.getName()`

```js
LootJS.lootTables((event) => {
    let name = event.getLootTable("minecraft:chests/simple_dungeon").firstPool().getName()
})
```

## `name`

Sets the name of the pool.

-   Syntax:
    -   `.name(name: string)`

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").firstPool().name("example_name")
})
```

## `rolls`

Sets the number of rolls of the pool. The default value is `1`.

-   Syntax:
    -   `.rolls(rolls: NumberProvider)`,_<sub>see [NumberProvider]</sub>_

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").firstPool().rolls([1, 5]) // Will roll between 1 and 5 times
})
```

## `bonusRolls`

Sets the number of bonus rolls of the pool. The default value is `0`.

-   Syntax:
    -   `.bonusRolls(rolls: NumberProvider)`,_<sub>see [NumberProvider]</sub>_

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").firstPool().bonusRolls(1)
})
```

## `when`

Set the conditions of the pool. If no condition met the pool will be skipped. See [`LootCondition`](/api/loot-condition) for more information.

-   Syntax:
    -   `.when((conditions) => {})`

```js
LootJS.lootTables((event) => {
    event
        .getLootTable("minecraft:chests/simple_dungeon")
        .firstPool()
        .when((conditions) => {
            conditions.randomChance(0.5)
        })
})
```

## `getConditions`

Returns a list of all conditions attached to the pool. Alternative to `when`. See [`LootCondition`](/api/loot-condition) for more information.

-   Syntax:
    -   `.getConditions()`
    -   `.conditions`

```js
LootJS.lootTables((event) => {
    let conditions = event.getLootTable("minecraft:chests/simple_dungeon").firstPool().getConditions()
    conditions.add(LootCondition.randomChance(0.5))
})
```

## `apply`

Set the item loot functions of the pool. See [`LootFunction`](/api/loot-function) for more information.

-   Syntax:
    -   `.apply((functions) => {})`

```js
LootJS.lootTables((event) => {
    event
        .getLootTable("minecraft:chests/simple_dungeon")
        .firstPool()
        .apply((functions) => {
            functions.setCount([1, 25])
        })
})
```

## `getFunctions`

Returns a list of all loot item functions attached to the pool. Alternative to `apply`. See [`LootFunction`](/api/loot-function) for more information.

-   Syntax:
    -   `.getFunctions()`
    -   `.functions`

```js
LootJS.lootTables((event) => {
    let functions = event.getLootTable("minecraft:chests/simple_dungeon").firstPool().getFunctions()
    functions.add(LootFunction.setCount([1, 25]))
})
```

## `getEntries`

Returns a list of all `LootEntry` in the pool.

-   Syntax:
    -   `.getEntries()`
    -   `.entries`

```js
LootJS.lootTables((event) => {
    let entries = event.getLootTable("minecraft:chests/simple_dungeon").firstPool().getEntries()

    entries.addEntry("minecraft:apple")
})
```

## `addEntry` & `addItem`

Adds a new `LootEntry` to the pool. See [`LootEntry`](/api/loot-entry) for more information.

-   Syntax:
    -   `.addEntry(entry: LootEntry)`
    -   `.addItem(item: Item)`
    -   `.addCustomEntry(json)`

```js
LootJS.lootTables((event) => {
    event
        .getLootTable("minecraft:chests/simple_dungeon")
        .firstPool()
        .addEntry(LootEntry.of("minecraft:apple"))
})
```

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").firstPool().addEntry("minecraft:apple") // Loot JS will automatically convert it.
})
```

Or you can directly use `addItem`

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").firstPool().addItem("minecraft:apple")
})
```

[`NumberProvider`](/api/number-provider)
