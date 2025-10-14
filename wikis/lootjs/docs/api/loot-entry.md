# LootEntry

Loot entries are used to create outcome items in loot tables. They are separated into different types of entries.

-   Simple Entries:
    -   [ItemEntry]: _Adds an item to the pool roll_
    -   [EmptyEntry]: _Adds an empty entry to the pool roll_
    -   [TagEntry]: _Adds items from a tag to the pool roll_
    -   [TableReferenceEntry]: _Drops the loot of another loot table_
    -   **DynamicEntry**: _Internal use in Minecraft for Shulker Boxes. Does not work for other blocks. No need to use it ourself_
-   Composite Entries:
    -   [AlternativeEntry]: _Will only add the first child entry, where the conditions are met. This can be used to as simple if-else entry_
    -   [SequenceEntry]: _Adds all child entries until one condition fails. After that no more items will be added to the pool roll._
    -   [GroupEntry]: _All child entries will be added to the pool roll. Used for convenience, like applying one condition to multiple entries._

`LootEntry` is the base class for all entries. It offers some common functions for all entries. So when dealing with loot entries you always can use functions from `LootEntry`.

-   Methods:
    -   `.getType()`
    -   `.isSimple()`
    -   `.isItem()`
    -   `.isTag()`
    -   `.isReference()`
    -   `.isComposite()`
    -   `.isAlternative()`
    -   `.isSequence()`
    -   `.isGroup()`
    -   `.getConditions(): LootConditionsList`
    -   `.when((conditions: LootConditionsList) => { ... })`

## Simple Entries

Simple entries also can also contain [`Loot Functions`], which are executed when the entry will be rolled.

-   Methods:
    -   `.getFunctions(): LootFunctionsList`
    -   `.apply((functions: LootFunctionsList) => { ... })`
    -   `.getWeight()`
    -   `.setWeight(weight: number)`
    -   `.withWeight(weight: number)`
    -   `.getQuality()`
    -   `.setQuality(quality: number)`
    -   `.withQuality(quality: number)`

<u>Weight</u>: Determines the chance to roll relative to other entries in the pool. The chance to roll is calculated as `weight / sum(weights of all entries)`.

<u>Quality</u>: Modifies the entry weight based on the `killer_entity`'s attribute `generic.luck`. Calculated as `floor(weight + (quality * generic.luck))`

```js
// `withWeight` and `withQuality` will return self,
// so we can easily chain them
const entry = LootEntry.of("minecraft:stick").withWeight(42).withQuality(3)
```

### ItemEntry

-   Syntax:
    -   `LootEntry.of(item)`
    -   `LootEntry.of(item, count: NumberProvider)`_<sub>, see [NumberProvider]</sub>_
-   Methods:
    -   `.getItem()`
    -   `.setItem(item: Item)`
    -   `.test(filter: ItemFilter)`_<sub>, see [ItemFilter]</sub>_

```js
LootEntry.of("minecraft:diamond")

LootEntry.of("minecraft:diamond", [5, 10])
```

### EmptyEntry

-   Syntax:
    -   `LootEntry.empty()`

```js
LootEntry.empty()
```

### TagEntry

-   Syntax:
    -   `LootEntry.tag(tag: string)`
    -   `LootEntry.tag(tag: string, expanded: boolean)`
-   Methods:
    -   `.getTag()`
    -   `.setTag(tag: string)`
    -   `.setExpanded(expanded: boolean)`
    -   `.getExpanded()`
    -   `.isTag(tag: string): boolean`

```js
LootEntry.tag("minecraft:pickaxes")

LootEntry.tag("minecraft:pickaxes", true)
```

### TableReferenceEntry

-   Syntax:
    -   `LootEntry.reference(table: ResourceLocation | string)`
-   Methods:
    -   `.getLocation()`
    -   `.setLocation(table: string)`

```js
LootEntry.reference("minecraft:chests/abandoned_mineshaft")
```

## Composite Entries

-   Syntax:
    -   `LootEntry.alternative(...entries: LootEntry[])`
    -   `LootEntry.sequence(...entries: LootEntry[])`
    -   `LootEntry.group(...entries: LootEntry[])`
-   Methods:
    -   `.getEntries(): LootEntryList`
    -   `.entries((entries: LootEntryList) => { ... })`

```js
/**
 * When Entry is rolled:
 * If the randomChance for `diamond` succeeds, add `diamond`, skip rest.
 * Otherwise continue with next child
 */
LootEntry.alternative(
    LootEntry.of("minecraft:diamond").when(c => c.randomChance(0.5)),
    LootEntry.of("minecraft:emerald").when(c => c.randomChance(0.5)),
    LootEntry.of("minecraft:iron_ingot")
)
```

```js
/**
 * When Entry is rolled:
 * Add all entries until one entry fails, then skip rest
 */
LootEntry.sequence(
    LootEntry.of("minecraft:diamond").when(c => c.randomChance(0.5)),
    LootEntry.of("minecraft:emerald").when(c => c.randomChance(0.2)),
    LootEntry.of("minecraft:iron_ingot")
)
```

```js
/**
 * When Entry is rolled:
 * Handle all children by their own. Just a convenience entry.
 */
LootEntry.group(
    LootEntry.of("minecraft:diamond").when(c => c.randomChance(0.5)),
    LootEntry.of("minecraft:emerald").when(c => c.randomChance(0.2)),
    LootEntry.of("minecraft:iron_ingot")
)
```

## Add conditions

## Add functions

[ItemEntry]: #item-entry
[EmptyEntry]: #empty-entry
[TagEntry]: #tag-entry
[TableReferenceEntry]: #table-reference-entry
[AlternativeEntry]: #alternative-entry
[SequenceEntry]: #sequence-entry
[GroupEntry]: #group-entry
[`Loot Functions`]: /api/loot-function
[NumberProvider]: /api/number-provider
[ItemFilter]: /api/item-filter
