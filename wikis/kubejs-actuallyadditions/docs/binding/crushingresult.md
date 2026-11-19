# Crushing Result

The `CrushingResult` is a utility binding that allows you to easily create outputs with a chance for [Crusher recipes](../machine/crusher.md).

A plain item like `"2x gravel"` or `Item.of("gravel", 2)` can be used as an output as well. It always uses a chance of 100%.

## Overview

- access in server scripts via: `CrushingResult`
- properties:
    - `stack`
        - description: specifies the output item and its count
        - type: `ItemStack`
        - required: yes
    - `chance`
        - description: specifies the chance of the output, between `0` and `1`
        - type: `float`
        - required: no
        - default: `1.0` (100% chance)
- methods:
    - `of(ItemStack stack)`
        - creates an output with a guaranteed chance of 100%
    - `of(ItemStack stack, float chance)`
        - creates an output with a custom chance

## Examples

This binding is intended to be used inside [Crusher recipes](../machine/crusher.md). Pass it to the `result` parameter to define an output with a chance. You can also store the outputs in a variable and reuse them in multiple recipes.

```js
ServerEvents.recipes(event => {
    // creates an output of a flint with a 25% chance
    const flint = CrushingResult.of("flint", 0.25)

    // adds a recipe that crushes gravel into sand and has a 25% chance to give a flint as well
    event.recipes.actuallyadditions.crushing(["sand", flint], "gravel")

    // adds a recipe that crushes cobblestone into gravel and has a 25% chance to give a flint as well
    event.recipes.actuallyadditions.crushing([CrushingResult.of("gravel"), flint], "cobblestone")
})
```
