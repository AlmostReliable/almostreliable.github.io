# Loot Modification Event

Event is used to create loot modifiers which are applied when a loot table is rolled. This allows us to work directly with the items generated and modify them.

## `getGlobalModifiers`

Returns a list of all registered global loot modifiers from mods.

-   Syntax:
    -   `.getGlobalModifiers()`

## `removeGlobalModifiers`

Remove all global loot modifiers from mods by given filter.

-   Syntax:
    -   `.removeGlobalModifiers(filter: string | regex)`

## `addTableModifier`

Add a new loot modifier for all loot tables which match the given filter.

-   Syntax:
    -   `.addTableModifier(filter: LootTableFilter | LootTableFilter[])`, returns a [LootModifier]

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

```js
LootJS.modifiers(event => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .addLoot("minecraft:gunpowder")
})
```

```js
LootJS.modifiers(event => {
    // Or we can also use a regex
    event
        .addTableModifier(/minecraft:chests:.*/)
        .addLoot("minecraft:gunpowder")
})
```

```js
LootJS.modifiers(event => {
    // Or we can also use a regex
    event
        .addTableModifier(LootType.CHEST)
        .addLoot("minecraft:gunpowder")
})
```

## `addEntityModifier`

Add a new loot modifier for all entities which match the given filter.

-   Syntax:
    -   `.addEntityModifier(filter: string | string[] | tag)`, returns a [LootModifier]

```js
LootJS.modifiers(event => {
    event.addEntityModifier("minecraft:creeper").addLoot("minecraft:gunpowder")
})
```

```js
LootJS.modifiers(event => {
    event
        .addEntityModifier(["minecraft:cow", "minecraft:pig"])
        .addLoot("minecraft:gold_nugget")
})
```

```js
LootJS.modifiers(event => {
    event.addEntityModifier("#minecraft:skeletons").addLoot("minecraft:stick")
})
```

## `addBlockModifier`

Add a new loot modifier for all blocks which match the given filter.

-   Syntax:
    -   `.addBlockModifier(filter: string | string[] | regex | tag)`, returns a [LootModifier]

```js
LootJS.modifiers(event => {
    event.addBlockModifier("minecraft:iron_ore").addLoot("minecraft:iron_nugget")
})
```

```js
LootJS.modifiers(event => {
    event
        .addBlockModifier(["minecraft:gravel", "minecraft:dirt"])
        .addLoot("minecraft:gold_nugget")
})
```

```js
LootJS.modifiers(event => {
    event.addBlockModifier("#c:ores").addLoot("minecraft:flint")
})
```

[LootModifier]: /api/loot-modifier
