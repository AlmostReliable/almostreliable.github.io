# Recipe Basics

Summoning Rituals provides a single crafting recipe type that is reused across all systems: the altar recipe.

It is possible to create custom recipes via datapacks as well, but it's not recommended since you'd miss a lot of customization options. Instead, you should make use of [KubeJS](https://github.com/KubeJS-Mods/KubeJS) because the mod has native integration for it.

> [!WARNING] NOTE
> Due to the limitations, creating the recipe via datapacks is not documented on this wiki.

## Creating a Recipe

To create a new altar recipe, you need to set up a listener for the recipe event in a KubeJS server script. Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals.altar("minecraft:stick")
})
```

The `altar()` function creates a new instance of the altar recipe builder. It takes a single argument, which acts as the **initiator** of the recipe. An initiator must be inserted last into the altar to start the recipe after all other inputs have been placed. For this, you can use any kind of `Ingredient`. That means it allows a simple item or a tag.

> [!TIP] NOTE
> Specifying a count will not have any effect because an initiator can only be a single item.

After calling the function, you can chain many different functions to assign inputs, outputs, and conditions. You can read more about that in the following sections.

## Recipe Components

Each recipe uses the same set of components which define inputs, outputs, conditions, and special information like custom tooltips.

### Structure

-   `initiator`
    -   type: `Ingredient`
    -   required: yes (passed to `.altar(...)`)
    -   description: the item used to start the ritual
-   `item_inputs`
    -   type: `List<SizedIngredient>`
    -   required: no
    -   default: empty list
    -   primary access: `itemInputs(...)`
    -   aliases: `itemInput`, `inputs`, `input`
    -   description: items consumed when the ritual starts
-   `entity_inputs`
    -   type: `List<EntityInput>`
    -   required: no
    -   default: empty list
    -   primary access: `entityInputs(...)`
    -   aliases: `entityInput`, `mobInputs`, `mobInput`
    -   description: entities inside the sacrifice zone that are killed when the ritual starts
-   `fake_entity_inputs`
    -   type: `List<FakeEntityInput>`
    -   required: no
    -   default: empty list
    -   primary access: `fakeEntityInputs(...)`
    -   aliases: `fakeEntityInput`, `fakeMobInputs`, `fakeMobInput`
    -   description: entities inside the sacrifice zone matching a custom predicate that are killed when the ritual starts; instead of an entity for displaying in the recipe viewer, a custom item is used as a placeholder
-   `item_outputs`
    -   type: `List<ItemOutput>`
    -   required: no
    -   default: empty list
    -   primary access: `itemOutputs(...)`
    -   aliases: `itemOutput`, `outputs`, `output`
    -   description: items spawned around the altar when the ritual finishes
-   `entity_outputs`
    -   type: `List<EntityOutput>`
    -   required: no
    -   default: empty list
    -   primary access: `entityOutputs(...)`
    -   aliases: `entityOutput`, `mobOutputs`, `mobOutput`
    -   description: entities spawned around the altar when the ritual finishes
-   `commands`
    -   type: `CommandOutput`
    -   required: no
    -   default: empty
    -   primary access: `commands(...)`
    -   aliases: `command`
    -   description: commands executed when the ritual completes
-   `display_outputs`
    -   type: `List<ItemStack>`
    -   required: no
    -   default: empty list
    -   primary access: `displayOutputs(...)`
    -   aliases: `displayOutput`
    -   description: items used for display purposes in the recipe viewer; these items are not actually spawned when the ritual finishes
-   `zone`
    -   type: `BlockPos`
    -   required: no
    -   default: `[3, 2, 3]`
    -   primary access: `entityInputZone(...)`
    -   aliases: `mobInputZone`, `inputZone`, `sacrificeZone`, `entityZone`, `mobZone`, `zone`
    -   description: half-size region around altar used to search required entities
-   `conditions`
    -   type: `List<LootItemCondition>`
    -   required: no
    -   default: empty list
    -   primary access: `conditions(...)`
    -   description: conditions evaluated before the ritual can start
-   `ticks`
    -   type: `int`
    -   required: no
    -   default: `40`
    -   primary access: `ticks(...)`
    -   aliases: `time`, `duration`
    -   description: ritual duration in game ticks

### Inputs

Inputs can be items, entities, or both. If you want to learn more about how players interact with the altar to provide the required inputs, check out the [player usage page](../usage_for_players.md).

Item inputs support components. That means an input item could specify a required enchantment. Item input components are strictly enforced in the recipe. That means if the item does not have the specified component, the input will not be valid for the recipe.

Entity inputs support data (known as NBT). Contrary to item inputs, this data is not enforced. It is only being used for rendering purposes in the recipe viewer pages. If specific NBT should be enforced, you have to attach a custom validator to the entity input. Entity inputs are considered a sacrifice when they are within the sacrifice zone.

For more information about inputs with all available functions and examples, please read the [inputs page](inputs.md).

### Outputs

Outputs can be items, entities, commands, or all three.

Similar to inputs, outputs support components as well. Items with components and entities with NBT will be spawned with their assigned data. Additionally, item and entity outputs can have custom spawn positions altered by offset and spread values.

Furthermore, commands can be used as outputs. When the ritual finishes, the altar will invoke these commands on the server. You can specify whether a command requires player interaction. Commands with required player context won't be invoked if the ritual was performed by automation.

For more information about outputs with all available functions and examples, please read the [outputs page](outputs.md).

### Conditions

This component defines which conditions need to be fulfilled before the ritual can start. Conditions are additive meaning if multiple conditions are specified, they all have to pass.

The condition system hijacks the vanilla Minecraft loot condition system. Plenty of conditions that can be used for loot can also be used for rituals.

To learn more about available conditions and how to specify them, please read the [conditions page](conditions.md).

### Ticks

The `ticks` component defines the duration the ritual needs to be finished. When the ritual starts, all item inputs are consumed and all entity inputs are killed (they don't drop any loot). An animation will play while the ritual is active. When it's done, the altar will spawn the item and entity outputs and invoke the output commands.

Values passed to this function are specified in ticks (_1 second = 20 ticks_). Higher values mean longer duration for the ritual.

```js
.ticks(40) // 2 seconds, this is the default
.ticks(200) // 10 seconds
```

## Recipe Validation

After a recipe has been created, the mod will check its validity internally. There are multiple checks in place to ensure a recipe is valid.

1. the initiator **cannot** be empty
    - this happens if an invalid item id was specified or if the tag provided does not exist
2. the recipe **must** have at least one item or entity input
3. the amount of inputs exceeds the specified altar inventory size in the config
    - you can set the size higher in the config
    - this restriction exists to prevent the altar from being used as an infinite storage solution
4. the recipe **must** have at least one item, entity, or command output

In addition to the general validation, a recipe performs the following steps before it can start:

1. initiator item matches
2. all item inputs are present in altar inventory
3. all entity inputs are found inside the configured zone
4. all start conditions pass
5. start event is not blocked

After the duration ticks have elapsed, the ritual executes commands, and spawns outputs.
