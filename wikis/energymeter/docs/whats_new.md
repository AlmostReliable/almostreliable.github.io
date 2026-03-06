# What's New

> [!WARNING] NOTE
> This wiki is for Energy Meter for Minecraft 1.21.1 and above. For previous versions, please refer to the [old wiki](https://github.com/AlmostReliable/energymeter/wiki).

If you have previously used **Energy Meter** with Minecraft 1.20 or earlier, you will notice that several things have changed. The mod has been
completely rewritten from the ground up and now includes many technical improvements as well as new features.

Most importantly, it is now possible to have multiple inputs and outputs instead of only a single input as before. This was one of the biggest
criticisms of the old version. Since the calculation system was rebuilt from scratch, it was finally possible to remove this limitation.

Another frequently requested feature, though not easy to implement, was the ability to limit the flow rate of the Energy Meter. The block no
longer behaves like an unlimited cable when a limit is configured in the GUI. Naturally, the limit also supports multiple inputs. In this case,
all inputs are limited collectively rather than individually.

More information is now available as well. The interface now displays the total throughput the Energy Meter has processed so far. This accumulated
value can be reset at the press of a button in the GUI. It is also easier to see which mode the Energy Meter is currently operating in. Previously
used toggleable labels have been replaced with convenient radio buttons. This makes it easier not only to see the currently selected option but also
all available options. Related settings are also grouped together, improving clarity and usability.

The input fields have also been completely redesigned. They now provide feedback for invalid values and support mathematical expressions. The
preliminary result is displayed in a small tooltip.

Another new feature is the graph view. It displays the values of previous intervals in a clear visual format. The graph can also be paused
for closer inspection.

Finally, new configuration options have also been added. It is now possible to define the default interval frequency that every Energy Meter
uses when placed. Additionally, you can configure whether Energy Meters are allowed to connect to each other.

Since the mod is still in the beta phase, additional features will be added over time. Planned features include things like **ComputerCraft integration**
and interactions with **Redstone**. For a more detailed explanation of all features and the user interface, please refer to the other pages of this wiki.
