# Vat Reagent Modification Event

This event allows you to add, modify, and remove Vat Reagents.

**It is a server event and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

EnderIO supports data-driven Vat Reagents by default. This event adds convenience methods to modify entries via KubeJS.
Vat Reagents are used in the Vat to add a modifier value to the processing of items. The modifier affects the output quantity of the processed item.

A [Vat recipe](../machine/vat.md) only accepts item tag as inputs. A Vat Reagent is defined by specifying an item within this input tag and assigning a modifier value to it.
You can also assign a modifier to the whole input tag. If the reagent item is not part of the input tag, the modifier will not be applied. This system is
a bit tricky to understand at first, but it allows defining different modifier values for the same item depending on the recipe input tag.

-   access in a server script via: `EnderIOEvents.vatReagents`
-   supported operations
    -   add new entries
    -   remove existing entries
    -   clear all entries

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `vatReagents` event in a server script.

```js
EnderIOEvents.vatReagents(event => {
    // ...
})
```

After that, use one of the following methods to modify the Vat Reagents.

## Adding

-   access in the event via: `event.add(...)`
-   properties:
    -   `item`
        -   description: specifies the input item or tag
        -   type: `Ingredient`
    -   `tag`
        -   description: specifies the recipe input tag
        -   type: `TagKey<Item>`
    -   `modifier`
        -   description: specifies the modifier value
        -   type: `float`
-   notes:
    -   the `item` property can take a single item or a tag (prefixed with `#`)
    -   the `tag` property is always a tag, do not prefix it with `#`
    -   if a tag has been used for `item` and you add another entry with a single item, which is part of the tag, the tag entry takes priority

```js
EnderIOEvents.vatReagents(event => {
    // assigns a modifier value of 5 to all entries of the c:rods tag
    // the second statement will be ignored because stick is part of the c:rods tag
    event.add("#c:rods", "c:rods", 5)
    event.add("stick", "c:rods", 6)

    // assigns a modifier value of 3 to an iron ingot item within the c:ingots tag
    event.add("iron_ingot", "c:ingots", 3)

    // this is also possible to cover all kinds of iron ingots
    event.add("#c:iron_ingots", "c:ingots", 3)
})
```

### Removing

-   access in the event via: `event.remove(...)`
-   properties:
    -   `item`
        -   description: specifies the item or tag to remove the modifier from
        -   type: `Ingredient`
-   notes:
    -   the `item` property can take a single item or a tag (prefixed with `#`)
    -   if a tag is used, all items, which are part of the tag, will have their modifiers removed

```js
EnderIOEvents.vatReagents(event => {
    // remove whole tag
    event.remove("#c:crops")

    // remove single item
    event.remove("torchflower")
})
```

### Clearing

-   access in the event via: `event.clear()`
-   description: removes all existing Vat Reagents

```js
EnderIOEvents.vatReagents(event => {
    event.clear()
})
```
