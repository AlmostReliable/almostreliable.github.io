# Atomic Reconstructor

The Atomic Reconstructor shoots a laser in the direction it is facing. Without a lens, the laser converts blocks around the first block it hits and dropped items between the Atomic Reconstructor and that block.

Lenses change what the laser does. The Lens of Color uses [Color Change recipes](../misc/colorchange.md) and the Lens of the Miner uses [Mining Lens recipes](../misc/mininglens.md).

## Conversion

The laser converts blocks in a 3x3 area around the block it hits, perpendicular to the laser. Each block is matched against the recipe ingredients. If the result is a block, it replaces the converted block. Any other result drops as an item and the converted block is removed. A single shot doesn't always convert the whole area, so it can take a few shots.

Dropped items are converted one by one. A stack of 3 items turns into 3 results. If the Atomic Reconstructor doesn't have enough energy for the whole stack, it converts as many items as its energy allows. Because of that, the result of a recipe always has a count of 1. Larger counts are reduced to 1 and a warning is logged.

The energy of a recipe is used for each converted block or item, on top of the energy the Atomic Reconstructor uses for each shot.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.laser`
- properties:
    - `result`
        - description: specifies the output item
        - type: `ItemStack`
        - role: output
        - required: yes
        - limits: the count is always 1
        - usage: needs to be passed as the first argument
    - `ingredient`
        - description: specifies the input item or block
        - type: `Ingredient`
        - role: input
        - required: yes
        - usage: needs to be passed as the second argument
    - `energy`
        - description: specifies the energy used for each converted block or item
        - type: `int`
        - role: other
        - required: no
        - limits: must be greater than 0
        - default: `1000`
        - usage: can be passed as the third argument or by chaining the function `.energy(int)`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all atomic reconstructor recipes
    event.remove({ type: "actuallyadditions:laser" })

    // adds a recipe that converts netherrack into a magma block
    // uses the default energy of 1000 CF
    event.recipes.actuallyadditions.laser("magma_block", "netherrack")

    // adds a recipe that converts a brown mushroom into a red mushroom
    // uses 500 CF per conversion
    event.recipes.actuallyadditions.laser("minecraft:red_mushroom", "minecraft:brown_mushroom", 500)

    // adds a recipe that converts any log into charcoal
    // uses 200 CF per conversion
    // uses the chaining function for energy
    event.recipes.actuallyadditions.laser("charcoal", "#minecraft:logs").energy(200)
})
```
