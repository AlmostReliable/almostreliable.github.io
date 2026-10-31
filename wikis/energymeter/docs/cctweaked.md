# CC: Tweaked

Energy Meter features native integration for [CC: Tweaked](https://tweaked.cc/) offering multiple functions and events to interact with the Energy Meter.

## Connection

To set up a connection between a Computer and an Energy Meter, you need to connect the Energy Meter as a peripheral. The block exposes the peripheral capability under the name `energymeter`. You can connect to it using the following command:

```lua
local energyMeter = peripheral.wrap(ORIENTATION)
```

`ORIENTATION` refers to the side of the Energy Meter block relative to the computer. For example, if you place the Energy Meter behind the computer, you would use `"back"` as the orientation.

```lua
local energyMeter = peripheral.wrap("back")
```

## Functions

- `getTransferMode()`
    - returns the current transfer mode of the Energy Meter as a string
    - possible values: SPLIT, TRANSFER, CONSUME
- `getMeasureMode()`
    - returns the current measure mode of the Energy Meter as a string
    - possible values: INSTANT, SMOOTH
- `getMeasureInterval()`
    - returns the current measure interval of the Energy Meter as a number
- `getZeroTolerance()`
    - returns the current zero tolerance of the Energy Meter as a number
- `getTransferLimit()`
    - returns the current transfer limit of the Energy Meter as a number
    - a value of 0 means the transfer is unlimited
- `getEffectiveTransferLimit()`
    - returns the transfer limit that currently applies as a number, after the [Throttle](interface.md#behavior) redstone behavior scaled it
    - returns `math.huge` if the transfer is unlimited and 0 if the transfer is blocked
- `getEnergyRate()`
    - returns the current energy rate of the Energy Meter as a number
- `getTotalEnergy()`
    - returns the current total energy of the Energy Meter as a number
- `getConnectionStatus()`
    - returns the current connection status of the Energy Meter as a string
    - possible values: DISCONNECTED, IDLE, SPLITTING, TRANSFERRING, CONSUMING, BLOCKED
- `hasInput()`
    - returns a boolean indicating whether the Energy Meter has at least one side configured as an input
- `hasOutput()`
    - returns a boolean indicating whether the Energy Meter has at least one side configured as an output
- `getIoConfig()`
    - returns a table mapping each side of the Energy Meter to its current IO configuration as a string
- `getRedstoneConfig()`
    - returns a table containing the current [redstone](interface.md#redstone-panel) settings and signals of the Energy Meter
    - `function`: the redstone function as a string, possible values: OFF, ANALOG, THRESHOLD, CONTROL
    - `lower_bound`, `upper_bound`: the lower and upper bound as numbers
    - `scale`: the scale of the **Analog** function as a string, possible values: LINEAR, LOGARITHMIC
    - `control_behavior`: the behavior of the **Control** function as a string, possible values: SWITCH, THROTTLE
    - `inverted`: a boolean indicating whether the signal is inverted
    - `output_signal`: the emitted signal strength as a number
    - `input_signal`: the strongest received signal as a number, always 0 unless the function is **Control**
- `getRedstoneOutput()`
    - returns the signal strength the Energy Meter currently emits as a number
- `getRedstoneInput()`
    - returns the strongest redstone signal the Energy Meter currently receives as a number
    - always returns 0 unless the redstone function is **Control**
- `getData()`
    - returns a table containing all the current data (all of the above) of the Energy Meter

## Events

The Energy Meter peripheral offers two events you can listen to using the `os.pullEvent()` function.

### Changed Event

This event fires whenever a value of the Energy Meter changes. This includes changes to the IO config, any setting, or the measured values.

```lua
local energyMeter = peripheral.wrap("back")

while true do
    local event, data = os.pullEvent("energymeter_changed")
    print("Energy Meter changed its data: " .. data)
end
```

### Removed Event

This event fires whenever the Energy Meter is removed from the world. This can happen when the block is broken or replaced.

```lua
local energyMeter = peripheral.wrap("back")

while true do
    local event = os.pullEvent("energymeter_removed")
    print("Energy Meter was removed from the world.")
end
```
