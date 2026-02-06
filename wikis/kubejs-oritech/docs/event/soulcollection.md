# Soul Collection Event

This event allows you to cancel soul collection or modify the soul collection amount.

**It is a server event and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

Oritech has a mechanic that allows collecting souls from parting mobs. The collected souls can be used in various ways, such as
enchanting or spawning certain mobs. By default, the soul collection is always 1, whenever a mob dies nearby. This event allows you to
cancel the soul collection completely or modify the the amount of souls collected per mob death.

-   access in a server script via: `OritechEvents.soulCollection`
-   properties
    -   `level`
        -   type: `ServerLevel`
        -   description: the level where the soul collection is happening
    -   `pos`
        -   type: `Vec3` (precise floating point position as a vector)
        -   description: the position the mob died at, the soul collection is happening at this position
    -   `soulCollector`
        -   type: `? extends BaseSoulCollectionEntity`
        -   description: the `BlockEntity` of the soul collection block; this object is responsible for collecting and storing the soul
    -   `entity`
        -   type: `? extends LivingEntity` (nullable)
        -   description: the mob that died and is the source of the soul collection; this can be null if the soul collection was initiated by a Soul Flower
-   functions
    -   `cancel()`
        -   description: cancels the soul collection, no souls will be collected for this mob death
    -   `setSoulValue(Integer)`
        -   description: sets the amount of souls collected for this mob death; the default value is 1

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `soulCollection` event in a server script.

```js
EnderIOEvents.soulCollection(event => {
    // ...
})
```

After that, you can apply logic to modify the soul collection amount or cancel it.

## Example

```js
OritechEvents.soulCollection(event => {
    // obtaining all properties of the event by destructuring
    let { level, pos, soulCollector, entity } = event

    // this happens when it's a soul flower
    // let the soul flower always pass -> 1 soul will be collected
    if (entity == null) return

    // grab the max health of the entity that died
    let maxHealth = entity.maxHealth

    // pigs, cows, sheep have 10 max health, chicken has 4
    if (maxHealth > 9) {
        // give two souls for entities with more than 9 max health
        event.setSoulValue(2)
    } else if (maxHealth < 5) {
        // enable rain and don't give any souls for entities with less than 5 max health
        level.levelData.setRaining(true)
        event.cancel()
    }
})
```
