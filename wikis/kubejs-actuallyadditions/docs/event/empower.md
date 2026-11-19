# Empower Event

This event fires whenever an [Empowerer](../machine/empowerer.md) finishes a recipe and its result is placed on the Empowerer.

**It is a server event and reloadable!** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

The event allows you to run custom logic when an Empowerer recipe finishes, for example to reward the player, spawn effects, or track progress. It can't be canceled and doesn't change the result of the recipe.

- access in a server script via: `ActuallyAdditionsEvents.empower`
- properties
    - `level`
        - type: `ServerLevel`
        - description: the level the Empowerer is in
    - `pos`
        - type: `BlockPos`
        - description: the position of the Empowerer
    - `state`
        - type: `BlockState`
        - description: the block state of the Empowerer
    - `recipeId`
        - type: `ResourceLocation`
        - description: the ID of the finished recipe
    - `recipe`
        - type: `EmpowererRecipe`
        - description: the finished recipe
    - `player`
        - type: `ServerPlayer` (nullable)
        - description: the player who placed the base item on the Empowerer; this is null if the item was inserted by automation, if the player took the item back before it was inserted again, or if the player is not in the same level anymore

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `empower` event in a server script.

```js
ActuallyAdditionsEvents.empower(event => {
    // ...
})
```

After that, you can use the properties of the event to apply your logic.

## Example

```js
ActuallyAdditionsEvents.empower(event => {
    // obtaining all properties of the event by destructuring
    let { level, pos, state, recipeId, recipe, player } = event

    // spawns a lightning bolt at the position of the Empowerer
    level.spawnLightning(pos.x, pos.y, pos.z, true)

    // the player is null if the item was inserted by automation
    if (player == null) return

    player.tell(`You empowered ${recipe.getResultItem(level.registryAccess()).hoverName.string}!`)
})
```

<video controls="controls" src="/../img/empowerer-lightning.mp4" />
