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
    -   `.addTableModifier(filter: string | string[] | regex)`, returns a [LootModifier]

```js
LootJS.modifiers((event) => {
    event
        .addTableModifier("minecraft:chests/simple_dungeon")
        .randomChance(0.5)
        .addLoot("minecraft:gunpowder")
})
```

```js
LootJS.modifiers((event) => {
    // Or we can also use a regex
    event
        .addTableModifier(/minecraft:chests:.*/)
        .randomChance(0.5)
        .addLoot("minecraft:gunpowder")
})
```

## `addTypeModifier`

Add a new loot modifier for given loot types.
Valid loot types are `chest`, `block`, `entity`, `fishing`, `archaeology`, `gift`, `vault`, `shearing`, `piglin_barter`

-   Syntax:
    -   `.addTypeModifier(type: LootType)`, returns a [LootModifier]

```js
LootJS.modifiers((event) => {
    event
        .addTypeModifier("chest")
        .randomChance(0.5)
        .addLoot("minecraft:gunpowder")
})
```

```js
LootJS.modifiers((event) => {
    // We can also use multiple ones
    event
        .addTypeModifier("block", "entity")
        .randomChance(0.5)
        .addLoot("minecraft:gunpowder")
})
```

## `addEntityModifier`

Add a new loot modifier for all entities which match the given filter.

-   Syntax:
    -   `.addEntityModifier(filter: string | string[] | tag)`, returns a [LootModifier]

```js
LootJS.modifiers((event) => {
    event
        .addEntityModifier("minecraft:creeper")
        .randomChance(0.5)
        .addLoot("minecraft:gunpowder")
})
```

```js
LootJS.modifiers((event) => {
    event
        .addEntityModifier(["minecraft:cow", "minecraft:pig"])
        .randomChance(0.5)
        .addLoot("minecraft:gold_nugget")
})
```

```js
LootJS.modifiers((event) => {
    event
        .addEntityModifier("#minecraft:skeletons")
        .randomChance(0.5)
        .addLoot("minecraft:stick")
})
```

## `addBlockModifier`

Add a new loot modifier for all blocks which match the given filter.

-   Syntax:
    -   `.addBlockModifier(filter: string | string[] | regex | tag)`, returns a [LootModifier]

```js
LootJS.modifiers((event) => {
    event
        .addEntityModifier("minecraft:iron_ore")
        .randomChance(0.5)
        .addLoot("minecraft:iron_nugget")
})
```

```js
LootJS.modifiers((event) => {
    event
        .addEntityModifier(["minecraft:gravel", "minecraft:dirt"])
        .randomChance(0.5)
        .addLoot("minecraft:gold_nugget")
})
```

```js
LootJS.modifiers((event) => {
    event
        .addEntityModifier("#c:ores")
        .randomChance(0.5)
        .addLoot("minecraft:flint")
})
```

[LootModifier]: /api/loot-modifier
