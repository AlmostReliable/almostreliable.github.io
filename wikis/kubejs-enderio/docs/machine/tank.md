# Tank

The Tank allows automated filling and emptying of items with fluids. It supports both fill and drain modes, enabling flexible fluid interactions
with containers, buckets, bottles, or any modded fluid-handling items.

## Overview

-   access in recipes event via: `event.recipes.enderio.tank`
-   properties:
    -   `output`
        -   description: specifies the output item
        -   type: `ItemStack`
        -   role: output
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `input`
        -   description: specifies the input item to be filled or drained
        -   type: `Ingredient`
        -   role: input
        -   required: yes
        -   usage: needs to be passed as the second argument
    -   `fluid`
        -   description: specifies the fluid to fill into or extract from the item
        -   type: `FluidStack`
        -   role: other
        -   required: yes
        -   usage: needs to be passed as the third argument
    -   `mode`
        -   description: specifies whether the recipe fills or drains fluid, more information [here](../binding/tankmode.md)
        -   type: `TankMode`
        -   role: other
        -   required: no
        -   default: `TankMode.FILL`
        -   usage: can be passed as the fourth argument or activate emptying by chaining the function `.emptying()`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all tank recipes
    event.remove({ type: "enderio:tank" })

    // adds a recipe that converts an apple to a stick by filling the item with 1 bucket of
    //  water from the tank
    event.recipes.enderio.tank("stick", "apple", "water")

    // adds a recipe that converts a 3 carrots to a potato by draining 5 buckets of lava from
    //  the item into the tank
    event.recipes.enderio.tank("potato", "3x carrot", Fluid.of("lava", 5000), TankMode.EMPTY)

    // adds a recipe that converts a 5 sticks to a 3 stone by draining 1 bucket of water from
    //  the item into the tank
    // uses the chaining function for emptying
    event.recipes.enderio.tank("3x stone", Item.of("stick", 5), "water").emptying()
})
```
