# Mining Lens

Mining Lens recipes are used by the Atomic Reconstructor when it has a Lens of the Miner. The laser converts the block it hits into an ore. By default, Actually Additions uses it to turn stone, deepslate, and netherrack into ores of the matching kind.

For the Atomic Reconstructor itself, refer to the [Atomic Reconstructor](../machine/atomicreconstructor.md) page.

## Weight

When multiple recipes match the hit block, one of them is picked at random. The weight of a recipe defines how likely it is picked compared to the others. The chance of a recipe is its weight divided by the sum of the weights of all recipes that match the block. A recipe with a weight of 100 is picked twice as often as a recipe with a weight of 50.

The default recipes of Actually Additions use the item tags `#actuallyadditions:stone_ore_replaceables`, `#actuallyadditions:deepslate_ore_replaceables`, and `#c:ore_bearing_ground/netherrack` as ingredients. Use these tags to add ores to the existing selection.

> [!WARNING] NOTE
> The result has to be a block. If the picked result isn't a block, the hit block stays unchanged.

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.mining_lens`
- properties:
    - `result`
        - description: specifies the block the hit block turns into
        - type: `ItemStack`
        - role: output
        - required: yes
        - usage: needs to be passed as the first argument
    - `ingredient`
        - description: specifies the block that can be converted
        - type: `Ingredient`
        - role: input
        - required: yes
        - usage: needs to be passed as the second argument
    - `weight`
        - description: specifies how likely the recipe is picked, more information [above](#weight)
        - type: `int`
        - role: other
        - required: no
        - limits: must not be negative
        - default: `10`
        - usage: can be passed as the third argument or by chaining the function `.weight(int)`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all mining lens recipes
    event.remove({ type: "actuallyadditions:mining_lens" })

    // adds a recipe that converts all blocks from the stone ore replaceables tag into diamond ore
    // uses the default weight of 10
    event.recipes.actuallyadditions.mining_lens(
        "diamond_ore",
        "#actuallyadditions:stone_ore_replaceables"
    )

    // adds a recipe that converts coal ore into diamond ore
    // uses a weight of 200
    event.recipes.actuallyadditions.mining_lens("diamond_ore", "coal_ore", 200)

    // adds a recipe that converts netherrack into ancient debris
    // uses a weight of 5
    // uses the chaining function for weight
    event.recipes.actuallyadditions.mining_lens("ancient_debris", "netherrack").weight(5)
})
```
