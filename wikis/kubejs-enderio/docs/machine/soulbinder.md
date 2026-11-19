# Soul Binding

The Soul Binder is a machine that binds the essence of living beings into items. It is used to create soul-infused materials, tools, and upgrades by combining items with captured mob souls. Each recipe may target a specific entity type, mob category, or use a predefined soul type.

## Overview

- access in recipes event via: `event.recipes.enderio.soul_binding`
- properties:
    - `output`
        - description: specifies the output item
        - type: `ItemStack`
        - role: output
        - required: yes
        - usage: needs to be passed as the first argument
    - `input`
        - description: specifies the input item
        - type: `Ingredient`
        - role: input
        - required: yes
        - usage: needs to be passed as the second argument
    - `energy`
        - description: specifies the energy usage of the recipe
        - type: `int`
        - role: other
        - required: no
        - default: `2000`
        - usage: can be passed as the third argument or by chaining the function `.energy(int)`
    - `experience`
        - description: specifies the experience levels the recipe requires
        - type: `int`
        - role: other
        - required: no
        - default: `5`
        - usage: can be passed as the fourth argument or by chaining the function `.experience(int)`
    - `entity_type`
        - description: specifies the entity type soul required for the recipe
        - type: `Identifier`
        - role: other
        - required: no
        - default: none
        - usage: can be set by chaining the function `.entityType(string)`
    - `mob_category`
        - description: specifies the mob category soul required for the recipe, more information [here](../binding/mobcategory.md)
        - type: `MobCategory`
        - role: other
        - required: no
        - default: none
        - usage: can be set by chaining the function `.mobCategory(string)`
    - `soul_data`
        - description: specifies the soul data type the soul requires an entry in, more information [here](../event/souldata.md)
        - type: `string`
        - role: other
        - required: no
        - default: none
        - usage: can be set by chaining the function `.soulData(string)`
        - possible values:
            - `spawner` - the soul can be used in the Powered Spawner
            - `engine` - the soul can be used in the Soul Engine
            - `farm` - the soul can be used in the Farming Station
            - `solar` - the soul can be used in Solar Panels
    - `copyInputComponents`
        - description: specifies whether the output item copies the data components of the input item, for example to keep the stored energy or the configuration of a machine
        - type: `boolean`
        - role: other
        - required: no
        - default: `false`
        - usage: can be enabled by chaining the function `.copyInputComponents()`
- validators:
    - `entity_type`, `mob_category`, and `soul_data` must be mutually exclusive
    - `entity_type` must be an existing entity type, entity type tags are not supported
    - `soul_data` must be one of the possible values

## Examples

```js
ServerEvents.recipes(event => {
    // removes all soul binding recipes
    event.remove({ type: "enderio:soul_binding" })

    // adds a recipe that converts an apple to a stick
    // uses default values for energy and experience
    // no entity type, mob category, or soul data
    event.recipes.enderio.soul_binding("stick", "apple")

    // adds a recipe that converts any ingot to 3 carrots
    // energy usage of 5000
    // experience of 3
    // no entity type, mob category, or soul data
    event.recipes.enderio.soul_binding("3x carrot", "#c:ingots", 5000, 3)

    // adds a recipe that converts a stick to 4 stone
    // energy usage of 5000
    // default experience
    // mob category of axolotls
    // uses the chaining function for the mob category
    event.recipes.enderio
        .soul_binding(Item.of("stone", 4), "stick", 5000)
        .mobCategory(MobCategory.AXOLOTLS)

    // adds a recipe that converts white wool to bread
    // entity type of minecraft:zombie
    // uses the chaining functions for energy, experience, and the entity type
    event.recipes.enderio
        .soul_binding("bread", "white_wool")
        .energy(3000)
        .experience(2)
        .entityType("minecraft:zombie")

    // adds a recipe that binds a soul to a Powered Spawner
    // the soul has to have an entry in the spawner soul data
    // the output keeps the components of the input like stored energy
    event.recipes.enderio
        .soul_binding("enderio:powered_spawner", "enderio:powered_spawner", 100000, 8)
        .soulData("spawner")
        .copyInputComponents()
})
```
