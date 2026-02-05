# Fluid Centrifuge

Internally, this machine is called the Centrifuge Fluid.

The Fluid Centrifuge transforms items and fluids by seperating them into their components. Without the fluid add-on, it functions the
same as the [Centrifuge](centrifuge.md). For configuring item recipes, refer to the Centrifuge page.

If you want to avoid that players have two use two Centrifuges or constantly need to attach and detach the fluid add-on, it's recommended
to add the Centrifuge recipes to the Fluid Centrifuge as well, since the Fluid Centrifuge can process both item and fluid recipes.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.centrifuge_fluid`
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
            -   max 2
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
            -   max 1
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
    // removes all fluid centrifuge recipes
    event.remove({ type: "oritech:centrifuge_fluid" })

    // adds a recipe that converts a gold ingot into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech.centrifuge_fluid().itemInputs("gold_ingot").itemOutputs("iron_ingot")

    // adds a recipe that converts 1000 mB of water into 1000 mB of lava
    // requires 60 ticks by default
    event.recipes.oritech.centrifuge_fluid().fluidInput("water").fluidOutputs("lava")

    // adds a recipe that converts any ingot and 500 mB of water into 4 cobblestone, and an apple
    // requires 60 ticks by default
    event.recipes.oritech
        .centrifuge_fluid()
        .itemInputs("#c:ingots")
        .fluidInput("500x water")
        .itemOutputs(["4x cobblestone", "minecraft:apple"])

    // adds a recipe that converts a glass block and 1500 mB of any water into 2000 mB of lava
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .centrifuge_fluid()
        .itemInputs("glass")
        .fluidInput("1500x #c:water")
        .fluidOutputs("2000x lava")
        .time(40)
})
```
