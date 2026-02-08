# Particle Injected Event

This event allows you to invoke logic when a particle is injected into the
[Particle Accelerator](../../recipe/machine/particle_accelerator.md). It can also be used to cancel the injection completely.

> [!WARNING] NOTE
> This event only exists since mod version 1.21.1-0.3.0, release date: 2026-02-06.

**It is a server event and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

This event is fired when an item is inserted into a Particle Accelerator Controller and the controller tries to push the item into the
accelerator in the world. By cancelling the event, the item will not be injected into the accelerator and never leave the input slot.

Additionally, you can disable special interactions such as the creation of an End or a Nether portal by particle collision. This is
useful if you want to avoid that players access these dimensions or if you want to make your own recipes with the same items that are
normally reserved for portal creation.

-   access in a server script via: `OritechEvents.particleInjected`
-   properties
    -   `level`
        -   type: `ServerLevel`
        -   description: the level where the particle injection is happening
    -   `pos`
        -   type: `BlockPos`
        -   description: the position of the accelerator controller
    -   `controller`
        -   type: `AcceleratorControllerBlockEntity`
        -   description: the `BlockEntity` of the accelerator controller block
    -   `startPos`
        -   type: `BlockPos`
        -   description: the position at which the particle is being injected
    -   `gatePos`
        -   type: `BlockPos`
        -   description: the position of the first gate the particle is heading towards after successful injection
    -   `particle`
        -   type: `Particle`
        -   description: the particle that is being injected
    -   `item`
        -   type: `ItemStack`
        -   description: the item that is being injected as a particle
-   functions
    -   `cancel()`
        -   description: cancels the particle injection
    -   `disableNetherPortal()`
        -   description: disables the special interaction that creates a nether portal
    -   `disableEndPortal()`
        -   description: disables the special interaction that creates an end portal
    -   `spawnEndPortal(BlockPos)`
        -   description: spawns an end portal at the given position; this is usually used by a special interaction when two Ender Pearls
            collide with high speed
    -   `spawnNetherPortal(BlockPos)`
        -   description: spawns a nether portal at the given position; this is usually used by a special interaction when two Fire Charges
            collide with high speed

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `particleInjected` event in a server script.

```js
OritechEvents.particleInjected(event => {
    // ...
})
```

After that, you can apply logic to modify the particle injection behavior.

## Example

```js
OritechEvents.particleInjected(event => {
    // disable the special interactions that create portals
    event.disableNetherPortal()
    event.disableEndPortal()

    // obtaining all properties of the event by destructuring
    let { level, pos, controller, startPos, gatePos, particle, item } = event

    // disable particle injection during the day
    let dayTime = level.levelData.dayTime
    if (dayTime >= 0 && dayTime <= 12000) {
        event.cancel()
    }
})
```
