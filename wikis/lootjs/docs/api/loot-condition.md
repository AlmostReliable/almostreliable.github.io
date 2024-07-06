# Conditions

While conditions can be used in different ways, from now on the examples on this page will shown with `LootEntries` but they can easily be used in other places.

## `matchTool`

Matches the tool, the player used to destroy the block. This is only set when destroying blocks.
::: info
When working with block loot, prefer `matchTool` over `matchMainHand`.
:::

-   Syntax:
    -   `.matchTool(filter: ItemPredicate | ItemFilter | Item)`_<sub>, see [ItemFilter] or [ItemPredicate]</sub>_
    -   `LootCondition.matchTool(filter: ItemPredicate | ItemFilter | Item)`

```js
LootEntry.of("minecraft:diamond").matchTool("#c:tools")
```

```js
LootEntry.of("minecraft:diamond").matchTool(
    ItemFilter.tag("c:tools").and(
        ItemFilter.hasEnchantment("minecraft:fortune", 3)
    )
)
```

Using an ItemPredicate:

```js
LootEntry.of("minecraft:diamond").matchTool({
    items: "#c:tools",
    predicates: {
        enchantments: [
            {
                enchantments: "minecraft:fortune",
                levels: 3,
            },
        ],
    },
})
```

## `matchMainHand`

Matches the main hand item of the player by given [ItemFilter] or [Ingredient]

-   Syntax:
    -   `.matchMainHand(filter: ItemFilter | Item)`_<sub>, see [ItemFilter]</sub>_
    -   `LootCondition.matchMainHand(filter: ItemFilter | Item)`

```js
LootEntry.of("minecraft:diamond").matchMainHand("#minecraft:pickaxes")
```

## `matchOffHand`

Matches the off hand item of the player by given [ItemFilter] or [Ingredient]

-   Syntax:
    -   `.matchOffHand(filter: ItemFilter | Item)`_<sub>, see [ItemFilter]</sub>_
    -   `LootCondition.matchOffHand(filter: ItemFilter | Item)`

```js
LootEntry.of("minecraft:diamond").matchOffHand("#minecraft:pickaxes")
```

## `matchEquip`

Matches the equipment from a slot of the player by given [ItemFilter] or [Ingredient].<br>
Possible slots are: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"`, `"feet"`.

-   Syntax:
    -   `.matchEquip(slot, filter: ItemFilter | Item)`_<sub>, see [ItemFilter]</sub>_
    -   `LootCondition.matchEquip(slot, filter: ItemFilter | Item)`

```js
LootEntry.of("minecraft:diamond").matchEquip("mainhand", "#minecraft:pickaxes")
```

## `survivesExplosion`

Matches if the item survives an explosion. Calculated by probability of `random_number < (1 / explosion_radius)`, where `random_number` is a random generated number between 0 and 1. If no explosion happens, it will always survive.

-   Syntax:
    -   `.survivesExplosion()`
    -   `LootCondition.survivesExplosion()`

```js
LootEntry.of("minecraft:diamond").survivesExplosion()
```

## `matchTime`

Compares the current day time (`24000 * day_count + day_time`) against given values.

-   Syntax:
    -   `.matchTime(min: number, max: number)`
    -   `.matchTime(period: number, min: number, max: number)`
    -   `LootCondition.matchTime(min: number, max: number)`
    -   `LootCondition.matchTime(period: number, min: number, max: number)`<br>
        If period is provided, `day_time` will be reduced modulo by given `period`. Setting this to _24000_ simulates a full day check. _Default is 24000, if not provided_

```js
// Will match if the current day time is between 0 and 9000.
LootEntry.of("minecraft:diamond").matchTime(0, 9000)
```

```js
// Will match the first day of the week. (If we go with 7 days per minecraft "week")
LootEntry.of("minecraft:diamond").matchTime(24000 * 7, 0, 24000)
```

## `matchWeather`

Matches the current weather

-   Syntax:
    -   `.matchWeather(isRaining: boolean | null, isThundering: boolean | null)`
    -   `LootCondition.matchWeather(isRaining: boolean | null, isThundering: boolean | null)`

```js
// Matches if it is raining and not thundering
LootEntry.of("minecraft:diamond").matchWeather(true, false)
```

```js
// Matches if it is raining
LootEntry.of("minecraft:diamond").matchWeather(true, null)
```

## `randomChance`

Matches if a random number between 0 and 1 is lower than the given value

-   Syntax:
    -   `.randomChance(chance: number)`
    -   `LootCondition.randomChance(chance: number)`

```js
LootEntry.of("minecraft:diamond").randomChance(0.5) // 50% chance
```

## `randomTableBonus`

Passes with probability picked from a list of probabilities, indexed by enchantment power. Mainly used for block drops, because a `tool` is required.

-   Syntax:
    -   `LootCondition.randomTableBonus(enchantment: Enchantment, probabilities: number[])`

```js
LootEntry.of("minecraft:diamond").randomTableBonus(
    "minecraft:fortune",
    [0, 0.33, 0.66, 1.0]
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
    [0, 0.33, 0.66, 1.0]
)
```

## `matchBiome`

Matches if the player is in the given biome

-   Syntax:
    -   `.matchBiome(biomes: string | string[] | tag)`
    -   `LootCondition.matchBiome(biomes: string | string[] | tag)`

```js
LootEntry.of("minecraft:diamond").matchBiome("minecraft:jungle")
```

## `matchDimension`

Matches if the player is in one of the given dimensions

-   Syntax:
    -   `.matchDimension(dimension: id)`
    -   `LootCondition.matchDimension(dimension: id)`

```js
LootEntry.of("minecraft:diamond").matchDimension("minecraft:overworld")
```

## `matchStructure`

Matches if the player is in one of the given structures. <br>
If `exact` is set to `true`, it will check if the player is inside the structure parts (like houses in a village). Otherwise it will just check if the player is within the structure bounds.

-   Syntax:
    -   `.matchStructure(structure: string | string[] | tag)`
    -   `LootCondition.matchStructure(structure: string | string[] | tag)`
    -   `.matchStructure(structure: string | string[] | tag, exact: boolean)`
    -   `LootCondition.matchStructure(structure: string | string[] | tag, exact: boolean)`

```js
LootEntry.of("minecraft:diamond").matchStructure(
    ["minecraft:stronghold", "minecraft:village"],
    false
)
```

## `isLightLevel`

Matches if the player is in the given light level

-   Syntax:
    -   `.isLightLevel(min: number, max: number)`
    -   `LootCondition.isLightLevel(min: number, max: number)`

```js
LootEntry.of("minecraft:diamond").isLightLevel(0, 15)
```

## `luck`

Matches if the player has the given luck level

-   Syntax:
    -   `.luck(level: Range)`_<sub>, see [Range]</sub>_
    -   `LootCondition.luck(level: Range)`

## `killedByPlayer`

Matches if an entity was killed by the player

-   Syntax:
    -   `.killedByPlayer()`
    -   `LootCondition.killedByPlayer()`

```js
LootEntry.of("minecraft:diamond").killedByPlayer()
```

## `matchEntity`

Matches against the entity that died, opened the chest or destroyed the block.

-   Syntax:
    -   `.matchEntity(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchEntity(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").matchEntity(
    Predicates.entity().isCrouching(true)
)
```

## `matchDirectAttacker`

Matches against the direct entity which caused the death, e.g. the arrow entity, not the shooter.

-   Syntax:
    -   `.matchDirectAttacker(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchDirectAttacker(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").matchDirectAttacker(
    Predicates.entity().isCrouching(true)
)
```

## `matchAttacker`

Matches against the entity which caused the death.

-   Syntax:
    -   `.matchAttacker(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchAttacker(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").matchAttacker(
    Predicates.entity().isCrouching(true)
)
```

## `matchPlayer`

Matches against the player. If a player kills another player, it will check against the attacker.

-   Syntax:
    -   `.matchPlayer(predicate: EntityPredicate)`_<sub>, see [EntityPredicate]</sub>_
    -   `LootCondition.matchPlayer(predicate: EntityPredicate)`

```js
LootEntry.of("minecraft:diamond").matchPlayer(
    Predicates.entity().isCrouching(true)
)
```

## `matchPlayerCustom`

Custom callback predicate to check the player. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.matchPlayerCustom((player) => {})`_<sub>, where player is the actual player</sub>_
    -   `LootCondition.matchPlayerCustom((player) => {})`

```js
LootEntry.of("minecraft:diamond").matchPlayerCustom((player) => {
    // We are working with the actual player here
    return player.getMaxHealth() > 20
})
```

## `matchEntityCustom`

Custom callback predicate to check the entity. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.matchEntityCustom((entity) => {})`_<sub>, where entity is the actual entity</sub>_
    -   `LootCondition.matchEntityCustom((entity) => {})`

```js
LootEntry.of("minecraft:diamond").matchEntityCustom((entity) => {
    // We are working with the actual entity here
    return entity.getMaxHealth() > 20
})
```

## `matchAttackerCustom`

Custom callback predicate to check the attacker. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.matchAttackerCustom((entity) => {})`_<sub>, where entity is the actual entity</sub>_
    -   `LootCondition.matchAttackerCustom((entity) => {})`

```js
LootEntry.of("minecraft:diamond").matchAttackerCustom((entity) => {
    // We are working with the actual entity here
    return entity.getMaxHealth() > 20
})
```

## `matchDirectAttackerCustom`

Custom callback predicate to check the direct attacker. The callback **must** return either `true` or `false`.

-   Syntax:
    -   `.matchDirectAttackerCustom((entity) => {})`_<sub>, where entity is the actual entity</sub>_
    -   `LootCondition.matchDirectAttackerCustom((entity) => {})`

```js
LootEntry.of("minecraft:diamond").matchDirectAttackerCustom((entity) => {
    // We are working with the actual entity here
    return entity.getMaxHealth() > 20
})
```

## `matchDamageSource`

Matches if the damage source is of the given type

-   Syntax:
    -   `.matchDamageSource(predicate: DamageSourcePredicate)` _<sub>, see [DamageSourcePredicate]</sub>_
    -   `LootCondition.matchDamageSource(predicate: DamageSourcePredicate)`

```js
LootEntry.of("minecraft:diamond").matchDamageSource(
    Predicates.damageSource()
        .is("minecraft:falling_block")
        .isNot("minecraft:magic")
        .direct(Predicates.entity().isCrouching(true))
        .source(Predicates.entity().isCrouching(true))
)
```

## `matchDistance`

Matches if the player is within the given distance

-   Syntax:
    -   `.matchDistance(predicate: DistancePredicate)`_<sub>, see [DistancePredicate]</sub>_
    -   `LootCondition.matchDistance(predicate: DistancePredicate)`

```js
LootEntry.of("minecraft:diamond").matchDistance({
    absolute: {
        min: 42,
    },
})
```

## `blockEntity`

Match the given block entity. Must return either `true` or `false`.

-   Syntax:
    -   `.blockEntity((blockEntity) => {})`
    -   `LootCondition.blockEntity((blockEntity) => {})`

```js
LootEntry.of("minecraft:diamond").blockEntity((blockEntity) => {
    // We are working with the actual block entity here.
    // Return either true or false to match or not
})
```

## `matchAllOf`

Will match if all the given conditions match. False otherwise.

-   Syntax:
    -   `.matchAllOf((container) => {})`
    -   `LootCondition.matchAllOf(condition1, condition2, ...)`

```js
LootEntry.of("minecraft:diamond").matchAllOf((conditions) => {
    conditions
        .matchMainHand("#minecraft:pickaxes")
        .randomChance(0.5)
        .survivesExplosion()
        .matchBiome("#minecraft:forest")
})
```

Using `LootCondition.matchAllOf` directly to create the condition.

```js
const ourAndCondition = LootCondition.matchAllOf(
    LootCondition.matchMainHand("#minecraft:pickaxes"),
    LootCondition.randomChance(0.5),
    LootCondition.survivesExplosion(),
    LootCondition.matchBiome("#minecraft:forest")
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
LootEntry.of("minecraft:diamond").matchAnyOf((conditions) => {
    conditions
        .matchMainHand("#minecraft:pickaxes")
        .randomChance(0.5)
        .survivesExplosion()
        .matchBiome("#minecraft:forest")
})
```

Using `LootCondition.matchAnyOf` directly to create the condition.

```js
const ourOrCondition = LootCondition.matchAnyOf(
    LootCondition.matchMainHand("#minecraft:pickaxes"),
    LootCondition.randomChance(0.5),
    LootCondition.survivesExplosion(),
    LootCondition.matchBiome("#minecraft:forest")
)

LootEntry.of("minecraft:diamond").when((c) => {
    c.addCondition(ourOrCondition)
})
```

## `matchCustomCondition`

Create a condition directly from JSON. This is useful to load conditions from other mods.

-   Syntax:
    -   `.matchCustomCondition(json)`
    -   `LootCondition.matchCustomCondition(json)`

```js
LootEntry.of("minecraft:diamond").matchCustomCondition({
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
```

[EntityPredicate]: /api/predicates#entity-predicate
[ItemPredicate]: /api/predicates#item-predicate
[DamageSourcePredicate]: /api/predicates#damagesource-predicate
[DistancePredicate]: /api/predicates#distance-predicate
[ItemFilter]: /api/item-filter
[Ingredient]: https://wiki.latvian.dev
[Range]: /api/range
