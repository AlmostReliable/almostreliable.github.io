# Configuration Overview

All configs of Almost Unified are JSON files located in the `config/almostunified` folder of your instance. They are generated with default values when the game starts (`startup.json`) or the first time a world is loaded (all others). If you can't find a config, start the game and load a world once.

## Files

```
config/almostunified/
├── unification/
│   └── materials.json
├── debug.json
├── duplicates.json
├── placeholders.json
├── startup.json
└── tags.json
```

| File                                   | Purpose                                                                 | Reloadable |
| -------------------------------------- | ----------------------------------------------------------------------- | ---------- |
| [`startup.json`](startup.md)           | options that take effect when the game starts                           | no         |
| [`unification/*.json`](unification.md) | mod priorities, tags, and ignore lists, one file per unification config | yes        |
| [`placeholders.json`](placeholders.md) | placeholders that can be used in the tags of unification configs        | yes        |
| [`tags.json`](tags.md)                 | custom tags, tag substitutions, and tag inheritance                     | yes        |
| [`duplicates.json`](duplicates.md)     | rules for detecting and handling duplicate recipes                      | yes        |
| [`debug.json`](debug.md)               | debug dumps and logging options                                         | yes        |

Reloadable configs are read again every time data packs are loaded. You can edit them while the game is running and apply the changes with the `/reload` command. The [Startup Config](startup.md) requires a full restart.

## Multiple Unification Configs

Each JSON file in the `unification` folder is a separate unification config. By default, Almost Unified creates a single config called `materials.json`. You can add as many files as you want, and the file name without the extension is used as the name of the config.

Every unification config has its own mod priorities, priority overrides, stone variants, tags, ignore lists, recipe viewer hiding, and loot unification settings. This allows you to use different priorities for different groups of resources. For example, you could prefer Mekanism for all metals but Thermal for all gems.

See the [Unification Config](unification.md#multiple-unification-configs) page for details.

## Invalid Configs

When a config contains invalid values or a key is missing, Almost Unified backs up the file as `<name>.json.bak` and writes a corrected version. Valid values are kept, and invalid or missing values are replaced with their defaults. Check the [log](../features/debugging.md#log-file) to see which configs were regenerated.

To reset a config to its defaults, delete the file and reload.

## Regular Expressions

Some options, such as `ignored_items` or `ignored_recipe_ids`, accept regular expressions. The whole ID has to match the expression, so a plain ID only matches itself. Use `.*` to match any sequence of characters. Special characters that should be matched literally have to be escaped with a double backslash in JSON, e.g. `\\.`.

```json
{
    "ignored_items": ["minecraft:iron_ingot", "some_mod:.*_ingot"],
    "ignored_recipe_ids": ["some_mod:smelting/.*"]
}
```

## Git

Almost Unified creates a `.gitignore` file in its config folder that excludes `debug.json`. The debug config is meant for local use only and should not be shipped with a modpack.

## Custom Config Location

The config folder can be changed with the JVM argument `-Dalmostunified.configDir=<path>`. This is mainly useful for testing.
