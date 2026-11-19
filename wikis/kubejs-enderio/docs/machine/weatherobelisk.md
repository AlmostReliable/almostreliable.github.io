# Weather Obelisk

The Weather Obelisk changes the weather by launching a firework that consumes a fluid. Each recipe links a fluid amount to a weather mode.

## Overview

- access in recipes event via: `event.recipes.enderio.weather_change`
- properties:
    - `fluid`
        - description: specifies the fluid and amount the Weather Obelisk consumes
        - type: `FluidStack`
        - role: input
        - required: yes
        - usage: needs to be passed as the first argument
    - `mode`
        - description: specifies the weather the recipe changes to, more information [here](../binding/weathermode.md)
        - type: `WeatherMode`
        - role: other
        - required: yes
        - usage: needs to be passed as the second argument

## Examples

```js
ServerEvents.recipes(event => {
    // removes all weather change recipes
    event.remove({ type: "enderio:weather_change" })

    // adds a recipe that makes it rain for 500 mB of water
    event.recipes.enderio.weather_change(Fluid.of("minecraft:water", 500), WeatherMode.RAIN)

    // adds a recipe that causes a thunderstorm for 1 bucket of lava
    // uses a string instead of the binding
    event.recipes.enderio.weather_change(Fluid.of("minecraft:lava", 1000), "lightning")
})
```
