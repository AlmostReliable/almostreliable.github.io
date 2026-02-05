# Assembler

The Assembler acts as a 2x2 crafting grid and will automatically craft items as long as it has energy and items in the input slots.
Crafting with the Assembler is usually cheaper than crafting manually.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.assembler`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits: exactly 4
    -   item outputs
        -   role: output
        -   required: yes
        -   limits: exactly 1
    -   time
        -   role: misc
        -   required: no
        -   default: `60`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all assembler recipes
    event.remove({ type: "oritech:assembler" })

    // adds a recipe that converts a stone, a cobblestone, a carrot, and an apple into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech
        .assembler()
        .itemInputs(["stone", "minecraft:cobblestone", "minecraft:carrot", "apple"])
        .itemOutputs("minecraft:iron_ingot")

    // adds a recipe that converts any ingot, a glass block, a potato, and a sand block into 5 cobblestone
    // requires 60 ticks by default
    event.recipes.oritech
        .assembler()
        .itemInputs(["#c:ingots", "glass", "minecraft:potato", "minecraft:sand"])
        .itemOutputs("5x minecraft:cobblestone")

    // adds a recipe that converts a glass block, a brick, a diamond, and a gold ingot into 2 sand blocks
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .assembler()
        .itemInputs("glass", "brick", "diamond", "gold_ingot")
        .itemOutputs("2x sand")
        .time(40)
})
```
