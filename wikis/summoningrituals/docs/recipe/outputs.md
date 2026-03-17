# Altar Recipe Outputs

Altar recipe outputs can be item, entity, or command inputs. A recipe requires at least one item, entity, _or_ command output in order to be valid.

> [!WARNING] NOTE
> This page assumes that you know how to get an instance of the altar recipe builder. If you do not know how to do that or you didn't read about the general recipe structure yet, please read the [recipe basics page](basics.md).

## Item Outputs

-   type: `List<ItemOutput>`
-   required: no
-   default: empty list
-   primary access: `itemOutputs(...)`
-   aliases: `itemOutput`, `outputs`, `output`

### Syntax

The required type `ItemOutput` is a custom type by Summoning Rituals. This type, next to the `ItemStack`, stores optional offset and spread values that define where to spawn the item output.

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

Because entities are not wrapped by KubeJS by default, Summoning Rituals offers custom wrappers to provide an easy syntax. Additionally, because entity outputs support additional properties, the mod offers a builder binding to pass additional data.

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

TODO
