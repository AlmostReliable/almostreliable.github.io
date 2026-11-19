# Steam Engine

The Steam Engine consumes steam to generate energy and turns the used steam back into water.

It only accepts fluids tagged with `c:steam` into its tank. By default, this tag contains `oritech:still_steam` and `oritech:flowing_steam`. A recipe for any other fluid never runs unless that fluid is added to the `c:steam` tag.

> [!WARNING] NOTE
> This recipe inherits from the Oritech base recipe. [Read about it first](../basics.md) before reading this page.

## Overview

- access in recipes event via: `event.recipes.oritech.steam_engine`
- properties:
    - fluid input
        - role: input
        - required: yes
        - limits:
            - exactly 1
            - the fluid has to be in the `c:steam` fluid tag to be accepted by the engine
        - description:
            - the amount specifies the base steam consumption per tick
            - engine consumes `amount * speed * workers * 0.05` mB per tick
            - speed depends on how full the steam tank is
            - the workers are the number of chained engines
            - higher amounts consume steam faster and generate more energy per tick
            - the engine needs at least this amount in its tank to select the recipe, afterwards it keeps running on any amount of the same fluid

## Examples

```js
ServerEvents.recipes(event => {
    // removes all steam engine recipes
    event.remove({ type: "oritech:steam_engine" })

    // adds a recipe that consumes steam twice as fast as the default recipe and generates more energy per tick
    event.recipes.oritech.steam_engine().fluidInput("64x #c:steam")
})
```

To use a custom fluid in the Steam Engine, add it to the `c:steam` fluid tag. This is a separate server event. Once the fluid is tagged, the default recipe already accepts it. A dedicated recipe is only needed if the fluid should be consumed at a different rate.

```js
ServerEvents.tags("fluid", event => {
    // allows the Steam Engine to accept the custom fluid
    event.add("c:steam", "kubejs:superheated_steam")
})

ServerEvents.recipes(event => {
    // removes the default steam engine recipe so it doesn't compete with the custom one
    event.remove({ id: "oritech:steamgen/steameng" })

    // adds a recipe that consumes the custom fluid four times as fast as the default recipe
    event.recipes.oritech.steam_engine().fluidInput("128x kubejs:superheated_steam")

    // adds a recipe that keeps the default consumption for the regular steam fluids
    event.recipes.oritech.steam_engine().fluidInput("32x oritech:still_steam")
})
```
