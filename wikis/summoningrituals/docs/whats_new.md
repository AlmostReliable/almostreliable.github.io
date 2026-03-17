# What's New

> [!WARNING] NOTE
> This wiki is for Summoning Rituals for Minecraft 1.21.1 and above. For previous versions, please refer to the [old wiki](https://github.com/AlmostReliable/summoningrituals/wiki).

If you have previously used **Summoning Rituals** with Minecraft 1.20 or earlier, you will notice that several things have changed. The mod has been completely rewritten from the ground up and now includes many technical improvements as well as new features.

For players, the mod did not change too much. The recipe viewer pages were improved to show all the newly added conditions. Additionally, the display for entity inputs and outputs was refined.

There are plenty of new conditions, such as biome, dimension, height, light level, sky, and structure checks. The recipe checking logic has been overhauled to allow multiple recipes with similar inputs that only differ in their conditions. Additionally, a new output type has been added: the command output. Output commands are invoked by the altar when a ritual finishes. This allows basic custom logic to be invoked without the need for custom events.

One of the most impactful technical changes that is mostly relevant to modpack developers is how much context the events have access to. Previously, the events only had access to the general recipe information. If you wanted to invoke logic on the items and entities that were actually spawned, this wasn't possible. Now, you get access to the entities in the world to customize the ritual behavior even further.
