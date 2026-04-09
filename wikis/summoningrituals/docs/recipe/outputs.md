# Altar Recipe Outputs

Altar recipe outputs can be item, entity, or command outputs. A recipe requires at least one item, entity, _or_ command output to be valid.

> [!WARNING] NOTE
> This page assumes that you know how to get an instance of the altar recipe builder. If you do not know how to do that, or if you have not read about the general recipe structure yet, please read the [recipe basics page](basics.md).

## Item Outputs

-   type: `List<ItemOutput>`
-   required: no
-   default: empty list
-   primary access: `itemOutputs(...)`
-   aliases: `itemOutput`, `outputs`, `output`

### Syntax

The required type `ItemOutput` is a custom type provided by Summoning Rituals. In addition to the `ItemStack`, this type stores optional offset and spread values that define where the item output spawns.

This custom type supports all KubeJS `ItemStack` wrappers. You can use multiple different syntaxes to pass an instance of it to the recipe builder. If you want to specify multiple entries, you have to wrap them in an array via `[]`.

```js
.itemOutputs([
  'minecraft:diamond',
  'apple',
  '3x minecraft:iron_ingot',
  Item.of('carrot', 5),
  SummoningItem.of("3x diamond"),
  SummoningItem.of("potato", 3)
])
```

### Data

If you want to pass data to item outputs, you need to define them as components. Components are a vanilla system and are wrapped by KubeJS. Components include values like which enchantments an item has, if it's a specific tool type, and more.

```js
.itemOutputs('minecraft:iron_sword[enchantments={levels:{"minecraft:sharpness":2}}]')
```

### Builder

To pass additional data to an item output such as offset and spread values, you can use the item output builder exposed via the [`SummoningItem` binding](../binding/item.md).

## Entity Outputs

-   type: `List<EntityOutput>`
-   required: no
-   default: empty list
-   primary access: `entityOutputs(...)`
-   aliases: `entityOutput`, `mobOutputs`, `mobOutput`

### Syntax

Because entities are not wrapped by KubeJS by default, Summoning Rituals offers custom wrappers to provide an easy syntax. Additionally, because entity outputs support extra properties, the mod offers a builder binding for passing additional data.

```js
.entityOutputs([
    "minecraft:elder_guardian",
    "phantom",
    "3x silverfish",
    "3x minecraft:cow",
    "minecraft:wither",
    SummoningEntity.output("cat", 3),
])
```

### Builder

To pass additional data to an entity output such as NBT, a custom tooltip, or offset and spread values, you can use the entity output builder exposed via the [`SummoningEntity` binding](../binding/entity.md).

## Command Outputs

-   type: `CommandOutput`
-   required: no
-   default: empty
-   primary access: `commands(...)`
-   aliases: `command`

### Syntax

Summoning Rituals offers a few ways to pass command outputs to the recipe builder. Even if multiple commands are provided, they are grouped into a single `CommandOutput` instance. In addition to the commands, this object also supports a custom tooltip that can be displayed in recipe viewers instead of the raw commands, and a toggle for whether the command requires player context.

Functions:

-   `commands(CommandOutput command)`
-   `commands(List<String> commands, List<Component> tooltip)`
-   `commands(List<String> commands, List<Component> tooltip, Boolean requiresPlayer)`

When no custom tooltip is provided, recipe viewers show the output commands in their raw form. If a tooltip is provided, it is shown _instead_ of the commands. That means if you want to show the actual command, you have to add it to the tooltip yourself. Commands you pass to the function do not have to start with a slash, but you can include one for better clarity if you prefer.

The `requiresPlayer` boolean defaults to true. If a command output requires player context, the output command is not invoked if the ritual is started without a player, for example, by automation. Entity descriptors like `@s` always reference the player starting the ritual.

### Examples

```js
// say Hi and Hello in the chat
// the leading slash is optional
.commands(["say Hi", "/say Hello"])

// give the invoking player experience
// use a custom tooltip for recipe viewers
.command(["experience add @s 1"], ["Give 1 experience to the player"])

// kill the invoking player
// the @s is optional because kill has an implicit entity target
.command("kill @s");
```

## Display Outputs

Display outputs are not actual recipe outputs. They can be used to display an item output in the recipe viewer that won't be spawned automatically when the ritual is performed. This is useful if you want to handle the spawning of outputs in the [`complete` event](../event/complete.md) handler, for example. Adding a display output will also satisfy the recipe serializer requirement for at least one output, so you can have recipes that only spawn outputs via the `complete` event.

-   type: `List<ItemStack>`
-   required: no
-   default: empty list
-   primary access: `displayOutputs(...)`
-   aliases: `displayOutput`

### Syntax

You can pass any type of the KubeJS `ItemStack` wrapper. If you want to specify multiple entries, you have to wrap them in an array via `[]`.

```js
.displayOutputs([
  'minecraft:diamond',
  'apple',
  '3x minecraft:iron_ingot',
  Item.of('carrot', 5),
  SummoningItem.of("3x diamond"),
  SummoningItem.of("potato", 3)
])
```

### Data

If you want to pass data to display outputs, you need to define them as components. Components are a vanilla system and are wrapped by KubeJS. Components include values like which enchantments an item has, if it's a specific tool type, and more.

```js
.displayOutputs('minecraft:iron_sword[enchantments={levels:{"minecraft:sharpness":2}}]')
```
