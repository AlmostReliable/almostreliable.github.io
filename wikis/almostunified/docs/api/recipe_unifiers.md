# Recipe Unifiers

A recipe unifier tells Almost Unified how to unify the recipes of a specific mod or recipe type. Almost Unified's generic unifier already covers most recipes. You only need a custom recipe unifier if your recipes store their inputs or outputs in properties the generic unifier doesn't know.

## Choosing a Unifier

For each recipe, Almost Unified chooses a single recipe unifier in the following order:

1. a unifier registered for the recipe type with `registerForRecipeType`
2. a unifier registered for the namespace of the recipe type with `registerForModId`
3. the bundled `SmithingRecipeUnifier` if the recipe looks like a smithing recipe
4. the bundled `ShapedRecipeUnifier` if the recipe looks like a shaped crafting recipe
5. the bundled `GenericRecipeUnifier`

The chosen unifier is called once for every unification config that doesn't ignore the recipe.

## Writing a Recipe Unifier

A recipe unifier implements `RecipeUnifier` and its single method `unify`:

```java
public class MyModRecipeUnifier implements RecipeUnifier {

    @Override
    public void unify(UnificationHelper helper, RecipeJson recipe) {
        // handle the default properties like "input" and "result"
        GenericRecipeUnifier.INSTANCE.unify(helper, recipe);

        // handle custom input properties
        helper.unifyInputs(recipe, "catalyst", "secondary_input");

        // handle custom output properties
        helper.unifyOutputs(recipe, "byproducts", "slag");
    }
}
```

`RecipeJson` gives you access to the recipe:

| Method                    | Description                                          |
| ------------------------- | ---------------------------------------------------- |
| `getId()`                 | the recipe ID                                        |
| `getType()`               | the recipe type                                      |
| `hasProperty(key)`        | whether the recipe has the given top-level property  |
| `getProperty(key)`        | the top-level property as a `JsonElement`, or `null` |
| `setProperty(key, value)` | replaces the top-level property                      |

The recipe is a copy of the original JSON. Modify it in place through the helper methods or `setProperty`. Almost Unified compares the result with the original recipe to find out whether it was changed.

## `UnificationHelper`

The helper provides methods to unify parts of the recipe. All methods return `true` if something was changed.

### Inputs

Inputs are converted to tags. An item that is part of a unification tag is replaced with the tag, and a replaced tag of a [tag substitution](../config/tags.md#tag-substitutions) is replaced with its substitute tag.

| Method                                | Description                                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `unifyInputs(recipe, keys...)`        | Unifies the top-level properties with the given keys.                                                                                      |
| `unifyInputElement(element, keys...)` | Unifies a JSON object or array. Nested elements are searched under the given keys, or `value`, `base`, and `ingredient` if none are given. |
| `unifyInputArray(array, keys...)`     | Unifies each element of an array.                                                                                                          |
| `unifyInputObject(object, keys...)`   | Unifies an object and its nested elements.                                                                                                 |
| `unifyInputTag(object)`               | Replaces the `tag` property with its substitute tag.                                                                                       |
| `unifyInputItem(object)`              | Replaces the `item` property with the item's unification tag.                                                                              |

### Outputs

Outputs are converted to target items. By default, output tags are converted to the target item of the tag as well. Pass `tagsToItems = false` to keep tags, which then only get their tag substitutions applied.

| Method                                                 | Description                                                                                                                      |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `unifyOutputs(recipe, keys...)`                        | Unifies the top-level properties with the given keys and converts tags to items.                                                 |
| `unifyOutputs(recipe, tagsToItems, keys...)`           | Same as above with control over the tag conversion.                                                                              |
| `unifyOutputs(recipe, key, tagsToItems, innerKeys...)` | Unifies a single top-level property and searches nested elements under the given inner keys.                                     |
| `unifyOutputElement(element, tagsToItems, keys...)`    | Unifies a JSON object or array. Nested elements are searched under the given keys, or `item` and `ingredient` if none are given. |
| `unifyOutputArray(array, tagsToItems, keys...)`        | Unifies each element of an array.                                                                                                |
| `unifyOutputObject(object, tagsToItems, keys...)`      | Unifies an object and its nested elements.                                                                                       |
| `unifyOutputTag(object, tagsToItems)`                  | Replaces the `tag` property with the target item or the substitute tag.                                                          |
| `unifyOutputItem(object)`                              | Replaces the `item` and `id` properties with their target items.                                                                 |
| `unifyOutputItem(object, key)`                         | Replaces the given property with its target item.                                                                                |
| `handleOutputItemReplacement(primitive)`               | Returns the target item for an item ID, or `null` if it doesn't need to be replaced.                                             |
| `handleTagToItemReplacement(object, [key,] tag)`       | Replaces the `tag` property with the target item of the tag under the given key, `item` by default.                              |

### Other

- `getUnificationLookup()` returns the lookup of the unification config that is currently processed. See [Runtime & Lookups](lookup.md).
- `getCustomIngredientUnifier(type)` returns the custom ingredient unifier for the given type. See [Custom Ingredient Unifiers](ingredient_unifiers.md).

Objects with a `type` property that has a registered custom ingredient unifier are passed to that unifier automatically.

## Bundled Unifiers

The bundled unifiers can be reused in your own unifiers through their `INSTANCE` fields:

| Unifier                 | Description                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GenericRecipeUnifier`  | Unifies `input`, `inputs`, `ingredient`, `ingredients`, `inputItems` as inputs and `output`, `outputs`, `result`, `results`, `outputItems` as outputs. |
| `ShapedRecipeUnifier`   | Unifies shaped crafting recipes and recipes that share their structure. Use `isApplicable(recipe)` to check.                                           |
| `SmithingRecipeUnifier` | Unifies smithing recipes. Use `isApplicable(recipe)` to check.                                                                                         |

The default property names are also available as constants in `RecipeConstants`.

## Example

The following unifier is a shortened version of the one in the [Immersive Engineering add-on](https://github.com/AlmostReliable/almostunified-ie). It applies the generic unification first and then handles the custom properties of Immersive Engineering recipes:

```java
public class IERecipeUnifier implements RecipeUnifier {

    @Override
    public void unify(UnificationHelper helper, RecipeJson recipe) {
        GenericRecipeUnifier.INSTANCE.unify(helper, recipe);

        // custom input properties
        List.of("input0", "input1", "additives", "soil", "catalyst")
            .forEach(key -> helper.unifyInputs(recipe, key));

        // output properties wrapped in { "basePredicate": ... } or { "output": ... }
        List.of(RecipeConstants.RESULT, RecipeConstants.RESULTS, "slag", "secondaryOutputs")
            .forEach(key -> helper.unifyOutputs(recipe, key, true, "basePredicate", RecipeConstants.OUTPUT));

        // arrays of secondary outputs
        if (recipe.getProperty("secondaries") instanceof JsonArray secondaries) {
            helper.unifyOutputArray(secondaries, true, RecipeConstants.OUTPUT);
        }
    }
}
```

Register the unifier in your [plugin](plugins.md):

```java
registry.registerForModId("immersiveengineering", new IERecipeUnifier());
```
