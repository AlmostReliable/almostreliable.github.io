# Sag Mill

The Sag Mill is a machine that grinds items. It is used to process ores, foods, and other items. It can also be used to process items into dusts. By
making use of Grinding Balls, the Sag Mill can process items more efficiently and increase its output.

## Overview

-   access in recipes event via: `event.recipes.enderio.sag_milling`
-   parameters:
    -   `outputs`
        -   description: specifies the output items, more information [here](../binding/sagmilloutput.md)
        -   type: `<SagMillOutput | SizedIngredient>[]`
        -   role: output
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `input`
        -   description: specifies the input item
        -   type: `Ingredient`
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
    -   `bonus`
        -   description: specifies the bonus type of the recipe, more information [here](../binding/sagmillbonus.md)
        -   type: `SagMillBonus`
        -   role: other
        -   required: no
        -   default: `SagMillBonus.MULTIPLY_OUTPUT`
        -   usage: can be passed as the fourth argument or by chaining the function `.bonus(SagMillBonus)`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all sag milling recipes
    event.remove({ type: "enderio:sag_milling" })

    // adds a recipe that mills an apple into a potato and a carrot
    // uses default values for energy and bonus type
    event.recipes.enderio.sag_milling(["potato", "carrot"], "apple")

    // adds a recipe that mills any ingot into 3 copper ingots, 15 stone with a 50% chance
    // energy usage of 10000
    // no bonus
    event.recipes.enderio.sag_milling(
        [Ingredient.of("#c:ingots/copper", 3), SagMillOutput.of("15x stone", 0.5)],
        "#c:ingots",
        10000,
        SagMillBonus.NONE
    )

    // adds a recipe that mills white wool into a stick
    // energy usage of 500
    // bonus type of chance only
    // uses chaining functions for energy and bonus type
    event.recipes.enderio
        .sag_milling(["stick"], "white_wool")
        .energy(500)
        .bonus(SagMillBonus.CHANCE_ONLY)
})
```
