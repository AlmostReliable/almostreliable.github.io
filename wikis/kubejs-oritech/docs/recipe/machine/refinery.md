# Refinery

The Refinery is used to process items and fluids. It has one item and one fluid input and can produce an item and up to 3 fluids.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.refinery`
-   properties:
    -   item inputs
        -   role: input
        -   required: no
        -   limits:
            -   min 0
            -   max 1
    -   item outputs
        -   role: output
        -   required: no
        -   limits:
            -   min 0
            -   max 1
    -   fluid input
        -   role: input
        -   required: no
        -   limits:
            -   min 0
            -   max 1
    -   fluid outputs
        -   role: output
        -   required: no
        -   limits:
            -   min 0
            -   max 3
    -   time
        -   role: misc
        -   required: no
        -   default: `60`
-   recipe limitations
    -   needs at least one item input or one fluid input
    -   needs at least one item output or one fluid output

## Examples

```js
ServerEvents.recipes(event => {
    // removes all refinery recipes
    event.remove({ type: "oritech:refinery" })

    // adds a recipe that converts a cobblestone into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech.refinery().itemInputs("cobblestone").itemOutputs("iron_ingot")

    // adds a recipe that converts 1000 mB of water into 1000 mB of lava
    // requires 60 ticks by default
    event.recipes.oritech.refinery().fluidInput("water").fluidOutputs("lava")

    // adds a recipe that converts a diamond and 1000 mB of any water into 4 carrots and 2000 mB of lava
    // requires 60 ticks by default
    event.recipes.oritech
        .refinery()
        .itemInputs("diamond")
        .fluidInput("#c:water")
        .itemOutputs("4x minecraft:carrot")
        .fluidOutputs("2000x lava")

    // adds a recipe that converts 2000 mB of any water into 3 cobblestone and 1500 mB of lava
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .refinery()
        .fluidInput("2000x #c:water")
        .itemOutputs("3x cobblestone")
        .fluidOutputs(Fluid.of("lava", 1500))
        .time(40)
})
```
