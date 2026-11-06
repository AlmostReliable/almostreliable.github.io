# Placeholder Config

Placeholders let you write a single tag in the `tags` list of a [unification config](unification.md) that expands to many tags. Instead of listing `c:ingots/copper`, `c:ingots/iron`, `c:ingots/tin`, and so on, you can write `c:ingots/{material}`.

Location: `config/almostunified/placeholders.json`

## Structure

The config is a JSON object. Each key is the name of a placeholder, and each value is the list of values the placeholder is replaced with.

```json
{
    "material": ["copper", "iron", "tin"],
    "gem": ["ruby", "sapphire"]
}
```

In the `tags` list of a unification config, a placeholder is written in curly braces, e.g. `{material}`. With the config above:

- `c:ingots/{material}` expands to `c:ingots/copper`, `c:ingots/iron`, and `c:ingots/tin`
- `c:gems/{gem}` expands to `c:gems/ruby` and `c:gems/sapphire`

## Combining Placeholders

A tag can contain multiple placeholders. In this case, every combination of values is created. With the config above, the tag `c:{gem}_{material}_alloys` expands to six tags:

- `c:ruby_copper_alloys`
- `c:ruby_iron_alloys`
- `c:ruby_tin_alloys`
- `c:sapphire_copper_alloys`
- `c:sapphire_iron_alloys`
- `c:sapphire_tin_alloys`

Tags that don't exist in the game are skipped, so it's fine if not every combination exists. Enable `log_invalid_tags` in the [Debug Config](debug.md) to see which expanded tags were skipped.

## Notes

- Placeholders apply to the `tags` list of all unification configs. They are not supported in `ignored_tags`.
- A placeholder with an empty list is ignored. Tags using it are not expanded and keep the placeholder text, which means they are skipped as invalid tags.
- If the config is empty, the default config is restored.

## Default Config

By default, the config only contains the `material` placeholder:

```json
{
    "material": [
        "aeternium",
        "aluminum",
        "amber",
        "apatite",
        "bitumen",
        "brass",
        "bronze",
        "chrome",
        "cinnabar",
        "cobalt",
        "constantan",
        "copper",
        "diamond",
        "electrum",
        "elementium",
        "emerald",
        "enderium",
        "fluorite",
        "gold",
        "graphite",
        "invar",
        "iridium",
        "iron",
        "lapis",
        "lead",
        "lumium",
        "mithril",
        "netherite",
        "nickel",
        "obsidian",
        "osmium",
        "peridot",
        "platinum",
        "potassium_nitrate",
        "ruby",
        "sapphire",
        "signalum",
        "silver",
        "steel",
        "sulfur",
        "tin",
        "tungsten",
        "uranium",
        "zinc"
    ]
}
```
