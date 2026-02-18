# Capacitor Registration

This registry event extension allows you to register custom Capacitors. Capacitors are used in EnderIO machines and can modify different properties of them.

> [!WARNING] NOTE
> This event extension only exists since mod version 1.21.1-0.12.0, release date: 2026-02-18.

**It is a startup event and not reloadable!**
Keep in mind that startup events have to be located inside the `kubejs/startup_scripts` folder.

## Overview

This is an extension to the built-in KubeJS item registry event. It adds convenience methods to register custom Capacitors via KubeJS.

-   access in a startup script via: `StartupEvents.registry`
-   functions:
    -   `baseValue(float)`
        -   description: sets the base value of the Capacitor; this is the value for all Capacitor modifiers if no custom value is set for them
        -   required: no
        -   default value: `1`
    -   `modifierValue(CapacitorModifier, float)`
        -   description: sets the value for a specific Capacitor modifier; this overrides the base value for the specified modifier
        -   required: no
        -   default value: same as base value
        -   `CapacitorModifier` is an enum and can be specified by using `CapacitorModifier.<VALUE>` or by an case-insensitive string
        -   possible values:
            -   `ENERGY_CAPACITY` - modifies the energy capacity of the machine
            -   `ENERGY_USE` - modifies the energy use of the machine
            -   `FUEL_EFFICIENCY` - modifies the fuel efficiency of the machine
            -   `BURNING_ENERGY_GENERATION` - modifies the burning energy generation of the machine; only applies to generators
    -   `hideFromCreativeTab()`
        -   description: hides the Capacitor from the creative tab; this is useful for Capacitors that are only used for loot as a surprise
        -   required: no
        -   default value: `false`
    -   all functions of the KubeJS `ItemBuilder`, for example `displayName`, `rarity`, `tooltip`, etc.

## Event Listener

To access the event, the first thing you need to do is to open an event listener for the `registry` event in a startup script.

```js
StartupEvents.registry("item", event => {
    // ...
})
```

After that, you can use the `CapacitorBuilder` to register a custom Capacitor.

## Example

```js
StartupEvents.registry("item", event => {
    event
        .create(
            "my_modpack:my_capacitor", // id of the capacitor (will use kubejs if no namespace is specified)
            "enderio:capacitor" // type to register (always enderio:capacitor)
        )
        .displayName("My Capacitor") // overrides the automatically generated display name, can still be changed with lang file
        .rarity("rare") // common, uncommon, rare, epic
        .glow(true) // enchantment overlay
        .baseValue(1.4)
        .modifierValue("energy_use", 0.2)
        .modifierValue("ENERGY_CAPACITY", 2)
        .modifierValue(CapacitorModifier.FUEL_EFFICIENCY, 2.3)
        .hideFromCreativeTab()
        .texture("minecraft:item/acacia_boat") // custom texture for the capacitor; this example uses the vanilla acacia boat texture
})
```
