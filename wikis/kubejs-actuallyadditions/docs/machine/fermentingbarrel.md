# Fermenting Barrel

The Fermenting Barrel ferments one fluid into another over time. By default, Actually Additions uses it to turn Canola Oil into Refined Canola Oil.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.fermenting`
- properties:
    - `result`
        - description: specifies the output fluid
        - type: `FluidStack`
        - role: output
        - required: yes
        - limits: at most 2000 mB (2 buckets), which is the tank size of the Fermenting Barrel
        - usage: needs to be passed as the first argument
    - `ingredient`
        - description: specifies the input fluid
        - type: `FluidStack`
        - role: input
        - required: yes
        - limits:
            - at most 2000 mB (2 buckets), which is the tank size of the Fermenting Barrel
            - fluid tags are not supported
        - usage: needs to be passed as the second argument
    - `time`
        - description: specifies the time in ticks the recipe takes
        - type: `int`
        - role: other
        - required: no
        - limits: must be greater than 0
        - default: `100`
        - usage: can be passed as the third argument or by chaining the function `.time(int)`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all fermenting barrel recipes
    event.remove({ type: "actuallyadditions:fermenting" })

    // adds a recipe that ferments a bucket of lava into a bucket of water
    // uses the default time of 100 ticks (5 seconds)
    event.recipes.actuallyadditions.fermenting("water", "lava")

    // adds a recipe that ferments 80 mB of canola oil into 40 mB of refined canola oil
    // takes 200 ticks (10 seconds)
    event.recipes.actuallyadditions.fermenting(
        Fluid.of("actuallyadditions:refined_canola_oil", 40),
        Fluid.of("actuallyadditions:canola_oil", 80),
        200
    )

    // adds a recipe that ferments 500 mB of water into 250 mB of milk
    // takes 40 ticks (2 seconds)
    // uses the chaining function for time
    event.recipes.actuallyadditions.fermenting(Fluid.of("milk", 250), Fluid.of("water", 500)).time(40)
})
```
