# Centrifuge

The Centrifuge transforms items by seperating them into their components. It is also capable of transforming fluids, once a fluid add-on
has been installed. For configuring fluid recipes, refer to the [Fluid Centrifuge](fluid_centrifuge.md) page.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.centrifuge`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits: exactly 1
    -   item outputs
        -   role: output
        -   required: yes
        -   limits:
            -   min 1
            -   max 2
    -   time
        -   role: misc
        -   required: no
        -   default: `60`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all centrifuge recipes
    event.remove({ type: "oritech:centrifuge" })

    // adds a recipe that converts a gold ingot into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech.centrifuge().itemInputs("gold_ingot").itemOutputs("iron_ingot")

    // adds a recipe that converts any ingot into 4 cobblestone, and an apple
    // requires 60 ticks by default
    event.recipes.oritech
        .centrifuge()
        .itemInputs("#c:ingots")
        .itemOutputs(["4x cobblestone", "minecraft:apple"])

    // adds a recipe that converts a glass block into 2 sand
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech.centrifuge().itemInputs("glass").itemOutputs("2x sand").time(40)
})
```
