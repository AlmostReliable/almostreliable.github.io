# Fire Crafting

Fire Crafting allows you to light a specific block on fire. After a bit of time, the fire will extinguish and the block will spawn items from
the specified loot table. Optionally, you can specify a block that will replace the ignited block after the fire has extinguished.<br>
To avoid loot explosions when using a loot table with a lot of items, you can also limit the item count.

## Overview

-   access in recipes event via: `event.recipes.enderio.fire_crafting`
-   properties:
    -   `loot_table`
        -   description: specifies the output items that are spawned when the block is ignited
        -   type: `ResourceKey<LootTable>`, a string in the format of a `ResourceLocation`
        -   role: other
        -   required: yes
        -   usage: needs to be passed as the first argument
    -   `base_blocks`
        -   description: specifies the blocks that can be ignited
        -   type: `Block[]`
        -   role: input
        -   required: partially, at least one block or block tag needs to be passed
        -   usage: single blocks can be added by chaining the function `.block`
    -   `base_tags`
        -   description: specifies the block tags that can be ignited
        -   type: `TagKey<Block>[]`
        -   role: input
        -   required: partially, at least one block or block tag needs to be passed
        -   usage: single block tags can be added by chaining the function `.blockTag`
    -   `block_after_bruning`
        -   description: specifies the block that will replace the ignited block after the fire has extinguished
        -   type: `Block`
        -   role: output
        -   required: no
        -   default: `null`, the block will not be replaced
        -   usage: can be specified by chaining the function `.blockAfterBurning`
    -   `dimensions`
        -   description: specifies the dimensions in which the fire crafting can be triggered
        -   type: `ResourceKey<Level>[]`, strings in the format of `ResourceLocation`s
        -   role: other
        -   required: no
        -   default: `["minecraft:overworld"]`
        -   usage: can be specified by chaining the function `.dimensions`
    -   `max_item_drops`
        -   description: specifies the maximum count of items that can be spawned from the loot table
        -   type: `int`
        -   role: other
        -   required: no
        -   default: `1000`
        -   usage: can be specified by chaining the function `.maxItemDrops`
-   validation:
    -   at least one block or block tag needs to be passed, you can also use a combination of both

## Examples

```js
ServerEvents.recipes(event => {
    // removes all fire crafting recipes
    event.remove({ type: "enderio:fire_crafting" })

    // spawns items from the simple dungeon loot table when igniting dirt
    // limited to the overworld by default
    // limited to 1000 item drops by default
    // block is not replaced after burning by default
    event.recipes.enderio.fire_crafting("minecraft:chests/simple_dungeon").block("minecraft:dirt")

    // spawns items from the simple dungeon loot table when igniting any kind of glass block
    // block is replaced with cobblestone after burning
    // limited to the nether and the end
    // limited to 3 item drops
    event.recipes.enderio
        .fire_crafting("minecraft:chests/simple_dungeon")
        .blockTag("c:glass_blocks")
        .blockAfterBurning("minecraft:cobblestone")
        .dimensions(["minecraft:the_nether", "minecraft:the_end"])
        .maxItemDrops(3)
})
```
