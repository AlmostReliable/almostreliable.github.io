# Fire Crafting Result

The `FireCraftingResult` is a utility binding that allows you to easily create `Result`s for [Fire Crafting recipes](../misc/firecrafting.md).

A `Result` is a convenience type added by EnderIO that supports `ItemStack`s with min and max counts, as well as chances.

## Overview

-   access in recipes event via: `FireCraftingResult`
-   properties:
    -   `result`
        -   description: specifies the output item
        -   type: `ItemStack`
        -   required: yes
    -   `minCount`
        -   description: specifies the minimum count of the output item
        -   type: `int`
        -   required: no
        -   default: `1`
        -   note: the count of the `ItemStack` is ignored if defined
    -   `maxCount`
        -   description: specifies the maximum count of the output item
        -   type: `int`
        -   required: no
        -   default: `1`
        -   note: the count of the `ItemStack` is ignored if defined
    -   `chance`
        -   description: specifies the chance of the output item, between `0` and `1`
        -   type: `float`
        -   required: no
        -   default: `1.0` (100% chance)
-   methods:
    -   `of(ItemStack result, int minCount, int maxCount, float chance)`
        -   creates a `Result` with the specified item between the specified min and max count, with the specified chance
    -   `of(ItemStack result, int minCount, int maxCount)`
        -   creates a `Result` with the specified item between the specified min and max count, with a 100% chance
    -   `of(ItemStack result, int count)`
        -   creates a `Result` with the specified item with the specified count, with a 100% chance
    -   `of(ItemStack result)`
        -   creates a `Result` with the specified item with the count of the item, with a 100% chance

## Examples

This binding is intended to be used inside [Fire Crafting recipes](../misc/firecrafting.md). Pass it to the `results` parameter to define complex outputs. You
can also store the outputs in a variable and reuse them in multiple recipes.

```js
ServerEvents.recipes(event => {
    // creates a Result that outputs 3 stone with a 100% chance
    const output1 = FireCraftingResult.of("3x stone")
    // creates a Result that outputs 5 diamonds with a 100% chance
    const output2 = FireCraftingResult.of("minecraft:diamond", 5)
    // creates a Result that outputs 5 to 10 apples with a 100% chance
    const output3 = FireCraftingResult.of("apple", 5, 10)
    // creates a Result that outputs 2 to 15 carrots with a 25% chance
    const output4 = FireCraftingResult.of("carrot", 2, 15, 0.25)
})
```
