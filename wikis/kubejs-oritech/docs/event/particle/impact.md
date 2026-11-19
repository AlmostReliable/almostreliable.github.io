# Particle Impact Event

> [!INFO] NOTE
> This event is available since version 0.5.0.

This event allows you to change what happens when a particle hits a block after exiting the [Particle Accelerator](../../recipe/machine/particle_accelerator.md). By default, the particle breaks blocks that are softer than its remaining momentum and turns portals into black holes at high speed. For the exit itself, refer to the [particle exited event](exited.md).

**It is a server event and reloadable!** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

When a particle exits the Particle Accelerator, it travels a short distance in its exit direction. The faster the particle, the further it travels. This event is fired once for each block along that path, starting with the closest one. It is not fired for air or for blocks particles can pass through. Entities hit by the particle are handled separately and don't fire this event.

Each block the particle hits uses some of its momentum. The `speed` property holds the momentum that is left when the particle reaches the current block. Once it runs out, the particle stops.

The functions `absorb`, `passThrough`, `handle`, and `cancel` decide the outcome of the impact and stop the script **immediately**, so code after them in the same handler is not executed. If no handler calls one of them, the default Oritech behavior is applied to the block.

- access in a server script via: `OritechEvents.particleImpact`
- properties
    - `level`
        - type: `ServerLevel`
        - description: the level where the impact is happening
    - `pos`
        - type: `BlockPos`
        - description: the position of the accelerator controller
    - `controller`
        - type: `ParticleAcceleratorBlockEntity`
        - description: the `BlockEntity` of the accelerator controller block
    - `hitPos`
        - type: `BlockPos`
        - description: the position of the block the particle is hitting
    - `block`
        - type: `LevelBlock`
        - description: the block the particle is hitting
    - `blockState`
        - type: `BlockState`
        - description: the state of the block the particle is hitting
    - `direction`
        - type: `Vec3`
        - description: the direction in which the particle exited the accelerator
    - `reason`
        - type: `ParticleEvent`
        - description: the reason why the particle exited (either `EXITED_FAST` or `EXITED_NO_GATE`), see the [particle exited event](exited.md) for details
    - `speed`
        - type: `long`
        - description: the remaining momentum of the particle when reaching this block
    - `item`
        - type: `ItemStack`
        - description: a copy of the item the particle was made of; empty if a previous impact consumed it
- functions
    - `absorb()`
        - description: stops the particle at this block without affecting the block, the trail of the particle ends here
    - `absorb(boolean consumeItem)`
        - description: same as `absorb()`, but also consumes the particle item if `consumeItem` is `true`
    - `passThrough()`
        - description: lets the particle pass through this block without losing momentum, the block is not affected
    - `cancel()`
        - description: same as `passThrough()`
    - `handle(long usedMomentum)`
        - description: removes the given momentum from the particle without affecting the block, the particle continues to the next block if it has momentum left
    - `handle(long usedMomentum, boolean consumeItem, boolean consumeParticle)`
        - description: same as `handle(usedMomentum)`, but also consumes the particle item if `consumeItem` is `true` and stops the particle at this block if `consumeParticle` is `true`, regardless of its remaining momentum
    - `runDefaultImpact()`
        - description: applies the default Oritech behavior to this block right away and returns the momentum it used as `float`, if the handler doesn't decide the outcome afterward, that momentum is removed from the particle and the default behavior isn't applied a second time
    - `spawnEndPortal(BlockPos)`
        - description: spawns an end portal at the given position, this is usually used by a special interaction when two Ender Pearls
          collide with high speed
    - `spawnNetherPortal(BlockPos)`
        - description: spawns a nether portal at the given position, this is usually used by a special interaction when two Fire Charges
          collide with high speed

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `particleImpact` event in a server script.

```js
OritechEvents.particleImpact(event => {
    // ...
})
```

You can also pass a block ID as the first argument. The handler is then only called when the particle hits that block.

```js
OritechEvents.particleImpact("minecraft:obsidian", event => {
    // ...
})
```

Handlers with a block ID are called before handlers without one. Once a handler decides the outcome of the impact, no further handlers are called for that block.

## Example

```js
// obsidian stops particles and consumes the particle item
OritechEvents.particleImpact("minecraft:obsidian", event => {
    event.absorb(true)
})

// glass doesn't stop particles and isn't broken by them
OritechEvents.particleImpact("minecraft:glass", event => {
    event.passThrough()
})

OritechEvents.particleImpact(event => {
    // obtaining all properties of the event by destructuring
    let { level, pos, controller, hitPos, block, blockState, direction, reason, speed, item } = event

    // particles made of diamonds turn the first block they hit into a diamond block
    if (item.id === "minecraft:diamond") {
        block.set("minecraft:diamond_block")
        event.absorb(true)
    }

    // let slow particles bounce off without breaking anything
    if (speed < 20) {
        event.handle(speed)
    }

    // apply the default behavior first and report the broken block
    let usedMomentum = event.runDefaultImpact()
    if (level.getBlockState(hitPos).isAir()) {
        console.info(`Particle broke a block at ${hitPos} using ${usedMomentum} momentum`)
    }
})
```
