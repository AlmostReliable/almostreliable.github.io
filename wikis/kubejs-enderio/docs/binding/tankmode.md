# Tank Mode

The `TankMode` is a utility binding that allows you to define the `Mode` for [Tank recipes](../machine/tank.md).

A `Mode` specifies the behavior of the tank in the recipe.

## Overview

-   access via: `TankMode`
-   values:
    -   `TankMode.FILL`
        -   the recipe will fill the item with the specified fluid from the Tank
    -   `TankMode.EMPTY`
        -   the recipe will drain the fluid from the item into the Tank

## Examples

This binding is intended to be used inside [Tank recipes](../machine/tank.md). Pass it to the `mode` parameter to define the mode of the recipe.
It's also possible to use the strings `"FILL"` and `"EMPTY"` instead of the binding.

```js
ServerEvents.recipes(event => {
    event.recipes.enderio.tank("stick", "white_wool", "water", TankMode.FILL)
})
```
