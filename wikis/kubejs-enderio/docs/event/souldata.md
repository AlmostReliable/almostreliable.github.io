# Soul Data Modification Event

This event allows you to add, modify, and remove soul data. Soul data defines which mob souls can be used in a machine and how the machine behaves with them.

**It is a server event and reloadable!** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

EnderIO loads soul data from datapacks (`data/<namespace>/eio_soul/<type>/*.json`). There is one soul data type per machine:

| Type      | Machine         | Defines                                      |
| --------- | --------------- | -------------------------------------------- |
| `spawner` | Powered Spawner | energy cost and spawn mode per mob           |
| `engine`  | Soul Engine     | fuel fluid, energy, and burn time per mob    |
| `farm`    | Farming Station | bonemeal and harvest modifiers per mob       |
| `solar`   | Solar Panel     | time of day and dimension the panel works in |

A machine only accepts souls of mobs that have an entry for its type. Removing an entry stops the machine from accepting that mob's soul. The [Soul Binder](../machine/soulbinder.md) uses the same types in its `soulData` recipe property.

Each entry belongs to exactly one mob. Adding an entry for a mob that already has one replaces it. All changes are applied after the datapacks are loaded, so they always take priority over files from EnderIO, other mods, or datapacks.

- access in a server script via: `EnderIOEvents.soulData`
- supported operations
    - add or replace entries per type
    - remove single entries
    - remove all entries of a type

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `soulData` event in a server script.

```js
EnderIOEvents.soulData(event => {
    // ...
})
```

After that, use one of the following methods to modify the soul data.

## Powered Spawner

- access in the event via: `event.spawner(...)`
- properties:
    - `entity`
        - description: specifies the mob
        - type: `Identifier`
    - `power`
        - description: specifies the energy cost of one spawn cycle
        - type: `int`
    - `spawnMode`
        - description: specifies how the mob is spawned, more information [here](../binding/mobspawnmode.md)
        - type: `MobSpawnMode`
        - required: no
        - default: `MobSpawnMode.NEW`

```js
EnderIOEvents.soulData(event => {
    // allows the Wither Skeleton in the Powered Spawner with an energy cost of 50000
    event.spawner("minecraft:wither_skeleton", 50000)

    // makes Zombies cheaper and spawns exact copies of the bound soul
    event.spawner("minecraft:zombie", 5000, MobSpawnMode.COPY)
})
```

## Soul Engine

- access in the event via: `event.engine(...)`
- properties:
    - `entity`
        - description: specifies the mob
        - type: `Identifier`
    - `fluid`
        - description: specifies the fluid the engine burns
        - type: `string`
        - usage: a fluid id or a fluid tag prefixed with `#`
    - `powerPerMb`
        - description: specifies the energy generated per millibucket
        - type: `int`
    - `ticksPerMb`
        - description: specifies how many ticks one millibucket lasts
        - type: `int`

```js
EnderIOEvents.soulData(event => {
    // allows Cow souls in the Soul Engine, burning any milk
    event.engine("minecraft:cow", "#c:milk", 200, 10)

    // allows Ghast souls in the Soul Engine, burning lava
    event.engine("minecraft:ghast", "minecraft:lava", 1200, 20)
})
```

## Farming Station

- access in the event via: `event.farm(...)`
- properties:
    - `entity`
        - description: specifies the mob
        - type: `Identifier`
    - `bonemeal`
        - description: specifies the chance that using bonemeal consumes it, from `0` to `1`
        - type: `float`
        - usage: `1` always consumes the bonemeal like without a soul
    - `seeds`
        - description: specifies the extra Fortune levels when harvesting crops
        - type: `int`
        - usage: `0` adds no Fortune
    - `power`
        - description: specifies an energy modifier
        - type: `float`
        - usage: EnderIO 8.2 stores this value but does not use it yet, `1` is the neutral value

```js
EnderIOEvents.soulData(event => {
    // allows Chicken souls in the Farming Station
    // bonemeal is only consumed half of the time and crops are harvested with Fortune II
    event.farm("minecraft:chicken", 0.5, 2, 1)
})
```

## Solar Panel

- access in the event via: `event.solar(...)`
- properties:
    - `entity`
        - description: specifies the mob
        - type: `Identifier`
    - `daytime`
        - description: specifies whether the panel generates energy during the day
        - type: `boolean`
    - `nighttime`
        - description: specifies whether the panel generates energy during the night
        - type: `boolean`
    - `dimension`
        - description: specifies a dimension without skylight, like the Nether, where the panel works anyway
        - type: `Identifier`
        - required: no
        - default: none, the panel only works in dimensions with skylight
- notes:
    - if both `daytime` and `nighttime` are `true`, the panel always generates its maximum energy, even without sky access and in every dimension

```js
EnderIOEvents.soulData(event => {
    // allows Bat souls in Solar Panels, generating energy only during the night
    event.solar("minecraft:bat", false, true)

    // allows Blaze souls in Solar Panels, generating energy during the day and in the Nether
    event.solar("minecraft:blaze", true, false, "minecraft:the_nether")
})
```

## Removing

- access in the event via: `event.remove(...)`
- properties:
    - `type`
        - description: specifies the soul data type
        - type: `string`
        - possible values: `spawner`, `engine`, `farm`, `solar`
    - `entity`
        - description: specifies the mob
        - type: `Identifier`
- notes:
    - removing an entry stops new souls of the mob from being bound, machines and items that already hold the soul keep it
    - a Powered Spawner that already holds the soul keeps spawning the mob with the default energy cost from the EnderIO config, add the mob to the `enderio:spawner_blacklist` entity type tag to stop that

```js
EnderIOEvents.soulData(event => {
    // disallows Allay souls in the Powered Spawner
    event.remove("spawner", "minecraft:allay")

    // disallows Phantom souls in Solar Panels
    event.remove("solar", "minecraft:phantom")
})
```

## Removing All

- access in the event via: `event.removeAll(...)`
- properties:
    - `type`
        - description: specifies the soul data type
        - type: `string`
        - possible values: `spawner`, `engine`, `farm`, `solar`
- notes:
    - this removes all entries of the type, including the ones from EnderIO
    - entries you add in the same event after this call are kept

```js
EnderIOEvents.soulData(event => {
    // only allows Zombies and Skeletons in the Powered Spawner
    event.removeAll("spawner")
    event.spawner("minecraft:zombie", 10000)
    event.spawner("minecraft:skeleton", 10000)
})
```
