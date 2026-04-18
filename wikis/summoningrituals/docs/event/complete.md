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
        -   description: the position of the altar block that completed the ritual
    -   `altar`
        -   type: `AltarBlockEntity`
        -   description: the altar block entity that completed the ritual
    -   `altarFacing`
        -   type: `Direction`
        -   description: the direction the altar is facing
    -   `recipeInfo`
        -   type: `RecipeInfo`
        -   description: a container object holding information about the recipe that was processed
        -   container properties:
            -   `recipeId` - the ID of the recipe that was processed as `ResourceLocation`
            -   `recipe` - the `AltarRecipe` that was processed
            -   `inputEntities` - an `Entity` collection holding all entities that were sacrificed (already dead)
            -   `outputItems` - an `ItemEntity` collection holding all item outputs that were spawned
            -   `outputEntities` - an `Entity` collection holding all entity outputs that were spawned
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
