# Liquid Fuel

Liquid Fuel recipes define which fluids the Oil Generator can burn and how much energy they generate.

Each time the Oil Generator starts burning, it takes the fuel amount of the recipe from its tank. It then generates the total energy spread evenly over the burn time. A fuel with 1000 CF and 100 ticks generates 10 CF per tick.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.liquid_fuel`
- properties:
    - `fuel`
        - description: specifies the fluid and the amount that is burned at once
        - type: `FluidStack`
        - role: input
        - required: yes
        - limits:
            - at most 2000 mB (2 buckets), which is the tank size of the Oil Generator
            - fluid tags are not supported
        - usage: needs to be passed as the first argument
    - `total_energy`
        - description: specifies the energy generated from the fuel amount
        - type: `int`
        - role: other
        - required: no
        - default: `1000`
        - usage: can be passed as the second argument or by chaining the function `.energy(int)`
    - `burn_time`
        - description: specifies the time in ticks the fuel amount burns
        - type: `int`
        - role: other
        - required: no
        - limits: must be greater than 0
        - default: `100`
        - usage: can be passed as the third argument or by chaining the function `.time(int)`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all liquid fuel recipes
    event.remove({ type: "actuallyadditions:liquid_fuel" })

    // adds a fuel that burns a bucket of lava
    // uses the default energy of 1000 CF
    // uses the default burn time of 100 ticks (5 seconds), so it generates 10 CF/t
    event.recipes.actuallyadditions.liquid_fuel("lava")

    // adds a fuel that burns 200 mB of water
    // generates 2000 CF in total
    // burns for 50 ticks (2.5 seconds), so it generates 40 CF/t
    event.recipes.actuallyadditions.liquid_fuel(Fluid.of("water", 200), 2000, 50)

    // adds a fuel that burns 100 mB of refined canola oil
    // generates 20000 CF in total
    // burns for 200 ticks (10 seconds), so it generates 100 CF/t
    // uses chaining functions for energy and time
    event.recipes.actuallyadditions
        .liquid_fuel(Fluid.of("actuallyadditions:refined_canola_oil", 100))
        .energy(20000)
        .time(200)
})
```
