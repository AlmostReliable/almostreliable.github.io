# Canola Press

The Canola Press presses an item into a fluid. By default, Actually Additions uses it to press Canola into Canola Oil.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.pressing`
- properties:
    - `fluid`
        - description: specifies the output fluid
        - type: `FluidStack`
        - role: output
        - required: yes
        - limits: at most 2000 mB (2 buckets), which is the tank size of the Canola Press
        - usage: needs to be passed as the first argument
    - `ingredient`
        - description: specifies the input item
        - type: `Ingredient`
        - role: input
        - required: yes
        - usage: needs to be passed as the second argument

## Examples

```js
ServerEvents.recipes(event => {
    // removes all canola press recipes
    event.remove({ type: "actuallyadditions:pressing" })

    // adds a recipe that presses a magma block into a bucket of lava
    event.recipes.actuallyadditions.pressing("lava", "magma_block")

    // adds a recipe that presses any sapling into 250 mB of water
    event.recipes.actuallyadditions.pressing(Fluid.of("water", 250), "#minecraft:saplings")

    // adds a recipe that presses canola seeds into 20 mB of canola oil
    event.recipes.actuallyadditions.pressing(
        Fluid.of("actuallyadditions:canola_oil", 20),
        "actuallyadditions:canola_seeds"
    )
})
```
