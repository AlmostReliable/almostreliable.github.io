# LootEntryTransformer

`LootEntryTransformer` allows you to modify, replace or remove loot entries inside a loot table. It adds multiple functions to fit the needs of different use-cases.

Every class that implements `LootEntryTransformer` can use all listed functions in this chapter.

Following classes do implement `LootEntryTransformer`:

-   [`LootTable`](/api/loot-table)
-   [`LootPool`](/api/loot-pool)
-   [`CompositeLootEntry`](/api/loot-entry)

With `CompositeLootEntry` it's possible to have nested entries as a `CompositeLootEntry` can contain multiple other `CompositeLootEntry`. For this all functions provide a `deep` parameter that will traverse all nested entries and take action on them. If you don't want this, you can just pass `false` to the function. If `deep` is not set, it will be set to `true` by default.

As an example, using `removeItem` on a loot table will travers through all loot pools and through all entries inside them and remove all matching items.

## `removeItem`

Removes all `LootEntry` of type `LootItemEntry`.

-   Syntax:
    -   `.removeItem(filter: ItemFilter)`, _<sub>see [ItemFilter]</sub>_
    -   `.removeItem(filter: ItemFilter, deepRemove: boolean)`

```js
LootJS.lootTables((event) => {
    event
        .getLootTable("minecraft:chests/simple_dungeon")
        .removeItem(ItemFilter.hasEnchantment("minecraft:fortune"))
})
```

We also can just use a simple item id. LootJS will automatically convert it into an `ItemFilter`.

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").removeItem("minecraft:diamond")
})
```

## `removeTag`

Removes all `LootEntry` of type `LootTagEntry`.

-   Syntax:
    -   `.removeTag(tag: string)`
    -   `.removeTag(tag: string, deepRemove: boolean)`

```js
LootJS.lootTables((event) => {
    event.modifyLootTypeTables("chest").removeTag("#c:ores")
})
```

## `removeReference`

Removes all `LootEntry` of type `TableReferenceLootEntry`.

-   Syntax:
    -   `.removeReference(filter: string | regex)`
    -   `.removeReference(filter: string | regex, deepRemove: boolean)`

We remove junk from the fishing loot table, no one needs junk.

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:gameplay/fishing").removeReference("minecraft:gameplay/fishing/junk")
})
```

## `removeEntry`

Removes an entry through given filter. The filter has to **return** either `true` or `false`. When returning `true` the entry will be removed.

-   Syntax:
    -   `.removeEntry((entry) => { ... })`,
    -   `.removeEntry((entry) => { ... }, deepRemove: boolean)`

```js
LootJS.lootTables((event) => {
    // Let's remove all loot table reference entries
    event.modifyLootTables(/.*/).removeEntry((entry) => entry.isReference())
})
```

## `replaceItem`

Replaces all items that matches the filter with the given item. By replacing the item all loot conditions and item functions are kept. If you don't want this use [`modifyItem`](#) and create your own `LootEntry`.

-   Syntax:
    -   `.replaceItem(filter: ItemFilter, item: Item)`, _<sub>see [ItemFilter]</sub>_
    -   `.replaceItem(filter: ItemFilter, item: Item, deepReplace: boolean)`

```js
LootJS.lootTables((event) => {
    event.modifyLootTypeTables("chest").replaceItem(ItemFilter.)
})
```

## `modifyEntry`

Modifies all loot entries. Requires to always **return** a loot entry again. You can either return a new [`LootEntry`](/api/loot-entry) or just **return** the old one.

-   Syntax:
    -   `.modifyEntry((entry: LootEntry) => { ... })`
    -   `.modifyEntry((entry: LootEntry) => { ... }, deepModify: boolean)`

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").modifyEntry((entry) => {
        if (entry.isItem() && entry.item.id === "minecraft:string") {
            entry.setCount([5, 12])
        }

        // Remember to always return an entry!
        return entry
    })
})
```

## `modifyItem`

Same as `modifyEntry` but will only iterates through `LootItemEntry`s.

-   Syntax:
    -   `.modifyItem((entry: LootItemEntry) => { ... })`

```js
LootJS.lootTables((event) => {
    event.getLootTable("minecraft:chests/simple_dungeon").modifyItem((itemEntry) => {
        if (itemEntry.item.id === "minecraft:string") {
            itemEntry.setCount([5, 12])
        }

        // Remember to always return an entry!
        return itemEntry
    })
})
```

[ItemFilter]: /api/item-filter
