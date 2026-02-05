# Particle Accelerator

Internally, this recipe is called Particle Collision.

The Particle Accelerator is a machine that can drastically speed up matter to collide with each other in order to produce new items.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

-   access in recipes event via: `event.recipes.oritech.particle_collision`
-   properties:
    -   item inputs
        -   role: input
        -   required: yes
        -   limits: exactly 2
    -   item outputs
        -   role: output
        -   required: yes
        -   limits: exactly 1
    -   time
        -   role: misc
        -   required: no
        -   default: `60`
        -   description: specifies the required energy in Joules for the collision; higher values require higher speed

## Examples

```js
ServerEvents.recipes(event => {
    // removes all particle accelerator / particle collision recipes
    event.remove({ type: "oritech:particle_collision" })

    // adds a recipe that converts a gold ingot into an iron ingot
    // requires 60 Joules by default
    event.recipes.oritech.particle_collision().itemInputs("gold_ingot").itemOutputs("iron_ingot")

    // adds a recipe that converts any ingot and an apple into 4 cobblestone
    // requires 60 Joules by default
    event.recipes.oritech
        .particle_collision()
        .itemInputs(["#c:ingots", "minecraft:apple"])
        .itemOutputs("4x cobblestone")

    // adds a recipe that converts a glass block and a diamond into 2 sand
    // requires 40 Joules
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .particle_collision()
        .itemInputs(["glass", "diamond"])
        .itemOutputs("2x sand")
        .time(40)
})
```
