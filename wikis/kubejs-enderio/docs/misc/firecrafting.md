# Fire Crafting

Fire Crafting allows you to light a specific block on fire. After a bit of time, the fire will extinguish and the block can spawn items.
Optionally, you can specify a block that will replace the ignited block after the fire has extinguished.

## Overview

-   access in recipes event via: `event.recipes.enderio.fire_crafting`
-   properties:
    -   `results`
        -   description: specifies the output items, more information [here](../binding/firecraftingresult.md)
        -   type: `<FireCraftingResult | ItemStack>[]`
        -   role: output
        -   required: yes
        -   usage: passed as the first argument
    -   `block_after_burning`
        -   description: specifies the block that remains after the burning process
        -   type: `Block`
        -   role: output
        -   required: no
        -   default: `minecraft:air`
        -   usage: can be set by chaining the function `.blockAfterBurning(block)`
    -   `base_blocks`
        -   description: specifies the input blocks
        -   type: `Block[]`
        -   role: input
        -   required: no
        -   default: none
        -   usage: can be set by chaining the function `.block(block)`
    -   `base_tags`
        -   description: specifies the input block tags
        -   type: `TagKey<Block>[]`
        -   role: input
        -   required: no
        -   default: none
        -   usage: can be set by chaining the function `.blockTag(tag)`
    -   `dimensions`
        -   description: specifies which dimensions this recipe can activate in
        -   type: `ResourceKey<Level>[]`
        -   role: other
        -   required: no
        -   default: `minecraft:overworld`
        -   usage: can be set by chaining the function `.dimensions(dimensions)`
-   validators:
    -   either `base_blocks` or `base_tags` must be set, or both, and containing at least one entry

## Examples

```js
ServerEvents.recipes(event => {
    // removes all fire crafting recipes
    event.remove({ type: "enderio:fire_crafting" })

    // adds a recipe that spawns a stick and an apple when igniting an iron block
    // iron block will be removed after burning by default
    // limited to the overworld by default
    event.recipes.enderio.fire_crafting(["stick", "apple"]).block("minecraft:iron_block")

    // adds a recipe that spawns 2 golden apples and 3 diamonds when igniting dirt or any kind of glass
    // dirt or glass block will be replaced by a grass block after burning
    // limited to the overworld by default
    event.recipes.enderio
        .fire_crafting(["2x golden_apple", Item.of("minecraft:diamond", 3)])
        .blockAfterBurning("minecraft:grass_block")
        .block("minecraft:dirt")
        .blockTag("c:glass_blocks")

    // adds a recipe that spawns an emerald, 4 diamonds, 2 sticks, and has a 50% chance to spawn up to
    //  16 potatoes when igniting obsidian
    // obsidian will be replaced by cobblestone after burning
    // can only be activated in the overworld and the nether
    event.recipes.enderio
        .fire_crafting([
            "emerald",
            FireCraftingResult.of("diamond", 4),
            FireCraftingResult.of("stick", 2, 8),
            FireCraftingResult.of("potato", 0, 16, 0.5),
        ])
        .block("minecraft:obsidian")
        .blockAfterBurning("minecraft:cobblestone")
        .dimensions(["minecraft:overworld", "minecraft:the_nether"])
})
```
