# Developer Guide

Almost Unified provides an API for mod developers. It can be used to:

- query unification information, e.g. the target item of a tag, to make your mod's own systems respect the unification
- register custom [recipe unifiers](recipe_unifiers.md) for recipes with unusual structures
- register custom [ingredient unifiers](ingredient_unifiers.md) for custom ingredient types

The API is located in the `com.almostreliable.unified.api` package. All other packages are internal and can change without notice.

## Dependency

Almost Unified is published to the [BlameJared Maven](https://maven.blamejared.com).

```kotlin
repositories {
    maven("https://maven.blamejared.com")
}
```

There are three artifacts:

| Artifact                                         | Use case                                 |
| ------------------------------------------------ | ---------------------------------------- |
| `com.almostreliable.mods:almostunified-common`   | multi-loader projects, common source set |
| `com.almostreliable.mods:almostunified-neoforge` | NeoForge projects                        |
| `com.almostreliable.mods:almostunified-fabric`   | Fabric projects                          |

The version follows the format `<minecraft version>-<mod version>`, e.g. `1.21.1-1.4.2`. Each artifact is also available with the `api` classifier, which only contains the API classes. Compile against the API jar and use the full jar at runtime:

```kotlin
dependencies {
    // NeoForge (ModDevGradle)
    compileOnly("com.almostreliable.mods:almostunified-neoforge:1.21.1-<version>:api")
    localRuntime("com.almostreliable.mods:almostunified-neoforge:1.21.1-<version>")
}
```

```kotlin
dependencies {
    // Fabric (Loom)
    modCompileOnly("com.almostreliable.mods:almostunified-fabric:1.21.1-<version>:api")
    modLocalRuntime("com.almostreliable.mods:almostunified-fabric:1.21.1-<version>")
}
```

Check the [Maven](https://maven.blamejared.com/com/almostreliable/mods/) for the latest versions.

## Optional Dependency

If Almost Unified is an optional dependency of your mod, make sure you don't load any of its classes when it's not installed. A common pattern is an adapter class that checks whether the mod is loaded and only then accesses the API through a nested class:

```java
public final class AlmostUnifiedAdapter {

    private AlmostUnifiedAdapter() {}

    public static boolean isLoaded() {
        return ModList.get().isLoaded("almostunified"); // NeoForge
        // return FabricLoader.getInstance().isModLoaded("almostunified"); // Fabric
    }

    @Nullable
    public static Item getTagTargetItem(TagKey<Item> tag) {
        if (isLoaded()) {
            return Adapter.getTagTargetItem(tag);
        }

        // fallback when Almost Unified is not installed: use the first item of the tag
        return BuiltInRegistries.ITEM
            .getTag(tag)
            .flatMap(set -> set.stream().findFirst())
            .map(Holder::value)
            .orElse(null);
    }

    private static final class Adapter {

        @Nullable
        private static Item getTagTargetItem(TagKey<Item> tag) {
            return AlmostUnified.INSTANCE.getTagTargetItem(tag);
        }
    }
}
```

## Server Side Only

All unification information is only built on the **logical server**, after tags have been loaded. On a client connected to a dedicated server, or before the first data pack load, the API returns empty values. Use `AlmostUnified.INSTANCE.isRuntimeLoaded()` to check whether the information is available. See [Runtime & Lookups](lookup.md).

## Next Steps

- [Runtime & Lookups](lookup.md) explains how to query unification information.
- [Plugins](plugins.md) explains how to register unifiers.
- [Recipe Unifiers](recipe_unifiers.md) explains how to write a recipe unifier.
- [Custom Ingredient Unifiers](ingredient_unifiers.md) explains how to support custom ingredient types.
- The [Immersive Engineering add-on](https://github.com/AlmostReliable/almostunified-ie) is a complete example of a mod using the API.
