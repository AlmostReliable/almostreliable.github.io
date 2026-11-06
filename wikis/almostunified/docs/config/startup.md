# Startup Config

The startup config contains options that take effect when the game starts. Changes are **not reloadable** and require a full restart of the game.

Location: `config/almostunified/startup.json`

## Options

| Key                     | Description                                                                                                                                                                            | Default |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `server_only`           | Runs Almost Unified in server-only mode. Clients don't need the mod to join, but recipe indicators are disabled. Variant items are only hidden on clients that have the mod installed. | `false` |
| `world_gen_unification` | Removes ores of variant items from world generation. Only available on NeoForge. See [World Generation](../features/world_gen.md).                                                     | `false` |

### `server_only`

By default, Almost Unified registers a custom recipe type that is used to send information about unified recipes to the client. Clients without Almost Unified can't join a server that has this recipe type.

When `server_only` is enabled, this recipe type is not registered. Vanilla clients and clients without Almost Unified can join the server. All recipes are still unified on the server, but recipe viewers won't show the [indicator](../integration/recipe_viewers.md#recipe-indicator) on unified recipes.

### `world_gen_unification`

This option only exists on NeoForge. On Fabric, it's not written to the config and is always disabled.

## Default Config

NeoForge:

```json
{
    "server_only": false,
    "world_gen_unification": false
}
```

Fabric:

```json
{
    "server_only": false
}
```
