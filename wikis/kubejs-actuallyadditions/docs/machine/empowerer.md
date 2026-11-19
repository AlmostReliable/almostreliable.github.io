# Empowerer

The Empowerer turns a base item into a result by using four modifier items. The base item is placed on the Empowerer and the modifiers on four Display Stands, which have to be exactly three blocks away from the Empowerer in each horizontal direction. The order of the modifiers doesn't matter.

The Display Stands provide the energy. Each Display Stand uses the energy of the recipe, split evenly over the recipe time and rounded down. A recipe with 1000 CF and 100 ticks takes 10 CF per tick from each Display Stand, so 4000 CF in total. The recipe pauses while a Display Stand doesn't have enough energy for the next tick.

To react to finished Empowerer recipes, refer to the [Empower event](../event/empower.md).

## Overview

- access in recipes event via: `event.recipes.actuallyadditions.empowering`
- properties:
    - `result`
        - description: specifies the output item
        - type: `ItemStack`
        - role: output
        - required: yes
        - usage: needs to be passed as the first argument
    - `base`
        - description: specifies the input item placed on the Empowerer
        - type: `Ingredient`
        - role: input
        - required: yes
        - usage: needs to be passed as the second argument
    - `modifiers`
        - description: specifies the input items placed on the Display Stands
        - type: `Ingredient[]`
        - role: input
        - required: yes
        - limits: exactly 4
        - usage: needs to be passed as the third argument
    - `energy`
        - description: specifies the energy each Display Stand uses over the whole recipe
        - type: `int`
        - role: other
        - required: no
        - default: `1000`
        - usage: can be passed as the fourth argument or by chaining the function `.energy(int)`
    - `color`
        - description: specifies the color of the lasers and particles as an RGB number, e.g. `0xff0000` for red
        - type: `int`
        - role: other
        - required: no
        - default: `0xffffffff` (white)
        - usage: can be passed as the fifth argument or by chaining the function `.color(int)`
    - `time`
        - description: specifies the time in ticks the recipe takes
        - type: `int`
        - role: other
        - required: no
        - limits: must be greater than 0
        - default: `100`
        - usage: can be passed as the sixth argument or by chaining the function `.time(int)`

The color can also be taken from the KubeJS `Color` binding, e.g. `Color.RED.argb`. Keep in mind that those colors are the chat colors of Minecraft, so `Color.RED` is a light red (`0xff5555`).

## Examples

```js
ServerEvents.recipes(event => {
    // removes all empowerer recipes
    event.remove({ type: "actuallyadditions:empowering" })

    // adds a recipe that empowers dirt into 2 mycelium
    // uses 2 nether warts, a red mushroom, and a brown mushroom as modifiers
    // uses the default energy of 1000 CF per Display Stand
    // uses the default color of white
    // uses the default time of 100 ticks (5 seconds)
    event.recipes.actuallyadditions.empowering(Item.of("minecraft:mycelium", 2), "dirt", [
        "nether_wart",
        "minecraft:red_mushroom",
        "nether_wart",
        "minecraft:brown_mushroom",
    ])

    // adds a recipe that empowers any stone into 4 magma blocks
    // uses 4 magma creams as modifiers
    // uses 2000 CF per Display Stand
    // renders red lasers and particles
    // takes 60 ticks (3 seconds)
    event.recipes.actuallyadditions.empowering(
        "4x magma_block",
        "#c:stones",
        ["magma_cream", "magma_cream", "magma_cream", "magma_cream"],
        2000,
        0xff0000,
        60
    )

    // adds a recipe that empowers a diamond into an emerald
    // uses an emerald block, a lapis lazuli block, and 2 of any gold ingots as modifiers
    // uses 50000 CF per Display Stand
    // renders green lasers and particles
    // takes 200 ticks (10 seconds)
    // uses chaining functions for energy, color, and time
    event.recipes.actuallyadditions
        .empowering("emerald", "diamond", [
            "emerald_block",
            "lapis_block",
            "#c:ingots/gold",
            "#c:ingots/gold",
        ])
        .energy(50000)
        .color(0x00ff00)
        .time(200)
})
```
