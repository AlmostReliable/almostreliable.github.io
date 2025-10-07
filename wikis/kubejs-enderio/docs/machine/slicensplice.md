# Slice'N'Splice

The Slice'N'Splice is a precision crafting machine designed to cut and assemble complex materials, often used for crafting advanced machine parts, tools,
and components that require organic materials such as zombie heads or other special items.

## Overview

-   access in recipes event via: `event.recipes.enderio.slicing`
-   properties:
    -   `output`
        -   description: specifies the output item
        -   type: `ItemStack`
        -   role: output
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `inputs`
        -   description: specifies the input items
        -   type: `Ingredient[]`
        -   role: input
        -   required: yes
        -   usage: needs to be passed as the second argument
    -   `energy`
        -   description: specifies the energy usage of the recipe
        -   type: `int`
        -   role: other
        -   required: no
        -   default: `2000`
        -   usage: can be passed as the third argument or by chaining the function `.energy(int)`
-   validators:
    -   `inputs` must contain exactly 6 items

## Examples

```js
ServerEvents.recipes(event => {
    // removes all slicing recipes
    event.remove({ type: "enderio:slicing" })

    // adds a recipe that slices 2 apples, a bone, 2 rotten flesh, and an egg into a stick
    // uses the default value for energy
    event.recipes.enderio.slicing("stick", [
        "apple",
        "bone",
        "apple",
        "rotten_flesh",
        "egg",
        "rotten_flesh",
    ])

    // adds a recipe that slices any 3 glass, a stick, any ingot, 15 granite, any 3 iron ingots, and
    //  an apple into 15 stone
    // energy usage of 5000
    // uses the chaining function for energy
    event.recipes.enderio
        .slicing(Item.of("stone", 15), [
            "#c:glass_blocks",
            "stick",
            Ingredient.of("#c:ingots"),
            Item.of("granite"),
            "#c:ingots/iron",
            "apple",
        ])
        .energy(5000)
})
```
