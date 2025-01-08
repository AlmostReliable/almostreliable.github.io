# Enchanter

The Enchanter allows to craft enchantments using items. When defining a recipe for a specific enchantment, the Enchanter will automatically
generate recipes for each level of the enchantment. The cost multiplier defines the experience cost that is required to craft each consecutive
level of the enchantment.

## Overview

-   access in recipes event via: `event.recipes.enderio.enchanting`
-   properties:
    -   `enchantment`
        -   description: specifies the enchantment recipes should be generated for
        -   type: `Holder<Enchantment>`, a string in the format of a `ResourceLocation`
        -   role: other
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `input`
        -   description: specifies the input item, the count will be multiplied by the enchantment level
        -   type: `SizedIngredient`
        -   role: input
        -   required: yes
        -   usage: needs to be passed as the second argument
    -   `cost_multiplier`
        -   description: specifies the experience cost multiplier for each consecutive level of the enchantment, more information below
        -   type: `int`
        -   role: other
        -   required: no
        -   default: `1`
        -   usage: can be passed as the third argument or by chaining the function `.costMultiplier(int)`

## Cost Multiplier

The cost multiplier is not a direct multiplier for the experience cost of the enchantment. A multiplier of 1 will not result in a linear cost increase.
It depends on the enchantment level and the enchantment base cost as well as config values.

The formula for the experience cost of a recipe is the following:

```
level = Math.min(enchantment.level, enchantment.max_level)
min_cost = Math.max(1, enchantment.min_cost)
min_cost = min_cost * cost_multiplier
cost = Math.round(min_cost * EnderIOConfig.ENCHANTER_LEVEL_COST_FACTOR)
cost = cost + EnderIOConfig.ENCHANTER_BASE_LEVEL_COST

if level < enchantment.max_level {
    next_cost = get_cost_for_level(level + 1)
    cost = Math.max(next_cost / 2, cost)
}

return Math.max(1, cost)
```

As an example for the enchantment `"minecraft:thorns"` which has three levels and a cost multiplier of `3`, you get the following costs:

![](/../img/thorns-costs.png)

## Examples

```js
ServerEvents.recipes(event => {
    // removes all enchanting recipes
    event.remove({ type: "enderio:enchanting" })

    // adds a recipe that gives sharpness from granite
    // uses the default value for the cost multiplier
    event.recipes.enderio.enchanting("minecraft:sharpness", "granite")

    // adds a recipe that gives thorns from 5 diorite
    // this means level 2 will cost 10 diorite, level 3 will cost 15 diorite, etc.
    // cost multiplier of 3
    event.recipes.enderio.enchanting("minecraft:thorns", Ingredient.of("diorite", 5), 3)

    // adds a recipe that gives protection from any 2 glass blocks
    // cost multiplier of 2
    // uses chaining functions for the cost multiplier
    event.recipes.enderio
        .enchanting("minecraft:protection", Ingredient.of("#c:glass_blocks", 2))
        .costMultiplier(2)
})
```
