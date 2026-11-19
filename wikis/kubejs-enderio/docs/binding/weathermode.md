# Weather Mode

The `WeatherMode` is a utility binding that allows you to define the `WeatherMode` for [Weather Obelisk recipes](../machine/weatherobelisk.md).

> [!WARNING] NOTE
> This binding only exists since mod version 1.21.1-0.14.0.

## Overview

- access via: `WeatherMode`
- values:
    - `WeatherMode.CLEAR`
        - the recipe clears the weather
    - `WeatherMode.RAIN`
        - the recipe starts rain
    - `WeatherMode.LIGHTNING`
        - the recipe starts a thunderstorm

## Examples

This binding is intended to be used inside [Weather Obelisk recipes](../machine/weatherobelisk.md). Pass it to the `mode` parameter to define the weather of the recipe. It's also possible to use the strings `"clear"`, `"rain"`, and `"lightning"` instead of the binding.

```js
ServerEvents.recipes(event => {
    event.recipes.enderio.weather_change(Fluid.of("minecraft:water", 500), WeatherMode.RAIN) // [!code focus]
})
```
