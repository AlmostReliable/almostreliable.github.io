# What's New

If you have previously used **Summoning Rituals** with Minecraft 1.20 or earlier, you will notice that several things have changed. The mod has been completely rewritten from the ground up and now includes many technical improvements as well as new features.

## General

There are plenty of new conditions, such as biome, dimension, height, light level, moon phase, sky, and structure checks.

The recipe checking logic has been overhauled to allow multiple recipes with similar inputs that only differ in their conditions.

Additionally, a new output type has been added: the command output. Output commands are invoked by the altar when a ritual finishes. This allows basic custom logic to be invoked without the need for custom events.

Block patterns are also supported now. This means that you can require specific blocks to be placed around the altar for a ritual to work. This opens up a lot of possibilities for custom rituals that are more than just "place items on the altar and wait".

## Players

For players, the most notable changes are the recipe viewer integrations. The recipe pages were improved to show all the newly added conditions. Additionally, the display for entity inputs and outputs was refined.

Because recipes now support block pattern requirements, you can activate a live preview via the recipe manager pages. Additionally, there will be highlights in the world when a specific block doesn't match the expected pattern.

## Developers

Due to the rewrite, it's now a lot easier to create very complex recipes. The new API is more intuitive and allows for better code readability. Additionally, the new recipe system is more flexible and allows for more complex logic to be implemented.

One of the most impactful technical changes is how much context the events have access to. Previously, the events only had access to the general recipe information. If you wanted to invoke logic on the items and entities that were actually spawned, this wasn't possible. Now, you get access to the entities in the world to customize the ritual behavior even further.

Additionally, you can also register custom ritual renderers now.
