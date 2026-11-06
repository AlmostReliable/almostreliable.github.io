# Tag Config

The tag config contains options that change tags before the unification runs. It applies to all unification configs.

Location: `config/almostunified/tags.json`

## Options

| Key                          | Description                                                                           | Default   |
| ---------------------------- | ------------------------------------------------------------------------------------- | --------- |
| `custom_tags`                | Adds items to existing or new item tags.                                              | `{}`      |
| `tag_substitutions`          | Converts tags to other tags.                                                          | `{}`      |
| `item_tag_inheritance_mode`  | Mode for the item tag inheritance, `ALLOW` or `DENY`.                                 | `"ALLOW"` |
| `item_tag_inheritance`       | Item tags that target items inherit from variant items.                               | `{}`      |
| `block_tag_inheritance_mode` | Mode for the block tag inheritance, `ALLOW` or `DENY`.                                | `"ALLOW"` |
| `block_tag_inheritance`      | Block tags that target items inherit from variant items.                              | `{}`      |
| `emi_strict_hiding`          | Whether variant items are hidden strictly in EMI. Only present when EMI is installed. | `true`    |

## Custom Tags

Custom tags allow you to add items to existing or new item tags without a data pack or a mod like KubeJS. The key is the tag, the value is a list of item IDs.

```json
{
    "custom_tags": {
        "c:ingots/silver": ["some_mod:silver_bar"],
        "c:gems/onyx": ["some_mod:onyx", "other_mod:onyx_gem"]
    }
}
```

If the tag doesn't exist, it's created. Custom tags are applied to the game's tags right after they are loaded and before all other steps, so they can be used as unification tags and are visible to other mods as well. Invalid item IDs and items that are already part of the tag are skipped with a warning.

## Tag Substitutions

Mods don't always agree on tag conventions. One mod might use `c:ingots/tin`, while another one uses `c:tin_ingots`. Since both tags are different, their items can't be unified with each other, and recipes using one of them won't accept the items of the other one.

Tag substitutions solve this by converting one or more **replaced tags** to a **substitute tag**. The key is the substitute tag, the value is a list of replaced tags.

```json
{
    "tag_substitutions": {
        "c:ingots/tin": ["c:tin_ingots", "some_mod:tin_ingots"],
        "c:gems/coal": ["c:coal"]
    }
}
```

With this config, Almost Unified:

1. adds all items of the replaced tags to the substitute tag
2. replaces the replaced tags in recipe inputs with the substitute tag
3. replaces the replaced tags in recipe outputs with the target item of the substitute tag

Rules:

- The substitute tag has to be a unification tag, so it has to be part of the `tags` of a unification config. Otherwise, the entry is ignored and a warning is logged.
- The replaced tags must not be unification tags themselves.
- Replaced tags that don't exist in the game are skipped.

Tag substitutions were called _tag ownerships_ in older versions of the mod.

## Tag Inheritance

Many game mechanics depend on tags. Beacons accept items from the `minecraft:beacon_payment_items` tag, and multiblock structures of mods often check block tags. If the variant item had such a tag but the target item doesn't, the mechanic stops working after the unification, because players can only obtain the target item.

With tag inheritance, target items inherit tags from their variant items. The key is the tag to inherit, the value is a list of regular expressions that are matched against the tags of the target item. A target item only inherits the tag if one of its tags matches.

### Item Tag Inheritance

```json
{
    "item_tag_inheritance_mode": "ALLOW",
    "item_tag_inheritance": {
        "minecraft:beacon_payment_items": ["c:ingots/.*"],
        "some_mod:magnet_items": ["c:ingots/iron", "c:nuggets/iron"]
    }
}
```

In this example, the target item of each `c:ingots/*` tag receives the `minecraft:beacon_payment_items` tag if any of its variant items has it. Target items of `c:ingots/iron` and `c:nuggets/iron` additionally receive `some_mod:magnet_items`.

### Block Tag Inheritance

Block tag inheritance works the same way, but the key is a **block** tag. The values are still matched against the **item** tags of the target item, because Almost Unified works with item tags.

```json
{
    "block_tag_inheritance_mode": "ALLOW",
    "block_tag_inheritance": {
        "mod_a:valid_multiblock_blocks": ["c:storage_blocks/steel"]
    }
}
```

If two mods add a Steel Block and the multiblock of Mod A only accepts blocks with the `mod_a:valid_multiblock_blocks` block tag, the target Steel Block of Mod B would not work in the multiblock. With this config, it inherits the block tag from the Steel Block of Mod A.

Block tags are only inherited if the target item has a corresponding block.

### Inheritance Mode

The mode defines how the inheritance entries are interpreted:

- `ALLOW`: Only the listed tags are inherited, and only by target items that have a tag matching one of the patterns of the respective entry.
- `DENY`: Target items inherit all tags of their variant items. Target items whose unification tag matches any of the configured patterns are excluded and don't inherit any tags.

```json
{
    "item_tag_inheritance_mode": "DENY",
    "item_tag_inheritance": {
        "some_mod:special_ingots": ["c:ingots/.*"]
    }
}
```

In this example, target items of all unification tags except `c:ingots/*` inherit all item tags of their variant items.

::: warning
The `DENY` mode can add a lot of tags to target items. Check the [log](../features/debugging.md#log-file) to see which tags were added.
:::

## EMI Strict Hiding

This option is only written to the config when EMI is installed. It controls how variant items are hidden in EMI. See [Recipe Viewers](../integration/recipe_viewers.md#emi).

## Default Config

```json
{
    "custom_tags": {},
    "tag_substitutions": {},
    "item_tag_inheritance_mode": "ALLOW",
    "item_tag_inheritance": {},
    "block_tag_inheritance_mode": "ALLOW",
    "block_tag_inheritance": {},
    "emi_strict_hiding": true
}
```
