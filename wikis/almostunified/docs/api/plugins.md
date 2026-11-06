# Plugins

Plugins allow your mod to register [recipe unifiers](recipe_unifiers.md) and [custom ingredient unifiers](ingredient_unifiers.md). A plugin is a class that implements `AlmostUnifiedPlugin`.

```java
public class MyModPlugin implements AlmostUnifiedPlugin {

    @Override
    public ResourceLocation getPluginId() {
        return ResourceLocation.fromNamespaceAndPath("my_mod", "almostunified");
    }

    @Override
    public void registerRecipeUnifiers(RecipeUnifierRegistry registry) {
        registry.registerForModId("my_mod", new MyModRecipeUnifier());
    }

    @Override
    public void registerCustomIngredientUnifiers(CustomIngredientUnifierRegistry registry) {
        registry.registerForType(
            ResourceLocation.fromNamespaceAndPath("my_mod", "special_ingredient"),
            new MyIngredientUnifier()
        );
    }
}
```

| Method                                       | Description                                                                                                  |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `getPluginId()`                              | A unique ID for the plugin. If your mod has multiple plugins, e.g. for different modules, use different IDs. |
| `registerRecipeUnifiers(registry)`           | Optional. Registers recipe unifiers.                                                                         |
| `registerCustomIngredientUnifiers(registry)` | Optional. Registers custom ingredient unifiers.                                                              |

## Registration

Plugins are discovered differently depending on the mod loader.

### NeoForge

Annotate your plugin class with `@AlmostUnifiedNeoPlugin`. The class needs a public constructor without parameters.

```java
@AlmostUnifiedNeoPlugin
public class MyModPlugin implements AlmostUnifiedPlugin {
    // ...
}
```

### Fabric

Register your plugin class as an `almostunified` entrypoint in your `fabric.mod.json`:

```json
{
    "entrypoints": {
        "almostunified": ["com.example.mymod.compat.MyModPlugin"]
    }
}
```

## Load Order

Plugins are loaded once during mod setup. The unifiers are registered every time the runtime is rebuilt, which happens on every reload.

The built-in plugins of Almost Unified are processed first. All other plugins are processed in the order of their plugin IDs. If multiple plugins register a unifier for the same recipe type, mod ID, or ingredient type, the last registration wins. This means your unifiers always take precedence over the built-in unifiers of Almost Unified.

If a plugin throws an exception, it's removed and the error is logged. The plugin IDs of all loaded plugins are listed in the [log](../features/debugging.md#log-file).

## Example

The [Immersive Engineering add-on](https://github.com/AlmostReliable/almostunified-ie) is a complete example of a NeoForge mod that registers a recipe unifier through a plugin:

```java
@AlmostUnifiedNeoPlugin
public class AUPlugin implements AlmostUnifiedPlugin {

    @Override
    public ResourceLocation getPluginId() {
        return AlmostUnifiedIE.getRL(ImmersiveEngineering.MODID);
    }

    @Override
    public void registerRecipeUnifiers(RecipeUnifierRegistry registry) {
        registry.registerForModId(ImmersiveEngineering.MODID, new IERecipeUnifier());
    }
}
```
