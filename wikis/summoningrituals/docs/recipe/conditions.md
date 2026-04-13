# Altar Recipe Conditions

Conditions are used to restrict when a ritual can be started. All conditions are additive, meaning that if you add multiple conditions, all must pass.

> [!WARNING] NOTE
> This page assumes that you know how to get an instance of the altar recipe builder. If you do not know how to do that or you didn't read about the general recipe structure yet, please read the [recipe basics page](basics.md).

-   type: `List<LootItemCondition>`
-   required: no
-   default: empty list
-   primary access: `conditions(...)`

## Condition Builder

The condition builder is exposed via the `conditions` function on the altar recipe builder. Once you call the function, the builder instance is passed to the callback you have to provide.

```js
.conditions(c =>
    // put conditions here
    // you can use a different name than c
    // c is just a suggestion
)
```

Because it's a builder, you can chain all functions. See all available conditions below.

## Biome

The biome check ensures the ritual is only started in the given biomes. If you specify multiple biomes, the ritual can be started in any of them. If you want to specify multiple entries, you have to wrap them in an array via `[]`.

It's possible to either specify specific biomes or a single biome tag.

Functions:

-   `biomes(HolderSet<Biome> biomes)`
-   `biomes(TagKey<Biome> biomeTag)`

```js
.conditions(c =>
    c.biomes(["minecraft:plains", "minecraft:desert"]) // [!code focus: 3]
    // or
    c.biomes("#minecraft:is_badlands")
)
```

## Block Below

> [!DANGER] DEPRECATED
> This condition was removed in version 3.6.0 in favor of the more generic [`blockPattern` condition](#block-pattern).

This check ensures the ritual is only started if the block below the ritual is the given block. You can specify the required `BlockState` as well. If a `BlockState` is passed, the mod will ensure if the properties are valid and can be applied to the block. Passing a required `BlockState` is optional.

Functions:

-   `blockBelow(Block block)`
-   `blockBelow(Block block, BlockState blockState)`

Since blocks can have an infinite amount of properties, and mods can also define their own, it's not possible to list all possible variants. However, you can easily check a block's properties yourself in the game by activating the debug screen (by pressing `F3`) and looking at the block's properties on the right side of the screen. For more information about `BlockState`s, please read the official [Minecraft wiki article](https://minecraft.wiki/w/Block_states).

```js
.conditions(c =>
    c.blockBelow("furnace", { lit: true }) // [!code focus:3]
    // or
    c.blockBelow("minecraft:furnace") // no required BlockState
)
```

## Block Pattern

> [!INFO] NOTE
> This condition is available since version 3.6.0.

The block pattern check ensures the ritual is only started if the blocks around the altar match the given block pattern. A block pattern is a 3D pattern of blocks. You can specify the required `BlockState` for each block in the pattern as well. If a `BlockState` is passed, the mod will ensure if the properties are valid and can be applied to the block. Passing a required `BlockState` is optional. You can also specify a block tag instead of a specific block for each entry in the pattern.

To offer complex functionality, this condition is configured via its own builder. You can obtain the builder instance by calling the `blockPattern()` function. You can also pass a custom `name` for the block pattern condition. This is useful if you want to create tiered progression that depends on the structure of the blocks around the altar. By default, the `name` component will have no color and will adjust to the color of the other components surrounding it. However, you can define a custom color with the `Text` binding from KubeJS.

Function: `blockPattern(Component name, BlockPatternBuilder builder)`<br>
Available builder functions:

-   `block(BlockPos offset, Block block)`
-   `block(BlockPos offset, Block block, BlockState blockState)`
-   `tag(BlockPos offset, TagKey<Block> blockTag)`
-   `tag(BlockPos offset, TagKey<Block> blockTag, BlockState blockState)`

The `offset` argument in each function defines the position of the block relative to the altar block. For example, an offset of `[0, -1, 0]` would check the block directly below the altar block.

```js
.conditions(c =>
    c.blockPattern(p => // [!code focus:10]
        p.tag([0, -1, 0], "c:glass_blocks")
        .block([1, -1, 1], "chest")
        .block([-1, -1, -1], "furnace", { lit: true })
        .block([1, -1, 0], "chest")
    )
    // or
    c.blockPattern(Text.of("Tier 1").darkRed(), p =>
        // ...
    )
)
```

## Dimension

The dimension check ensures the ritual is only started in the given dimension. It's only possible to specify one dimension.

Function: `dimension(ResourceKey<Dimension> dimension)`

```js
.conditions(c =>
    c.dimension("minecraft:overworld") // [!code focus]
)
```

## Facing Direction

The facing direction check ensures the ritual is only started if the altar is facing the given horizontal direction.

Function: `facing(Direction direction)`

```js
.conditions(c =>
    c.facing("north") // [!code focus:3]
    // or
    c.facing(Direction.NORTH)
)
```

## Height

The height check ensures the ritual is only started at the given height. You can specify a range, an exact value, a minimum, or a maximum. If you use more than a single function to specify a height, the required value will be overridden.

### Range

Function: `height(Integer min, Integer max)`

```js
.conditions(c =>
    c.height(10, 20) // [!code focus]
)
```

### Exact

Function: `height(Integer height)`

```js
.conditions(c =>
    c.height(10) // [!code focus]
)
```

### Minimum

Function: `minHeight(Integer min)`

```js
.conditions(c =>
    c.minHeight(10) // [!code focus]
)
```

### Maximum

Function: `maxHeight(Integer max)`

```js
.conditions(c =>
    c.maxHeight(10) // [!code focus]
)
```

## Light Level

The light level check ensures the ritual is only started at the given light level. The light level is the amount of light that is emitted by nearby blocks. You can specify a range, an exact value, a minimum, or a maximum. If you use more than a single function to specify a light level, the required value will be overridden.

### Range

Function: `lightLevel(Integer min, Integer max)`

```js
.conditions(c =>
    c.lightLevel(10, 20) // [!code focus]
)
```

### Exact

Function: `lightLevel(Integer lightLevel)`

```js
.conditions(c =>
    c.lightLevel(10) // [!code focus]
)
```

### Minimum

Function: `minLightLevel(Integer min)`

```js
.conditions(c =>
    c.minLightLevel(10) // [!code focus]
)
```

### Maximum

Function: `maxLightLevel(Integer max)`

```js
.conditions(c =>
    c.maxLightLevel(10) // [!code focus]
)
```

## Moon Phase

The moon phase check ensures the ritual is only started at the given moon phase.

If you want to read more about moon phases and how they are calculated, check the [official Minecraft wiki article](https://minecraft.wiki/w/Moon#Phases).

Function: `moonPhase(MoonPhase phase)`<br>
Available Options:

-   `FULL_MOON`
-   `WANING_GIBBOUS`
-   `THIRD_QUARTER`
-   `WANING_CRESCENT`
-   `NEW_MOON`
-   `WAXING_CRESCENT`
-   `FIRST_QUARTER`
-   `WAXING_GIBBOUS`

```js
.conditions(c =>
    c.moonPhase(SummoningMoonPhase.FULL_MOON) // [!code focus:3]
    // or
    c.moonPhase("full_moon")
)
```

## Open Sky

The open sky check ensures the ritual is only started when the altar block has an open sky. This means that the block has to be exposed to the sky (no blocks above it). By default, it does not matter if the altar block has an open sky or not. This means that by passing `false`, you can ensure that the altar block does not have an open sky.

> [!WARNING] NOTE
> This condition is not compatible with the [`waterlogged` condition](#waterlogged), as the water block will obstruct the Altar's access to the sky. This is Vanilla behavior and can't be changed.

Function: `setOpenSky(Boolean openSky)`

```js
.conditions(c =>
    c.setOpenSky(true) // [!code focus]
)
```

## Smoked

The smoked check ensures the ritual is only started when the altar block is being smoked. This means that the block has to be covered by smoke particles. This behavior is similar to that of the vanilla Bee Hive. By default, it does not matter if the altar block is being smoked or not. This means that by passing `false`, you can ensure that the altar block is not being smoked.

Function: `setSmoked(Boolean smoked)`

```js
.conditions(c =>
    c.setSmoked(true) // [!code focus]
)
```

## Structures

The structure check ensures the ritual is only started inside the bounds of the specified structure. If you specify multiple structures, the ritual can be started in any of them. If you want to specify multiple entries, you have to wrap them in an array via `[]`.

It's possible to either specify specific structures or a single structure tag.

Functions:

-   `structures(HolderSet<Structure> structures)`
-   `structures(TagKey<Structure> structureTag)`

```js
.conditions(c =>
    c.structures(["minecraft:desert_pyramid", "minecraft:pillager_outpost"]) // [!code focus:3]
    // or
    c.structures("#minecraft:mineshaft")
)
```

## Time

The time check ensures the ritual is only started at the given game time. The time is the amount of ticks that have passed during a day. A day has 24000 ticks. You can specify a range, a minimum, a maximum, or a predefined time range. If you use more than a single function to specify a time, the required value will be overridden.

If you happen to pass the exact same bounds which would correspond to a predefined time range, the predefined time range will be used instead.

### Range

Function: `time(Integer min, Integer max)`

```js
.conditions(c =>
    c.time(1000, 2000) // [!code focus]
)
```

### Minimum

Function: `minTime(Integer min)`

```js
.conditions(c =>
    c.minTime(1000) // [!code focus]
)
```

### Maximum

Function: `maxTime(Integer max)`

```js
.conditions(c =>
    c.maxTime(1000) // [!code focus]
)
```

### Predefined

Function: `time(SummoningTime time)`<br>
Available Options (min, max):

-   `DAY` (0, 12000)
-   `NIGHT` (12000, 24000)
-   `MORNING` (0, 4000)
-   `NOON` (4000, 8000)
-   `AFTERNOON` (8000, 10000)
-   `EVENING` (10000, 12000)
-   `MIDNIGHT` (17000, 19000)

```js
.conditions(c =>
    c.time(SummoningTime.DAY) // [!code focus:5]
    // or
    c.time("day")
    // or
    c.time(0, 12000)
)
```

## Waterlogged

The waterlogged check ensures the ritual is only started when the altar block is waterlogged. This means that the block has to be covered by water. By default, it does not matter if the altar block is waterlogged or not. This means that by passing `false`, you can ensure that the altar block is not waterlogged.

> [!WARNING] NOTE
> This condition is not compatible with the [`openSky` condition](#open-sky), as the water block will obstruct the Altar's access to the sky. This is Vanilla behavior and can't be changed.

Function: `setWaterlogged(Boolean waterlogged)`

```js
.conditions(c =>
    c.setWaterlogged(true) // [!code focus]
)
```

## Weather

The weather check ensures the ritual is only started when the weather is the given weather. By default, it does not matter what the weather is.

Because there are different types of weather, this is configured via its own builder. You can obtain the builder instance by calling the `weather()` function.

Function: `weather(...)`<br>
Available builder functions:

-   `setRaining(Boolean raining)`
-   `setThundering(Boolean thundering)`

```js
.conditions(c =>
    c.weather(w => w.setRaining(true)) // [!code focus:3]
    // or
    c.weather(w => w.setRaining(true).setThundering(false))
)
```
