# Grinding Ball Modification Event

This event allows you to add Grinding Balls, which can be used in the [Sag Mill](../machine/sagmill.md).

**It is a startup event and not reloadable!**
Keep in mind that startup events have to be located inside the `kubejs/startup_scripts` folder.

> [!WARNING] NOTE
> The Grinding Ball system is currently being reworked by the EnderIO team. This event may change in future versions and become fully reloadable.

## Overview

Grinding Balls are used in the [Sag Mill](../machine/sagmill.md) to add a modifier values to the recipe process. These modifiers affect the output quantity,
the chance of a byproduct, and the energy consumption of the recipe.

-   access in a server script via: `EnderIOEvents.grindingBalls`
-   supported operations
    -   add new entries

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `grindingBalls` event in a startup script.

```js
EnderIOEvents.grindingBalls(event => {
    // ...
})
```

## Adding

-   access in the event via: `event.add(...)`
-   properties:
    -   `item`
        -   description: specifies the item
        -   type: `Item`
    -   `outputMultiplier`
        -   description: specifies the output multiplier value
        -   type: `float`
    -   `bonusMultiplier`
        -   description: specifies the bonus multiplier value
        -   type: `float`
    -   `energyMultiplier`
        -   description: specifies the energy multiplier value
        -   type: `float`
        -   usage: values less than 1.0 reduce energy consumption, values greater than 1.0 increase it
    -   `durability`
        -   description: specifies the durability of the Grinding Ball item
        -   type: `int`

```js
EnderIOEvents.grindingBalls(event => {
    // registers an iron ingot as a Grinding Ball
    // it has a 1.5x output multiplier, the default 1.0x bonus multiplier,
    // a 0.75x energy multiplier and a durability of 500
    event.add("minecraft:iron_ingot", 1.5, 1.0, 0.75, 500)
})
```
