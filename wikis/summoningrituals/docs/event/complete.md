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
