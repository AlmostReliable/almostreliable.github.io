# Mob Spawn Mode

The `MobSpawnMode` is a utility binding that allows you to define how the Powered Spawner spawns a mob.

> [!WARNING] NOTE
> This binding only exists since mod version 1.21.1-0.14.0.

## Overview

- access via: `MobSpawnMode`
- values:
    - `MobSpawnMode.NEW`
        - spawns a new instance of the mob
    - `MobSpawnMode.COPY`
        - spawns an exact copy of the soul bound to the spawner, including its data

## Examples

This binding is intended to be used inside the [Soul Data Modification Event](../event/souldata.md). Pass it to the `spawnMode` parameter of a Powered Spawner entry. It's also possible to use the strings `"entity_type"` (for `NEW`) and `"copy"` instead of the binding.

```js
EnderIOEvents.soulData(event => {
    event.spawner("minecraft:zombie", 5000, MobSpawnMode.COPY) // [!code focus]
})
```
