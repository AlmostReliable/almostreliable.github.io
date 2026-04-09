# Altar Recipe Inputs

Altar recipe inputs can be item or entity inputs. A recipe requires at least one item _or_ entity input in order to be valid.

> [!WARNING] NOTE
> This page assumes that you know how to get an instance of the altar recipe builder. If you do not know how to do that or you didn't read about the general recipe structure yet, please read the [recipe basics page](basics.md).

## Item Inputs

-   type: `List<SizedIngredient>`
-   required: no
-   default: empty list
-   primary access: `itemInputs(...)`
-   aliases: `itemInput`, `inputs`, `input`

### Syntax

The required type `SizedIngredient` is wrapped by KubeJS. You can use multiple different syntaxes to pass an instance of it to the recipe builder. Because it is an `Ingredient` that simply supports counts, you can also use tags. If you want to specify multiple entries, you have to wrap them in an array via `[]`.

```js
.itemInputs([
  'minecraft:diamond',
  'apple',
  '#c:ingots/gold',
  '3x minecraft:iron_ingot',
  '5x #c:glass',
  Item.of('carrot', 5),
  Ingredient.of('#c:ingots', 3)
])
```

### Data

If you want to pass data to item inputs, you need to define them as components. Components are a vanilla system and are wrapped by KubeJS. Components include values like which enchantments an item has, if it's a specific tool type, and more.

```js
.itemInputs('minecraft:iron_sword[enchantments={levels:{"minecraft:sharpness":2}}]')
```

## Entity Inputs

-   type: `List<EntityInput>`
-   required: no
-   default: empty list
-   primary access: `entityInputs(...)`
-   aliases: `entityInput`, `mobInputs`, `mobInput`

### Syntax

Because entities are not wrapped by KubeJS by default, Summoning Rituals offers custom wrappers to provide an easy syntax. Additionally, because entity inputs support additional properties, the mod offers a builder binding to pass additional data.

```js
.entityInputs([
    "minecraft:elder_guardian",
    "phantom",
    "3x silverfish",
    "3x minecraft:cow",
    "minecraft:wither",
    SummoningEntity.input("cat", 3),
])
```

### Builder

To pass additional data to an entity input such as NBT or a custom tooltip, you can use the entity input builder exposed via the [`SummoningEntity` binding](../binding/entity.md).

### Sacrifice Zone

The sacrifice zone defines how far away entities can be from the altar block to still be considered sacrifices. By default, the value is `[3, 2, 3]`, defined as `[x, y, z]`. This dimension defines the radius around the altar excluding the block itself. Which means the default value covers an actual area of `7x5x7` blocks.

```js
.entityInputZone([3, 3, 3])
```

## Fake Entity Inputs

Fake entity inputs are a special type of entity inputs. Instead of an entity type, they use an `ItemStack` for display purposes. Additionally, a validator needs to be attached checking for the correct entity. This is useful if the entity input requires very complex checks on the data that is only available on the entity if it's present in the world. A common use case for this is an entity that defines its visual appearance based on specific data. Because this data would only be available in the world, a normal entity input could not display it properly in the recipe viewer. Instead, an item can be used to display the input while the validator checks for the correcht entity when the recipe is being selected.

The `ItemStack` can also have components to modify its name or the tooltip (via the lore property).

> [!INFO] NOTE
> This component is available since version 3.7.0.

-   type: `List<FakeEntityInput>`
-   required: no
-   default: empty list
-   primary access: `fakeEntityInputs(...)`
-   aliases: `fakeEntityInput`, `fakeMobInputs`, `fakeMobInput`

### Syntax

Because a fake entity input requires multiple properties, you have to use the [`SummoningEntity` binding](../binding/entity.md) to define it.

```js
.fakeEntityInputs([
      SummoningEntity.fakeInput(
        `minecraft:iron_ingot[custom_name='{"color":"gold","text":"Special Mob"}',lore=['{"color":"gray","text":"Checks for a custom entity."}']]`,
        2,
        e => e.type === "minecraft:pig",
      )
])
```
