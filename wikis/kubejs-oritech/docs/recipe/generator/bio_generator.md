# Bio Generator

The Bio Generator burns biomass to generate energy.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.bio_generator`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits: exactly 1
    -   time
        -   role: misc
        -   required: no
        -   default: `60`
        -   description: specifies the time in ticks how long a single item burns; higher values burn longer and generate more energy

## Examples

```js
ServerEvents.recipes(event => {
    // removes all bio generator recipes
    event.remove({ type: "oritech:bio_generator" })

    // adds a recipe that converts a glass block into energy for 60 ticks by default
    event.recipes.oritech.bio_generator().itemInputs("glass")

    // adds a recipe that converts any ingot into energy for 60 ticks by default
    event.recipes.oritech.bio_generator().itemInputs("#c:ingots")

    // adds a recipe that converts a cobblestone into energy for 40 ticks
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech.bio_generator().itemInputs("cobblestone").time(40)
})
```
