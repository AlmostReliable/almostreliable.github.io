# Painting Machine

The Painting Machine allows painting blocks to change their appearance. In the base mod, this is used to create painted variants of blocks like
fences, stairs, slabs, walls, and much more.<br>
However, it can also be used to create all kinds of recipes. In the examples at the bottom, you can see that you can even convert an apple into a stick.
This doesn't make much sense, but it's possible as long as the machine contains some dummy block.

## Overview

-   access in recipes event via: `event.recipes.enderio.painting`
-   parameters:
    -   `output`
        -   description: specifies the output item
        -   type: `ItemStack`
        -   role: output
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `input`
        -   description: specifies the input item
        -   type: `Ingredient`
        -   role: input
        -   required: yes
        -   usage: needs to be passed as the second argument

## Examples

```js
ServerEvents.recipes(event => {
    // removes all painting recipes
    event.remove({ type: "enderio:painting" })

    // adds a recipe that paints an apple into a stick
    event.recipes.enderio.painting("stick", "apple")

    // adds a recipe that paints any glass block into a potato
    event.recipes.enderio.painting("potato", "#c:glass_blocks")
})
```
