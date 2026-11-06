# Custom Ingredient Unifiers

Minecraft 1.21 supports custom ingredient types. NeoForge, for example, provides compound ingredients that combine multiple ingredients:

```json
{
    "type": "neoforge:compound",
    "children": [{ "item": "mod_a:silver_ingot" }, { "item": "mod_b:silver_ingot" }]
}
```

The default unification logic only knows the common `item` and `tag` properties and the default nested keys. Custom ingredient types often store their items in other properties. A custom ingredient unifier tells Almost Unified how to handle them.

## How It Works

Whenever the [`UnificationHelper`](recipe_unifiers.md#unificationhelper) processes a JSON object with a `type` property, it checks whether a custom ingredient unifier is registered for this type. If there is one, the object is passed to the unifier and the default logic is skipped. This happens for all recipe unifiers, so you don't need a custom recipe unifier to support a custom ingredient type.

## Writing a Custom Ingredient Unifier

A custom ingredient unifier implements `CustomIngredientUnifier`:

```java
public class CompoundIngredientUnifier implements CustomIngredientUnifier {

    @Override
    public boolean unify(UnificationHelper helper, JsonObject jsonObject) {
        return helper.unifyInputObject(jsonObject, RecipeConstants.INGREDIENTS, "children");
    }
}
```

The unifier receives the ingredient as a `JsonObject` **without** its `type` property, so you can safely call helper methods on it without running into a loop. Modify the object in place and return `true` if it was changed. The `type` property is added back afterwards.

This is the actual unifier Almost Unified uses for NeoForge compound ingredients.

## Registration

Register the unifier for the ingredient type in your [plugin](plugins.md):

```java
@Override
public void registerCustomIngredientUnifiers(CustomIngredientUnifierRegistry registry) {
    registry.registerForType(
        ResourceLocation.fromNamespaceAndPath("neoforge", "compound"),
        new CompoundIngredientUnifier()
    );
}
```

Only one unifier can be registered for each type. A later registration replaces an earlier one.
