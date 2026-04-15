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
        -   type: `RecipeInfo`
        -   description: a container object holding information about the recipe that is about to be processed
        -   container properties:
            -   `recipeId` - the ID of the recipe that is about to be processed as `ResourceLocation`
            -   `recipe` - the `AltarRecipe` that is about to be processed
            -   `inputEntities` - an `Entity` collection holding all entities that are about to be sacrificed
            -   `blockPatternExtensionMatched` - defines if the [block pattern extension](../recipe/block_patterns.md#block-pattern-extension) matched
    -   `player`
        -   type: `ServerPlayer` (nullable)
        -   description: the player who inserted the initiator item; may be `null` if the ritual was started by automation
-   functions
    -   `cancel()`
        -   description: cancels the ritual start; this will reset the altar and drop the initiator item

## Block Pattern

If you want to invoke special logic depending on the [block pattern](../recipe/block_patterns.md) defined in the recipe, you can obtain the block pattern instance from the `recipe` (see above) via `recipe.blockPattern()`. You can also obtain the block pattern extension instance via `recipe.blockPatternExtension()`. They are optionals, so make sure to check if they are present before accessing them.

When you obtained the `BlockPatternCondition` instance, you can grab all entries via `instance.entries`. If you defined `query` strings when creating the block pattern, you can also quickly access the entries matching a specific query via `instance.queryEntries(String query)`.

If you want to see more details about the block pattern implementation, you can see it [here](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/recipe/condition/pattern/BlockPatternCondition.java).

```js
// ... listener and other logic
let patternOptional = recipe.blockPattern()
if (patternOptional.isEmpty()) return // recipe doesn't have a block pattern condition

let pattern = patternOptional.get()
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
