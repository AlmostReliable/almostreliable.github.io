# Industrial Chiller

The Industrial Chiller is used cool down fluids to convert them into items.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

- access in recipes event via: `event.recipes.oritech.industrial_chiller`
- properties:
    - item outputs
        - role: output
        - required: yes
        - limits: exactly 1
    - fluid input
        - role: input
        - required: yes
        - limits: exactly 1
    - time
        - role: misc
        - required: no
        - default: `60`

## Examples

```js
ServerEvents.recipes(event => {
    // removes all industrial chiller recipes
    event.remove({ type: "oritech:industrial_chiller" })

    // adds a recipe that converts 1000 mB of water into an iron ingot
    // requires 60 ticks by default
    event.recipes.oritech.industrial_chiller().fluidInput("water").itemOutputs("iron_ingot")

    // adds a recipe that converts 1500 mB of any water into a potato
    // requires 60 ticks by default
    event.recipes.oritech.industrial_chiller().fluidInput("1500x #c:water").itemOutputs("minecraft:potato")

    // adds a recipe that converts 2000 mB of lava into 3 cobblestone
    // requires 40 ticks / 2 seconds
    // could use .timeInSeconds(2) alternatively
    event.recipes.oritech
        .industrial_chiller()
        .fluidInput("2000x minecraft:lava")
        .itemOutputs("3x cobblestone")
        .time(40)
})
```
