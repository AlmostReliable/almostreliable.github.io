# Summoning Complete Event

This event allows you to invoke logic when a ritual is completed.

**It is a server event and reloadable.** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

The event is fired after a ritual has successfully been performed. This means the altar no longer contains the initiator item, the item inputs, and all entity inputs are sacrificed.

At this point, the altar has already invoked the output commands and spawned the item and entity outputs. You can access the spawned outputs within the event.

-   access in a server script via: `SummoningRituals.complete`
-   properties
    -   `level`
        -   type: `ServerLevel`
        -   description: the level where the ritual completed
    -   `pos`
        -   type: `BlockPos`
        -   description: the position of the altar block
    -   `recipeInfo`
        -   type: `RecipeInfoContainer`
        -   description: a container object holding information about the recipe that was processed
        -   container properties:
            -   `recipeId` - the ID of the recipe that was processed as `ResourceLocation`
            -   `recipe` - the `AltarRecipe` that was processed
            -   `inputEntities` - an `Entity` collection holding all entities that were sacrificed (already dead)
            -   `outputItems` - an `ItemEntity` collection holding all item outputs that were spawned
            -   `outputEntities` - an `Entity` collection holding all entity outputs that were spawned
            -   `blockPatternCondition` - the [block pattern condition](../recipe/conditions.md#block-pattern) if you defined one in the recipe, otherwise `null`
    -   `player`
        -   type: `ServerPlayer` (nullable)
        -   description: the player who inserted the initiator item; may be `null` if the ritual was started by automation

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `complete` event in a server script.

```js
SummoningRituals.complete(event => {
    // ...
})
```

After that, you can access the event properties and functions to implement your desired logic.

## Example

```js
SummoningRituals.complete(event => {
    const { level, pos, recipeInfo, player } = event

    // check for a specific recipe
    if (recipeInfo.recipeId.toString() !== "kubejs:forbidden_ritual") {
        return
    }

    // if an item output is a sword, enchant it with sharpness 3
    for (let itemEntity of recipeInfo.outputItems) {
        if (itemEntity.item.id.contains("sword")) {
            itemEntity.item.enchant("minecraft:sharpness", 3)
        }
    }
})
```
