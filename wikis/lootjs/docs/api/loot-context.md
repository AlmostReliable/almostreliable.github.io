# LootContext

A loot context contains all information of the current rolled loot table. You can retrieve information about the block which was destroyed, the entity which was killed, etc.

## `getId`

Get the id of the loot table which was rolled.

-   Syntax:
    -   `.getId()`
    -   `.id`

## `isType`

Checks the type of the loot table. Valid types are `chest`, `block`, `entity`, `fishing`, `archaeology`, `gift`, `vault`, `shearing`, `piglin_barter`

-   Syntax:
    -   `.isType(type: LootType)`

## `getType`

Get the type of the loot table which was rolled.

-   Syntax:
    -   `.getType()`
    -   `.type`

## `getPosition`

Get the position where the loot table was rolled. When opening a chest it's the position of the chest, when killing an entity it's the position of the entity, etc.

-   Syntax:
    -   `.getPosition()`, returns a `Vec3` with `x`, `y` and `z` values
    -   `.position`

## `getEntity`

May return `null`, depending on the type of the loot table.

-   Syntax:
    -   `.getEntity()`
    -   `.entity`

```js
LootJS.modifiers(event => {
    event.addTableModifier(LootType.CHEST).customAction((context, loot) => {
        console.log(context.entity)
    })
})
```

## `getAttackingEntity`

May return `null`, depending on the type of the loot table.

-   Syntax:
    -   `.getAttackingEntity()`
    -   `.attackingEntity`

```js
LootJS.modifiers(event => {
    event.addTableModifier(LootType.ENTITY).customAction((context, loot) => {
        console.log(context.attackingEntity)
    })
})
```

## `getDamageSource`

May return `null`, depending on the type of the loot table.

-   Syntax:
    -   `.getDamageSource()`
    -   `.damageSource`

```js
LootJS.modifiers(event => {
    event..addTableModifier(LootType.ENTITY).customAction((context, loot) => {
        console.log(context.damageSource)
    })
})
```

## `getTool`

-   Syntax:
    -   `.getTool()`
    -   `.tool`

```js
LootJS.modifiers(event => {
    event..addTableModifier(LootType.BLOCK).customAction((context, loot) => {
        console.log(context.tool)
    })
})
```

## `isExploded`

-   Syntax:
    -   `.isExploded()`

## `getExplosionRadius`

-   Syntax:
    -   `.getExplosionRadius()`
    -   `.explosionRadius`

## `getRandom`

Can be used for further randomization.

-   Syntax:
    -   `.getRandom()`
    -   `.random`

## `getLuck`

-   Syntax:
    -   `.getLuck()`
    -   `.luck`

## `getLevel`

-   Syntax:
    -   `.getLevel()`
    -   `.level`

## `getServer`

-   Syntax:
    -   `.getServer()`
    -   `.server`
