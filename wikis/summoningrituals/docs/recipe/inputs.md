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
