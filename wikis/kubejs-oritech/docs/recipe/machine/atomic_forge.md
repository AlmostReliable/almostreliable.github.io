# Atomic Forge

The Atomic Forge is a precise machine capable of creating advanced computer chips. Its input slots are ordered by left, top, bottom.

The machine doesn't store energy. Instead, it is fed by a Laser until the energy bar is full. Once the limit is reached, the current
recipe is finished.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.atomic_forge`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits:
            -   min 1
            -   max 3
    -   item outputs
        -   role: output
        -   required: yes
        -   limits: exactly 1
    -   time
        -   role: misc
        -   required: no
        -   default: `60`
        -   description: specifies the required energy multiplied by a setting in the Oritech config (default value `1024`); higher values require more energy

## Examples

```js
ServerEvents.recipes(event => {
    // removes all atomic forge recipes
    event.remove({ type: "oritech:atomic_forge" })

    // adds a recipe that converts a gold ingot into an iron ingot
    // requires 60 * 1024 = 61440 FE by default
    event.recipes.oritech.atomic_forge().itemInputs("gold_ingot").itemOutputs("iron_ingot")

    // adds a recipe that converts any ingot, a redstone, and an apple into 4 cobblestone
    // requires 60 * 1024 = 61440 FE by default
    event.recipes.oritech
        .atomic_forge()
        .itemInputs(["#c:ingots", "minecraft:redstone", "minecraft:apple"])
        .itemOutputs("4x cobblestone")

    // adds a recipe that converts a glass block, and a potato into 2 sand
    // requires 40 * 1024 = 40960 FE by default
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .atomic_forge()
        .itemInputs(["glass", "minecraft:potato"])
        .itemOutputs("2x sand")
        .time(40)
})
```
