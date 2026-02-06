# Particle Exited Event

This event allows you to invoke logic when a particle exits the [Particle Accelerator](../../recipe/machine/particle_accelerator.md).
Exiting refers to uncontrolled particle movement leaving the accelerator. For successful particle exits, refer to the
[particle collided event](collided.md).

> [!WARNING] NOTE
> This event only exists since mod version 1.21.1-0.3.0, release date: 2026-02-06.

**It is a server event and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

This event is fired when an a particle leaves the Particle Accelerator without colliding with another particle. This can happen if
the particle becomes too fast and can't be contained by the accelerator, for example.

-   access in a server script via: `OritechEvents.particleExited`
-   properties
    -   `level`
        -   type: `ServerLevel`
        -   description: the level where the particle exited
    -   `pos`
        -   type: `BlockPos`
        -   description: the position of the accelerator controller
    -   `controller`
        -   type: `AcceleratorControllerBlockEntity`
        -   description: the `BlockEntity` of the accelerator controller block
    -   `gatePos`
        -   type: `BlockPos`
        -   description: the position of the last gate the particle passed through before exiting
    -   `fromVec`
        -   type: `Vec3`
        -   description: the vector from which the particle came from
    -   `toVec`
        -   type: `Vec3`
        -   description: the vector to which the particle is heading
    -   `directionVec`
        -   type: `Vec3`
        -   description: the normalized vector that represents the direction of the particle movement
    -   `reason`
        -   type: `ParticleEvent`
        -   description: the reason why the particle exited
        -   possible values:
            -   `IDLE` - nothing was insert yet; should not be possible in a valid scenario
            -   `ERROR` - no ring was found; should not be possible in a valid scenario
            -   `ACCELERATING` - particle is in collider; should not be possible in a valid scenario
            -   `COLLIDED` - particle collided with another particle; should not be possible in a valid scenario
            -   `EXITED_FAST` - particle was too fast to take curve
            -   `EXITED_NO_GATE` - no gate found in range; particle was to slow to bridge the gap between gates

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `particleExited` event in a server script.

```js
OritechEvents.particleExited(event => {
    // ...
})
```

After that, you can apply logic when the particle exits the accelerator.

## Example

```js
OritechEvents.particleExited(event => {
    // obtaining all properties of the event by destructuring
    let { level, pos, controller, gatePos, fromVec, toVec, directionVec, reason } = event

    // make it rain if a particle exited because it was too fast
    // the reason can be checked against a simple string, case insensitive
    if (reason === "exited_fast") {
        level.levelData.setRaining(true)
    }
})
```
