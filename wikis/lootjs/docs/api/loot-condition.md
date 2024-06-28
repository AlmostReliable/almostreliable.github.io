# Conditions

While conditions can be used in different ways, from now on the examples on this page will shown with `LootEntries` but they can easily be used in other places.

## `matchTool`

Matches the tool, the player used to destroy the block. This is only set when destroying blocks. When working with block loot, prefer `matchTool` over `matchMainHand`.

-   Syntax:
    -   `.matchTool(filter: ItemPredicate | ItemFilter | Item)`_<sub>, see [ItemFilter] & [ItemPredicate]</sub>_
    -   `LootCondition.matchTool(filter: ItemPredicate | ItemFilter | Item)`

## `matchMainHand`

Matches the main hand item of the player by given [ItemFilter] or [Ingredient]

-   Syntax:
    -   `.matchMainHand(filter: ItemFilter | Item)`_<sub>, see [ItemFilter]</sub>_
    -   `LootCondition.matchMainHand(filter: ItemFilter | Item)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchMainHand("#minecraft:pickaxes")
})
```

## `matchOffHand`

Matches the off hand item of the player by given [ItemFilter] or [Ingredient]

-   Syntax:
    -   `.matchOffHand(filter: ItemFilter | Item)`_<sub>, see [ItemFilter]</sub>_
    -   `LootCondition.matchOffHand(filter: ItemFilter | Item)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchOffHand("#minecraft:pickaxes")
})
```

## `matchEquip`

Matches the equipment from a slot of the player by given [ItemFilter] or [Ingredient].<br>
Possible slots are: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"`, `"feet"`.

-   Syntax:
    -   `.matchEquip(slot, filter: ItemFilter | Item)`_<sub>, see [ItemFilter]</sub>_
    -   `LootCondition.matchEquip(slot, filter: ItemFilter | Item)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchEquip("mainhand", "#minecraft:pickaxes")
})
```

## `survivesExplosion`

Matches if the item survives an explosion. Calculated by probability of `random_number < (1 / explosion_radius)`, where `random_number` is a random generated number between 0 and 1. If no explosion happens, it will always survive.

-   Syntax:
    -   `.survivesExplosion()`
    -   `LootCondition.survivesExplosion()`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.survivesExplosion()
})
```

## `checkTime`

Compares the current day time (`24000 * day_count + day_time`) against given values.

-   Syntax:
    -   `.checkTime(min: number, max: number)`
    -   `.checkTime(period: number, min: number, max: number)`
    -   `LootCondition.checkTime(min: number, max: number)`
    -   `LootCondition.checkTime(period: number, min: number, max: number)`<br>
        If period is provided, `day_time` will be reduced modulo by given `period`. Setting this to _24000_ simulates a full day check. _Default is 24000, if not provided_

```js
LootEntry.of("minecraft:diamond").when((c) => {
    // Will match if the current day time is between 0 and 9000.
    c.checkTime(0, 9000)
})
```

```js
LootEntry.of("minecraft:diamond").when((c) => {
    // Will match the first day of the week. (If we go with 7 days per minecraft "week")
    c.checkTime(24000 * 7, 0, 24000)
})
```

## `weatherCheck`

Matches the current weather

-   Syntax:
    -   `.weatherCheck(isRaining: boolean | null, isThundering: boolean | null)`
    -   `LootCondition.weatherCheck(isRaining: boolean | null, isThundering: boolean | null)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.weatherCheck(true, false) // Matches if it is raining and not thundering
})
```

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.weatherCheck(true, null) // Matches if it is raining
})
```

## `randomChance`

Matches if a random number between 0 and 1 is lower than the given value

-   Syntax:
    -   `.randomChance(chance: number)`
    -   `LootCondition.randomChance(chance: number)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.randomChance(0.5) // 50% chance
})
```

## `randomTableBonus`

Passes with probability picked from a list of probabilities, indexed by enchantment power. Mainly used for block drops, because a `tool` is required.

-   Syntax:
    -   `LootCondition.randomTableBonus(enchantment: Enchantment, probabilities: number[])`

```js
LootEntry.of("minecraft:diamond").randomTableBonus(
    "minecraft:fortune",
    [0, 0.33, 0.66, 1.0],
)
```

## `randomChanceWithEnchantment`

Passes with probability picked from a list of probabilities, indexed by enchantment power. Mainly used for fishing and entity drops, because an `attacker` is required.

-   Syntax:
    -   `.randomChanceWithEnchantment(chance: number, probabilities: number[])`
    -   `LootCondition.randomChanceWithEnchantment(chance: number, probabilities: number[])`

```js
LootEntry.of("minecraft:diamond").randomChanceWithEnchantment(
    "minecraft:looting",
    [0, 0.33, 0.66, 1.0],
)
```

## `biome`

Matches if the player is in the given biome

-   Syntax:
    -   `.biome(...biomes: id | tag)`
    -   `LootCondition.biome(...biomes: id | tag)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.biome("minecraft:jungle")
})
```

## `anyBiome`

Matches if the player is in one of the given biomes

-   Syntax:
    -   `.anyBiome(...biome: id | tag)`
    -   `LootCondition.anyBiome(...biome: id | tag)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.anyBiome("minecraft:jungle", "#minecraft:is_forest")
})
```

## `anyDimension`

Matches if the player is in one of the given dimensions

-   Syntax:
    -   `.anyDimension(...dimension: id | tag)`
    -   `LootCondition.anyDimension(...dimension: id | tag)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.anyDimension("minecraft:overworld")
})
```

## `anyStructure`

Matches if the player is in one of the given structures. <br>
If `exact` is set to `true`, it will check if the player is inside the structure parts (like houses in a village). Otherwise it will just check if the player is within the structure bounds.

-   Syntax:
    -   `.anyStructure(structure: (id | tag)[], exact: boolean)`
    -   `LootCondition.anyStructure(structure: (id | tag)[], exact: boolean)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.anyStructure(["minecraft:stronghold", "minecraft:village"], false)
})
```

## `lightLevel`

Matches if the player is in the given light level

-   Syntax:
    -   `.lightLevel(min: number, max: number)`
    -   `LootCondition.lightLevel(min: number, max: number)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.lightLevel(0, 15)
})
```

## `luck`

Matches if the player has the given luck level

-   Syntax:
    -   `.luck(level: Bounds)`
    -   `LootCondition.luck(level: Bounds)`

## `killedByPlayer`

Matches if an entity was killed by the player

-   Syntax:
    -   `.killedByPlayer()`
    -   `LootCondition.killedByPlayer()`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.killedByPlayer()
})
```

## `matchEntity`

Matches against the entity that died, opened the chest or destroyed the block.

-   Syntax:
    -   `.matchEntity(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchEntity(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchEntity(Predicates.entity().isCrouching(true))
})
```

## `matchDirectKiller`

Matches against the direct entity which caused the death, e.g. the arrow entity, not the shooter.

-   Syntax:
    -   `.matchDirectKiller(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchDirectKiller(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchDirectKiller(Predicates.entity().isCrouching(true))
})
```

## `matchKiller`

Matches against the entity which caused the death.

-   Syntax:
    -   `.matchKiller(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchKiller(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchKiller(Predicates.entity().isCrouching(true))
})
```

## `matchPlayer`

Matches against the player. If a player kills another player, it will check against the killer.

-   Syntax:
    -   `.matchPlayer(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchPlayer(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchPlayer(Predicates.entity().isCrouching(true))
})
```

## `customPlayerCheck`

Custom callback predicate to check the player. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.customPlayerCheck((player) => {})`_<sub>, where player is the actual player</sub>_
    -   `LootCondition.customPlayerCheck((player) => {})`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.customPlayerCheck((player) => {
        // We are working with the actual player here
        return player.getMaxHealth() > 20
    })
})
```

## `customEntityCheck`

Custom callback predicate to check the entity. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.customEntityCheck((entity) => {})`_<sub>, where entity is the actual entity</sub>_
    -   `LootCondition.customEntityCheck((entity) => {})`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.customEntityCheck((entity) => {
        // We are working with the actual entity here
        return entity.getMaxHealth() > 20
    })
})
```

## `customKillerCheck`

Custom callback predicate to check the killer. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.customKillerCheck((entity) => {})`_<sub>, where entity is the actual entity</sub>_
    -   `LootCondition.customKillerCheck((entity) => {})`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.customKillerCheck((entity) => {
        // We are working with the actual entity here
        return entity.getMaxHealth() > 20
    })
})
```

## `customDirectKillerCheck`

Custom callback predicate to check the direct killer. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.customDirectKillerCheck((entity) => {})`_<sub>, where entity is the actual entity</sub>_
    -   `LootCondition.customDirectKillerCheck((entity) => {})`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.customDirectKillerCheck((entity) => {
        // We are working with the actual entity here
        return entity.getMaxHealth() > 20
    })
})
```

## `matchDamageSource`

Matches if the damage source is of the given type

-   Syntax:
    -   `.matchDamageSource(predicate: DamageSourcePredicate)` _<sub>, see [DamageSourcePredicate]</sub>_
    -   `LootCondition.matchDamageSource(predicate: DamageSourcePredicate)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchDamageSource(
        Predicates.damageSource()
            .is("minecraft:falling_block")
            .isNot("minecraft:magic")
            .direct(Predicates.entity().isCrouching(true))
            .source(Predicates.entity().isCrouching(true)),
    )
})
```

## `distance`

Matches if the player is within the given distance

-   Syntax:
    -   `.distance(distance: Bounds)`_<sub>, see [Bounds]</sub>_
    -   `LootCondition.distance(distance: Bounds)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.distance(10)
})
```

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.distance(0, 100)
})
```

## `customDistance`

Matches if the player is within the given distance

-   Syntax:
    -   `.customDistance(predicate: DistancePredicate)`_<sub>, see [DistancePredicate]</sub>_
    -   `LootCondition.customDistance(predicate: DistancePredicate)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.customDistance(Predicate.distance().absolute(Bounds.atLeast(50)))
})
```

## `blockEntity`

Match the given block entity. Must return either `true` or `false`.

-   Syntax:
    -   `.blockEntity((blockEntity) => {})`
    -   `LootCondition.blockEntity((blockEntity) => {})`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.blockEntity((blockEntity) => {
        // We are working with the actual block entity here.
        // Return either true or false to match or not
    })
})
```

## `matchAllOf`

Will match if all the given conditions match. False otherwise.

-   Syntax:
    -   `.matchAllOf((container) => {})`
    -   `LootCondition.matchAllOf(condition1, condition2, ...)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchAllOf((conditions) => {
        conditions.matchMainHand("#minecraft:pickaxes")
           .randomChance(0.5)
           .survivesExplosion()
           .biome(#minecraft:forest);
    });
});
```

Using `LootCondition.matchAllOf` directly to create the condition.

```js
const ourAndCondition = LootCondition.matchAllOf(
    LootCondition.matchMainHand("#minecraft:pickaxes"),
    LootCondition.randomChance(0.5),
    LootCondition.survivesExplosion(),
    LootCondition.biome("#minecraft:forest"),
)

LootEntry.of("minecraft:diamond").when((c) => {
    c.addCondition(ourAndCondition)
})
```

## `matchAnyOf`

Will match if one of the given conditions match. False otherwise.

-   Syntax:
    -   `.matchAnyOf((container) => {})`
    -   `LootCondition.matchAnyOf(condition1, condition2, ...)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.matchAnyOf((conditions) => {
        conditions
            .matchMainHand("#minecraft:pickaxes")
            .randomChance(0.5)
            .survivesExplosion()
            .biome("#minecraft:forest")
    })
})
```

Using `LootCondition.matchAnyOf` directly to create the condition.

```js
const ourOrCondition = LootCondition.matchAnyOf(
    LootCondition.matchMainHand("#minecraft:pickaxes"),
    LootCondition.randomChance(0.5),
    LootCondition.survivesExplosion(),
    LootCondition.biome("#minecraft:forest"),
)

LootEntry.of("minecraft:diamond").when((c) => {
    c.addCondition(ourOrCondition)
})
```

## `jsonCondition`

Create a condition directly from JSON. This is useful to load conditions from other mods.

-   Syntax:
    -   `.jsonCondition(json)`
    -   `LootCondition.fromJson(json)`

```js
LootEntry.of("minecraft:diamond").when((c) => {
    c.jsonCondition({
        condition: "minecraft:match_tool",
        predicate: {
            enchantments: [
                {
                    enchantment: "minecraft:silk_touch",
                    levels: {
                        min: 1,
                    },
                },
            ],
        },
    })
})
```

[EntityPredicate]: /api/predicates#entity-predicate
[ItemPredicate]: /api/predicates#item-predicate
[DamageSourcePredicate]: /api/predicates#damagesource-predicate
[DistancePredicate]: /api/predicates#distance-predicate
[ItemFilter]: /api/item-filter
[Ingredient]: https://wiki.latvian.dev
[Bounds]: /api/bounds
