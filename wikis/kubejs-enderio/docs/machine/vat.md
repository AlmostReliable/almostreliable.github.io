# Vat

The Vat combines fluids with solid reagents to produce new fluids through a processing step that takes time.
It accepts two solid reagents (left and right) and one input fluid, producing one output fluid after processing.

Vat recipes also support the concept of Vat Reagents, which modify the output quantity based on the reagents used.
To modify the Vat Reagents, please refer to the [Vat Reagents Event](../event/vatreagents.md) page.

## Overview

-   access in recipes event via: `event.recipes.enderio.vat_fermenting`
-   properties:
    -   `output`
        -   description: specifies the output fluid
        -   type: `FluidStack`
        -   role: output
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `input`
        -   description: specifies the input fluid
        -   type: `SizedFluidIngredient`
        -   role: input
        -   required: yes
        -   usage: needs to be passed as the second argument
    -   `left_reagent`
        -   description: specifies the tag of the item to be used in the left reagent slot
        -   type: `TagKey<Item>`
        -   role: input
        -   required: yes
        -   usage: needs to be passed as the third argument
    -   `right_reagent`
        -   description: specifies the tag of the item to be used in the right reagent slot
        -   type: `TagKey<Item>`
        -   role: input
        -   required: yes
        -   usage: needs to be passed as the fourth argument
    -   `ticks`
        -   description: specifies the time in ticks of the recipe
        -   type: `int`
        -   role: other
        -   required: no
        -   default: `60`
        -   usage: can be passed as the fifth argument or by chaining the function `.ticks(int)`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all vat recipes
    event.remove({ type: "enderio:vat_fermenting" })

    // adds a recipe that ferments 1 bucket of any water into 3 buckets of lava by using any blaze rod
    //  and any igniter
    event.recipes.enderio.vat_fermenting(
        Fluid.of("lava", 3000),
        "#c:water",
        "#c:rods/blaze",
        "#c:tools/igniter"
    )

    // adds a recipe that ferments 3 buckets of lava into 1 bucket of water by using any lapis
    //  and any blue dye
    // uses the chaining function for amount of ticks
    event.recipes.enderio
        .vat_fermenting("water", Fluid.of("lava", 3000), "#c:gems/lapis", "#c:dyes/blue")
        .ticks(200)
})
```
