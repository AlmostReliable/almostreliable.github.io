# Range Extender Modification Event

This event allows you to add, modify, and remove range extenders of the Wireless Charger.

**It is a server event and reloadable!** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

A range extender is a block placed on top of the Wireless Charger to increase its charging range. EnderIO uses its Wireless Charger Antennas as range extenders. The extra range is stored in a data map, and the block also has to be in the `enderio:range_extender` block tag to be recognized.

- access in a server script via: `EnderIOEvents.rangeExtenders`
- supported operations
    - add new entries
    - remove existing entries
    - clear modifications from other sources (e.g. other mods)

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `rangeExtenders` event in a server script.

```js
EnderIOEvents.rangeExtenders(event => {
    // ...
})
```

After that, use one of the following methods to modify the range extenders.

## Adding

- access in the event via: `event.add(...)`
- properties:
    - `block`
        - description: specifies the block
        - type: `Block`
    - `range`
        - description: specifies the extra range in blocks
        - type: `int`
- notes:
    - adding an entry for a block that already has one replaces it
    - the block has to be in the `enderio:range_extender` block tag, add it via the KubeJS tags event

```js
ServerEvents.tags("block", event => {
    event.add("enderio:range_extender", "minecraft:lightning_rod")
})

EnderIOEvents.rangeExtenders(event => {
    // a Lightning Rod on top of the Wireless Charger extends its range by 8 blocks
    event.add("minecraft:lightning_rod", 8)

    // increases the range of the advanced antenna from 32 to 48
    event.add("enderio:wireless_charger_antenna_advanced", 48)
})
```

### Removing

- access in the event via: `event.remove(...)`
- properties:
    - `block`
        - description: specifies the block
        - type: `Block`
- notes:
    - removing refers to deleting the range extender data, the block still exists in the game

```js
EnderIOEvents.rangeExtenders(event => {
    event.remove("enderio:wireless_charger_antenna")
})
```

### Clearing

- access in the event via: `event.clear()`
- description: removes all modifications from other sources (e.g. other mods with datapacks), this does not clear all range extenders

```js
EnderIOEvents.rangeExtenders(event => {
    event.clear()
})
```
