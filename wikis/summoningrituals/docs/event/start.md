# Summoning Start Event

This event allows you to invoke logic when a ritual is started and to optionally cancel the ritual start.

**It is a server event and reloadable.** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

The event is fired after a valid recipe is found but before the ritual is started. This means the altar contains all required item inputs, all required entity inputs are within the sacrifice zone around the altar, and all conditions match.

At this point, the altar block also contains the initiator item and is about to start the ritual.

-   access in a server script via: `SummoningRituals.start`
-   properties
    -   `level`
        -   type: `ServerLevel`
        -   description: the level where the ritual is about to happen
    -   `pos`
        -   type: `BlockPos`
        -   description: the position of the altar block
    -   `recipeInfo`
        -   type: `RecipeInfoContainer`
        -   description: a container object holding information about the recipe that is about to be processed
        -   container properties:
            -   `recipeId` - the ID of the recipe that is about to be processed as `ResourceLocation`
            -   `recipe` - the `AltarRecipe` that is about to be processed
            -   `inputEntities` - an `Entity` collection holding all entities that are about to be sacrificed
            -   `blockPatternCondition` - the [block pattern condition](../recipe/conditions.md#block-pattern) if you defined one in the recipe, otherwise `null`
    -   `player`
        -   type: `ServerPlayer` (nullable)
        -   description: the player who inserted the initiator item; may be `null` if the ritual was started by automation
-   functions
    -   `cancel()`
        -   description: cancels the ritual start; this will reset the altar and drop the initiator item

## Block Pattern

If you want to invoke special logic depending on the [block pattern](../recipe/conditions.md#block-pattern) defined in the recipe, you can obtain the condition instance from the `recipeInfo` (see above). If you defined `queryId`s for the pattern entries, there is also a `queryEntries(String query)` function available on the condition instance that returns a list of all entries matching the provided `queryId`.

```js
// ... listener and other logic
let pattern = event.recipeInfo.blockPatternCondition
if (!pattern) return // recipe doesn't have a block pattern condition

pattern.queryEntries("container_blocks").forEach(entry => {
    // do something with the entries matching the "container_blocks" query
})
```

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `start` event in a server script.

```js
SummoningRituals.start(event => {
    // ...
})
```

After that, you can access the event properties and functions to implement your desired logic.

## Example

```js
SummoningRituals.start(event => {
    const { level, pos, recipeInfo, player } = event

    // check for a specific recipe
    if (recipeInfo.recipeId.toString() !== "kubejs:forbidden_ritual") {
        return
    }

    // cancel the ritual if one of the entity inputs has less than their max health
    for (let entity of recipeInfo.inputEntities) {
        if (player) {
            player.tell("Ritual cancelled: Entity health too low")
        }
        event.cancel()
    }
})
```
