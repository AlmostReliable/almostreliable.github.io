# Foundry

The Foundry focuses on alloy creation by combining two materials.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.foundry`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits: exactly 2
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
    // removes all foundry recipes
    event.remove({ type: "oritech:foundry" })

    // adds a recipe that converts a gold ingot, and an apple into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech
        .foundry()
        .itemInputs(["gold_ingot", "minecraft:apple"])
        .itemOutputs("iron_ingot")

    // adds a recipe that converts any ingot, and a potato into 4 cobblestone
    // requires 60 ticks by default
    event.recipes.oritech
        .foundry()
        .itemInputs(["#c:ingots", "minecraft:potato"])
        .itemOutputs("4x cobblestone")

    // adds a recipe that converts a glass block and a sand block into 2 carrots
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .foundry()
        .itemInputs(["glass", "sand"])
        .itemOutputs("2x minecraft:carrot")
        .time(40)
})
```
