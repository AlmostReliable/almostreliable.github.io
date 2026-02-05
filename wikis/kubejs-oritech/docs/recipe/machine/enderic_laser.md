# Enderic Laser

The Enderic Laser is a machine that can accelerate other blocks, break blocks, and feed energy into other blocks.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.laser`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits: exactly 1
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
    // removes all enderic laser recipes
    event.remove({ type: "oritech:laser" })

    // adds a recipe that converts a gold ingot into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech.laser().itemInputs("gold_ingot").itemOutputs("iron_ingot")

    // adds a recipe that converts any ingot into 4 cobblestone
    // requires 60 ticks by default
    event.recipes.oritech.laser().itemInputs("#c:ingots").itemOutputs("4x cobblestone")

    // adds a recipe that converts a glass block into 2 sand
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech.laser().itemInputs("glass").itemOutputs("2x sand").time(40)
})
```
