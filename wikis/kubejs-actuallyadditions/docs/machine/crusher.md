# Crusher

The Crusher and the Double Crusher crush an item into one or two outputs. The second output can have a chance, which makes it useful for byproducts.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.crushing`
- properties:
    - `result`
        - description: specifies the output items, items without a chance use a chance of 100%, more information [here](../binding/crushingresult.md)
        - type: `<CrushingResult | ItemStack>[]`
        - role: output
        - required: yes
        - limits:
            - min 1
            - max 2
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
    // removes all crusher recipes
    event.remove({ type: "actuallyadditions:crushing" })

    // adds a recipe that crushes cobblestone into 2 gravel
    event.recipes.actuallyadditions.crushing("2x gravel", "cobblestone")

    // adds a recipe that crushes any stone into 2 gravel and a sand
    // the sand uses the default chance of 100%
    event.recipes.actuallyadditions.crushing(["2x gravel", "sand"], "#c:stones")

    // adds a recipe that crushes any iron ore into 2 raw iron
    // has a 10% chance to give a raw gold as well
    event.recipes.actuallyadditions.crushing(
        ["2x raw_iron", CrushingResult.of("raw_gold", 0.1)],
        "#c:ores/iron"
    )

    // adds a recipe that crushes a magma block into 2 netherrack
    // has a 20% chance to give a magma cream as well
    event.recipes.actuallyadditions.crushing(
        [Item.of("minecraft:netherrack", 2), CrushingResult.of("magma_cream", 0.2)],
        "minecraft:magma_block"
    )
})
```
