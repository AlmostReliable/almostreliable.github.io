# Summoning Item

`SummoningItem` is a utility binding that allows you to easily create complex instances of `ItemOutput`s via the `ItemOutputBuilder`. The builder offers functionality to add offset and spread values to an item output, which is otherwise not possible, if you only provide a simple [item output](../recipe/outputs.md#item-outputs) instance.

## Overview

-   access in recipes event via: `SummoningItem`
-   functions:
    -   `of(ItemStack result)`
        -   creates an `ItemOutputBuilder` with the specified item and its assigned count
    -   `of(ItemStack result, int count)`
        -   creates an `ItemOutputBuilder` with the specified item and the specified count

```js
SummoningItem.of("iron_ingot")
SummoningItem.of("5x minecraft:apple")
SummoningItem.of(Item.of("potato", 3))
SummoningItem.of("minecraft:carrot", 2)
```

## Item Output Builder

After obtaining the `ItemOutputBuilder` instance through the binding, you can chain more functions to it. It is not required to finish the builder because the `itemOutputs` function accepts builder instances as well.

-   properties:
    -   `item`
        -   description: specifies the output item; defined via the binding function to obtain the builder
        -   type: `ItemStack`
        -   required: yes
    -   `offset`
        -   description: specifies the offset to the altar block where to spawn the output item at
        -   type: `BlockPos`
        -   required: no
        -   default: `[0, 2, 0]`
    -   `spread`
        -   description: specifies the spread of the output items; output items are spawned at different positions within the spread area; 4 items can spawn at a position before a new random position is calculated
        -   type: `BlockPos`
        -   required: no
        -   default: `[1, 0, 1]`
-   functions:
    -   `offset(BlockPos offset)`
        -   assigns the given offset to the `ItemOutput`
    -   `spread(BlockPos spread)`
        -   assigns the given spread to the `ItemOutput`

```js
.itemOutputs([
    SummoningItem.of("emerald", 16).offset([1, 2, 2]).spread([4, 2, 4]) // [!code focus]
])
```
