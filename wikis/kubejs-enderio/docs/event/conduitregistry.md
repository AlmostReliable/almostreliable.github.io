# Conduit Registry Event

This event allows you to register custom conduits.

**It is a server event and reloadable!**
Keep in mind that server events have to be located inside the `kubejs/server_scripts` folder.

## Overview

EnderIO for 1.21.1 and above supports data-driven conduits by default. This event adds convenience methods to register custom conduits via KubeJS.

It automatically generates the required JSON files for the conduit as well as the language file entry. The only thing you have to provide is a texture
for your custom conduit.

-   access in a server script via: `EnderIOEvents.conduits`
-   supported conduits
    -   energy conduit
    -   fluid conduit
    -   chemical conduit (Mekanism)
    -   ME conduit (Applied Energistics 2)

## Registration

To register a custom conduit, the first thing you need to do is to open an event listener for the `conduits` event in a server script.

```js
EnderIOEvents.conduits(event => {
    // ...
})
```

After that, use one of the following methods to register the respective conduit type. All conduits need an `id` that is used as the registry name and a
`name` that is used for the automatic language file entry generation.

The custom conduit will be part of the normal EnderIO Conduits creative tab. Recipes are **not** generated automatically. You have to add a recipe
for your custom conduits yourself!

### Energy Conduit

-   `transferRate` - specifies the transfer rate of energy per tick

```js
EnderIOEvents.conduits(event => {
    event.registerEnergyConduit(String id, String name, int transferRate); // [!code focus]
});
```

### Fluid Conduit

-   `transferRate` - specifies the transfer rate of fluid per tick
-   `multiFluid` - specifies whether the conduit can transport multiple fluids at once
-   `supportPriority` - specifies whether the conduit supports priority settings

```js
EnderIOEvents.conduits(event => {
    event.registerFluidConduit(String id, String name, int transferRate, boolean multiFluid, boolean supportPriority); // [!code focus]
});
```

### Chemical Conduit

-   `transferRate` - specifies the transfer rate of chemical per tick
-   `multiChemical` - specifies whether the conduit can transport multiple chemicals at once

```js
EnderIOEvents.conduits(event => {
    event.registerChemicalConduit(String id, String name, int transferRate, boolean multiChemical); // [!code focus]
});
```

### ME Conduit

-   `color` - specifies the AE2 color conduit transports channels for
    -   this needs to be a value from the `AEColor` enum, for universal color use `TRANSPARENT`
    -   possible values: `BLACK`, `BLUE`, `BROWN`, `CYAN`, `GRAY`, `GREEN`, `LIGHT_BLUE`, `LIGHT_GRAY`, `LIME`, `MAGENTA`, `ORANGE`, `PINK`, `PURPLE`, `RED`, `TRANSPARENT`, `WHITE`, `YELLOW`
-   `dense` - specifies whether the conduit is a dense ME conduit (32 channels) or a normal one (8 channels)

```js
EnderIOEvents.conduits(event => {
    event.registerMeConduit(String id, String name, String color, boolean dense); // [!code focus]
});
```

## Texture

After registering the custom conduit inside the event, the language file as well as the model file are automatically generated. The
only things you have to provide are the textures.

### Block Texture

For the block of the conduit, the texture file needs to be placed inside the following directory:
`kubejs/assets/enderio/textures/block/conduit`

It needs to have the same name as the `id` parameter you used when registering the custom conduit. Make sure it's a valid `.png` file.
You can download a template PSD file [here](files/conduit.psd).

### Conduit Icon

For the icon inside the conduit GUI, you need to provide an additional texture file. It has to be placed in the following directory:
`kubejs/assets/enderio/textures/conduit_icon`

Once again, the texture should have the same name as your conduit `id`. Make sure to crop the texture accordingly so it only consists of the actual icon.

## Example

In this example, we add the _Stellar Energy Conduit_ with the id `enderio:stellar_conduit` and a transfer rate of `50000` RF/t.

```js
EnderIOEvents.conduits(event => {
    event.registerEnergyConduit("stellar_conduit", "Stellar Energy Conduit", 50000)
})
```

Texture:
![](/../img/texture.png)

Creative Tab:
![](/../img/creative_tab.png)

Connection:
![](/../img/connection.png)

GUI:
![](/../img/gui.png)
