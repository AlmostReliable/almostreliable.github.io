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
- `getEnergyRate()`
    - returns the current energy rate of the Energy Meter as a number
- `getTotalEnergy()`
    - returns the current total energy of the Energy Meter as a number
- `getConnectionStatus()`
    - returns the current connection status of the Energy Meter as a string
    - possible values: DISCONNECTED, IDLE, SPLITTING, TRANSFERRING, CONSUMING
- `hasInput()`
    - returns a boolean indicating whether the Energy Meter has at least one side configured as an input
- `hasOutput()`
    - returns a boolean indicating whether the Energy Meter has at least one side configured as an output
- `getIoConfig()`
    - returns a table mapping each side of the Energy Meter to its current IO configuration as a string
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
