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
    -   `altar`
        -   type: `AltarBlockEntity`
        -   description: the altar block entity that is about to start the ritual; you can also grab the position from this object
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
    -   `rawBlockPattern`
        -   type: `List<PatternEntry>` (nullable)
        -   description: the raw block pattern entries of the recipe; may be `null` if the recipe doesn't have a block pattern
    -   `rawBlockPatternExtension`
        -   type: `List<PatternEntry>` (nullable)
        -   description: the raw block pattern extension entries of the recipe; may be `null` if the recipe doesn't have a block pattern
    -   `transformedBlockPattern`
        -   type: `Map<BlockPos, List<BlockState>>` (nullable)
        -   description: the transformed (rotated depending on the altar facing) block pattern entries of the recipe; may be `null` if the recipe doesn't have a block pattern
    -   `transformedBlockPatternExtension`
        -   type: `Map<BlockPos, List<BlockState>>` (nullable)
        -   description: the transformed (rotated depending on the altar facing) block pattern extension entries of the recipe; may be `null` if the recipe doesn't have a block pattern
-   functions
    -   `cancel()`
        -   description: cancels the ritual start; this will reset the altar and drop the initiator item
    -   `queryBlockPattern(String query)`
        -   type: `Collection<BlockPos>` (nullable)
        -   description: returns the positions of the block pattern entries matching the query; may be `null` if the recipe doesn't have a block pattern
    -   `queryBlockPatternExtension(String query)`
        -   type: `Collection<BlockPos>` (nullable)
        -   description: returns the positions of the block pattern extension entries matching the query; may be `null` if the recipe doesn't have a block pattern

## Block Pattern

If you want to invoke special logic depending on the [block pattern](../recipe/block_patterns.md) defined in the recipe, you can obtain the block pattern condition instance from the `recipe` (see above) via `recipe.blockPattern()`. However, because the recipe stores the block pattern in its raw format (north orientation), you should use the helper functions from above inside the event. Make sure to check for null-values before accessing them.

```js
// ... listener and other logic
let blockPattern = event.rawBlockPattern
if (blockPattern === null) return // recipe doesn't have a block pattern

// do something with the block pattern entries
```

```js
let queriedPositions = event.queryBlockPattern("container_blocks")
if (queriedPositions === null) return // recipe doesn't have a block pattern
queriedPositions.forEach(pos => {
    // do something with the positions of entries matching the "container_blocks" query
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
