# Lava Generator

The Lava Generator burns lava to generate energy.

Because generators support a boiler add-on, which turns water into steam, all fluid generators do not accept water as an input. This is
a restriction by Oritech to prevent players from accidentally inserting water into the generator instead of the add-on.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.lava_generator`
-   properties:
    -   fluid input
        -   role: input
        -   required: yes
        -   limits:
            -   exactly 1
            -   does not support water
    -   time
        -   role: misc
        -   required: no
        -   default: `60`
        -   description: specifies the time in ticks how long a fluid burns; higher values burn longer and generate more energy

## Examples

```js
ServerEvents.recipes(event => {
    // removes all lava generator recipes
    event.remove({ type: "oritech:lava_generator" })

    // adds a recipe that converts 1000 mB of water into energy for 60 ticks by default
    event.recipes.oritech.lava_generator().fluidInput("water")

    // adds a recipe that converts 1500 mB of any water into energy for 60 ticks by default
    event.recipes.oritech.lava_generator().fluidInput("1500x #c:water")

    // adds a recipe that converts 3000 mB of lava into energy for 40 ticks
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech.lava_generator().fluidInput("3000x minecraft:lava").time(40)
})
```
