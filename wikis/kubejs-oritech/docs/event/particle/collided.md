# Particle Collided Event

This event allows you to invoke logic when a particle collides in the
[Particle Accelerator](../../recipe/machine/particle_accelerator.md). Colliding refers to controlled particle movement that results in a successful collision. For particles that exit the accelerator without colliding, refer to the
[particle exited event](exited.md).

> [!WARNING] NOTE
> This event only exists since mod version 1.21.1-0.3.0, release date: 2026-02-06.

**It is a server event and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

This event is fired when a particle collision happens in the Particle Accelerator, but before checking if the collision matches a
valid recipe. By cancelling the event, the collision will still happen, but not result in any item output, which is the samee thing
that happens when no valid recipe is found.

-   access in a server script via: `OritechEvents.particleCollided`
-   properties
    -   `level`
        -   type: `ServerLevel`
        -   description: the level where the particle collision is happening
    -   `pos`
        -   type: `BlockPos`
        -   description: the position of the accelerator controller
    -   `controller`
        -   type: `AcceleratorControllerBlockEntity`
        -   description: the `BlockEntity` of the accelerator controller block
    -   `collisionPos`
        -   type: `BlockPos`
        -   description: the position in the world where the particle collision is happening
    -   `itemA`
        -   type: `ItemStack`
        -   description: the first item that is being collided
    -   `itemB`
        -   type: `ItemStack`
        -   description: the second item that is being collided
    -   `speed`
        -   type: `float`
        -   description: the speed of the particle collision (added speeds of both particles)
    -   `recipeId`
        -   type: `ResourceLocation` (nullable)
        -   description: the recipe id of the matched recipe; null if no valid recipe was found for this collision
    -   `recipe`
        -   type: `OritechRecipe` (nullable)
        -   description: the matched recipe; null if no valid recipe was found for this collision
-   functions
    -   `cancel()`
        -   description: cancels the particle collision; collision still happens but no item output will be produced, even if a recipe matches
    -   `spawnEndPortal(BlockPos)`
        -   description: spawns an end portal at the given position; this is usually used by a special interaction when two Ender Pearls
            collide with high speed
    -   `spawnNetherPortal(BlockPos)`
        -   description: spawns a nether portal at the given position; this is usually used by a special interaction when two Fire Charges
            collide with high speed

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `particleCollided` event in a server script.

```js
OritechEvents.particleCollided(event => {
    // ...
})
```

After that, you can apply logic to modify the particle collision behavior.

## Example

```js
OritechEvents.particleCollided(event => {
    // obtaining all properties of the event by destructuring
    let { level, pos, controller, collisionPos, itemA, itemB, speed, recipeId, recipe } = event

    // if the recipe id is null, there was no recipe meaning unmatched items have collided
    if (recipeId == null) return

    // disable particle collision for a specific recipe
    if (recipeId === "mymodpack:particle_accelerator/recipe1") {
        event.cancel()
    }
})
```
