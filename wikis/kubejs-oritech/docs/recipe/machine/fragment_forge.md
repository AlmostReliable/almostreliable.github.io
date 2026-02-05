# Fragment Forge

Internally, this machine is called the Grinder.

The Fragment Forge is a machine primarily focused at ore processing and can provide additional yield. Its main usage is crushing and
acts as an upgraded version of the [Pulverizer](pulverizer.md).

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.grinder`
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
            -   max 3
    -   time
        -   role: misc
        -   required: no
        -   default: `60`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all fragment forge / grinder recipes
    event.remove({ type: "oritech:grinder" })

    // adds a recipe that converts a gold ingot into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech.grinder().itemInputs("gold_ingot").itemOutputs("iron_ingot")

    // adds a recipe that converts any ingot into 4 cobblestone, an apple, and 2 potatos
    // requires 60 ticks by default
    event.recipes.oritech
        .grinder()
        .itemInputs("#c:ingots")
        .itemOutputs(["4x cobblestone", "minecraft:apple", "2x minecraft:potato"])

    // adds a recipe that converts a glass block into 2 sand
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech.grinder().itemInputs("glass").itemOutputs("2x sand").time(40)
})
```
