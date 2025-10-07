# Sag Mill Output

The `SagMillOutput` is a utility binding that allows you to easily create `OutputItem`s for [Sag Mill recipes](../machine/sagmill.md).

An `OutputItem` is a convenience type added by EnderIO that supports `ItemStack`s and `TagKey`s. Its main purpose is to allow the usage of tags
as outputs in Sag Mill recipes. This way, EnderIO doesn't need to add a material for every compat recipe they have. Instead they can use the respective tag.

It also supports chance-based outputs which can be useful for something like byproducts.

## Overview

-   access in recipes event via: `SagMillOutput`
-   properties:
    -   `output`
        -   description: specifies the output item or tag
        -   type: `ItemStack | TagKey`
        -   required: yes
    -   `count`
        -   description: specifies the count of the output item, only required when using a tag
        -   type: `int`
        -   required: no
        -   default: `1`
    -   `chance`
        -   description: specifies the chance of the output item, between `0` and `1`
        -   type: `float`
        -   required: no
        -   default: `1` (100% chance)
    -   `optional`
        -   description: this property is currently unused and has no effect
        -   type: `boolean`
        -   required: no
        -   default: `false`
-   methods:
    -   `of(ItemStack output, float chance, boolean optional)`
        -   creates an `OutputItem` with a chance-based output and the optional property
    -   `of(ItemStack output, float chance)`
        -   creates an `OutputItem` with a chance-based output (sets optional to false)
    -   `of(ItemStack output)`
        -   creates an `OutputItem` with a guaranteed output (100% chance) (sets optional to false)
    -   `ofTag(TagKey output, int count, float chance, boolean optional)`
        -   creates an `OutputItem` with a chance-based output using a tag and the optional property
    -   `ofTag(TagKey output, int count, float chance)`
        -   creates an `OutputItem` with a chance-based output using a tag (sets optional to false)
    -   `ofTag(TagKey output, int count)`
        -   creates an `OutputItem` with a guaranteed output (100% chance) using a tag (sets optional to false)

## Examples

This binding is intended to be used inside [Sag Mill recipes](../machine/sagmill.md). Pass it to the `outputs` parameter to define complex outputs. You
can also store the outputs in a variable and reuse them in multiple recipes.

```js
ServerEvents.recipes(event => {
    // creates an OutputItem that outputs 3 stone with a 50% chance
    const output1 = SagMillOutput.of("3x stone", 0.5)
    // creates an OutputItem that outputs 1 diamond with a 100% chance
    const output2 = SagMillOutput.of("minecraft:diamond")
    // creates an OutputItem that outputs 5 items from the tag #c:glass_blocks
    const output3 = SagMillOutput.ofTag("#c:glass_blocks", 5)
    // creates an OutputItem that outputs 2 items from the tag #c:ingots with a 25% chance
    const output4 = SagMillOutput.ofTag("#c:ingots", 2, 0.25)

    // you can also use wrappers inside the methods
    const output5 = SagMillOutput.of(Item.of("stone", 3), 0.5)
    const output6 = SagMillOutput.ofTag(Ingredient.of("#c:glass_blocks"), 5)
})
```
