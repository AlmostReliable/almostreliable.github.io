# Grinding Ball Modification Event

This event allows you to add, modify, and remove Grinding Balls, which can be used in the [Sag Mill](../machine/sagmill.md).

**It is a server event and reloadable!** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

> [!WARNING] NOTE
> The Grinding Ball system has been reworked by the EnderIO team in version 8.2.0. Previously, this was a startup event.

## Overview

Grinding Balls are used in the [Sag Mill](../machine/sagmill.md) to add a modifier values to the recipe process. These modifiers affect the output quantity, the chance of a byproduct, and the energy consumption of the recipe.

-   access in a server script via: `EnderIOEvents.grindingBalls`
-   supported operations
    -   add new entries
    -   remove existing entries
    -   clear all entries

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `grindingBalls` event in a server script.

```js
EnderIOEvents.grindingBalls(event => {
    // ...
})
```

After that, use one of the following methods to modify the Vat Reagents.

## Adding

-   access in the event via: `event.add(...)`
-   properties:
    -   `item`
        -   description: specifies the item or tag
        -   type: `Ingredient`
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
-   notes:
    -   the `item` property can take a single item or a tag (prefixed with `#`)
    -   if a tag has been used for `item` and you add another entry with a single item, which is part of the tag, the tag entry takes priority

```js
EnderIOEvents.grindingBalls(event => {
    // registers an iron ingot as a Grinding Ball
    // it has a 1.5x output multiplier, the default 1.0x bonus multiplier,
    // a 0.75x energy multiplier and a durability of 500
    event.add("minecraft:iron_ingot", 1.5, 1.0, 0.75, 500)

    // this is also possible to cover all kinds of ingots
    event.add("#c:ingots", 1.5, 1.0, 0.75, 500)
})
```

### Removing

-   access in the event via: `event.remove(...)`
-   properties:
    -   `item`
        -   description: specifies the item or tag
        -   type: `Ingredient`
-   notes:
    -   the `item` property can take a single item or a tag (prefixed with `#`)
    -   if a tag is used, all items, which are part of the tag, will have their data removed
    -   removing refers to deleting the Grinding Ball data, the item still exists in the game

```js
EnderIOEvents.grindingBalls(event => {
    // remove whole tag
    event.remove("#c:crops")

    // remove single item
    event.remove("enderio:energetic_alloy_grinding_ball")
})
```

### Clearing

-   access in the event via: `event.clear()`
-   description: removes all existing Grinding Balls

```js
EnderIOEvents.grindingBalls(event => {
    event.clear()
})
```
