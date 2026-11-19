# Color Change

Color Change recipes are used by the Atomic Reconstructor when it has a Lens of Color. The laser converts the block it hits and all dropped items inside that block. By default, Actually Additions uses it to cycle through the colors of dyes, wool, glass, terracotta, and similar blocks.

For the Atomic Reconstructor itself, refer to the [Atomic Reconstructor](../machine/atomicreconstructor.md) page.

> [!WARNING] NOTE
> The hit block is only converted if the result is a block. Dropped items are converted to any result.
>
> If multiple recipes match the same ingredient, only one of them is used. Remove the existing recipe first when you want to change the result for an ingredient Actually Additions already handles.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.color_change`
- properties:
    - `result`
        - description: specifies the output item or block
        - type: `ItemStack`
        - role: output
        - required: yes
        - usage: needs to be passed as the first argument
    - `ingredient`
        - description: specifies the input item or block
        - type: `Ingredient`
        - role: input
        - required: yes
        - usage: needs to be passed as the second argument

## Examples

```js
ServerEvents.recipes(event => {
    // removes all color change recipes
    event.remove({ type: "actuallyadditions:color_change" })

    // adds a recipe that converts stone into diorite
    event.recipes.actuallyadditions.color_change("diorite", "stone")

    // adds a recipe that converts any wool into black wool
    event.recipes.actuallyadditions.color_change("black_wool", "#minecraft:wool")
})
```
