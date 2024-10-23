# Alloy Smelting

The Alloy Smelter allows smelting multiple items into an alloy. Additionally, it is capable of processing simple smelting recipes
at three times the rate of a regular vanilla Furnace.

## Recipe Inheritance

It is important to note that the Alloy Smelter (non-primitive variant) inherits all vanilla smelting recipes automatically. If you
want to remove specific smelting recipes from the Alloy Smelter without removing them from other blocks like the Furnace, you should
remove them by their recipe ID. Inherited recipes are always prefixed with `smelting/modid/`.

```js
ServerEvents.recipes(event => {
    // remove a specific smelting recipe from the Alloy Smelter
    event.remove({ id: "enderio:smelting/minecraft/stone" })
    // remove all smelting recipes from the Alloy Smelter using regular expressions
    event.remove({ id: /enderio:smelting\/.*/ })
    // remove all smelting recipes of a specific mod from the Alloy Smelter using regular expressions
    event.remove({ id: /enderio:smelting\/thermal\/.*/ })
})
```

## Overview

-   access in recipes event via: `event.recipes.enderio.alloy_smelting`
-   properties:
    -   `output`
        -   description: specifies the output item
        -   type: `ItemStack`
        -   role: output
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `inputs`
        -   description: specifies the input items
        -   type: `SizedIngredient[]`
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
    -   `experience`
        -   description: specifies the experience gained from the recipe
        -   type: `float`
        -   role: other
        -   required: no
        -   default: `0`
        -   usage: can be passed as the fourth argument or by chaining the function `.experience(float)`
    -   `is_smelting`
        -   description: specifies if the recipe should be copied to the vanilla smelting recipe type, more information below
        -   type: `boolean`
        -   role: other
        -   required: no
        -   default: `false`
        -   usage: can be passed as the fifth argument or by chaining the function `.smelting()` which will set the value to `true`

## Smelting Mode

The smelting mode of an Alloy Smelter recipe defines if the recipe is inherited from the vanilla smelting recipe type. When a
recipe's smelting mode is enabled, it will also have a custom recipe ID that is prefixed with `smelting/modid/`. This indicates
inheritance from vanilla to EnderIO.

When creating custom Alloy Smelter recipes with KubeJS, you can use the smelting mode to tell KubeJS EnderIO to copy the recipe to
vanilla. The following example will copy an Alloy Smelter recipe to the vanilla recipe type, so it can be used by blocks like the
vanilla Furnace. It will use the same recipe ID with a `_inherited` suffix. To allow inheritance from KubeJS to vanilla, the recipes
must have exactly one input and one output. Recipes with multiple inputs will be ignored.

```js
ServerEvents.recipes(event => {
    event.recipes.enderio.alloy_smelting("minecraft:iron_ingot", "minecraft:gold_ingot").smelting()
})
```

## Examples

```js
ServerEvents.recipes(event => {
    // removes all alloy smelting recipes
    event.remove({ type: "enderio:alloy_smelting" })

    // adds a recipe that smelts a gold ingot into an iron ingot
    // uses default values for energy, experience, and smelting mode
    event.recipes.enderio.alloy_smelting(
        Item.of("minecraft:iron_ingot"),
        Ingredient.of("minecraft:gold_ingot")
    )

    // adds a recipe that smelts an iron ingot and a gold ingot into 2 sticks
    // energy usage of 5000
    // experience of 5.5
    event.recipes.enderio.alloy_smelting(
        Item.of("minecraft:stick", 2),
        [Item.of("minecraft:iron_ingot"), Ingredient.of("minecraft:gold_ingot")],
        5000,
        5.5
    )

    // adds a recipe that smelts a carrot, a potato, and 2 apples into a diamond
    // energy usage of 10000
    // experience of 3
    // uses chaining functions for energy and experience
    event.recipes.enderio
        .alloy_smelting(Item.of("minecraft:diamond"), [
            Ingredient.of("minecraft:carrot"),
            "minecraft:potato",
            "2x minecraft:apple",
        ])
        .energy(10000)
        .experience(3)
})
```
