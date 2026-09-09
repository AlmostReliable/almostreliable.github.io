# Schrödinger's Safe Source Modification Event

This event allows you to add and remove blocks and tags used as sources by Schrödinger's Safe.

**It is a server event and reloadable!** Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

Schrödinger's Safe uses source quality to determine how much energy capacity is reached when a block is captured inside the safe. This event provides convenience methods to modify the data-driven source quality.

- access in a server script via: `OritechEvents.schrodingersSourceModification`
- supported operations
    - add or modify a block source
    - add or modify a tag source
    - remove a block source
    - remove a tag source
    - clear modifications from other sources (e.g. other mods)

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `schrodingersSourceModification` event in a server script.

```js
OritechEvents.schrodingersSourceModification(event => {
    // ...
})
```

After that, use one of the following methods to modify Schrödinger's Safe sources.

## Adding a Block

- access in the event via: `event.add(...)`
- properties:
    - `block`
        - description: specifies the source block
        - type: `Block`
    - `quality`
        - description: specifies the source quality; higher quality reaches more energy capacity
        - type: `float`

```js
OritechEvents.schrodingersSourceModification(event => {
    // assigns a source quality of 0.3 to the glass block
    event.add("minecraft:glass", 0.3)
})
```

## Adding a Tag

- access in the event via: `event.addTag(...)`
- properties:
    - `tag`
        - description: specifies the source block tag
        - type: `TagKey<Block>`
    - `quality`
        - description: specifies the source quality; higher quality reaches more energy capacity
        - type: `float`

```js
OritechEvents.schrodingersSourceModification(event => {
    // assigns a source quality of 1.0 to all blocks in the c:glass tag
    event.addTag("c:glass", 1.0)
})
```

## Removing a Block

- access in the event via: `event.remove(...)`
- properties:
    - `block`
        - description: specifies the source block to remove
        - type: `Block`

```js
OritechEvents.schrodingersSourceModification(event => {
    // removes the source quality assigned to the glass block
    event.remove("minecraft:glass")
})
```

## Removing a Tag

- access in the event via: `event.removeTag(...)`
- properties:
    - `tag`
        - description: specifies the source block tag to remove
        - type: `TagKey<Block>`

```js
OritechEvents.schrodingersSourceModification(event => {
    // removes the source quality assigned to the c:glass tag
    event.removeTag("c:glass")
})
```

## Clearing

- access in the event via: `event.clear()`
- description: removes all modifications from other sources (e.g. other mods with datapacks), this does not clear all Schrödinger's Safe sources

```js
OritechEvents.schrodingersSourceModification(event => {
    event.clear()
})
```
