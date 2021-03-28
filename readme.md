# UnlimitedModding

```
// The UnlimitedModding mod, currently, only supports adding all handguards to all weapons.
// This is because if we were to add all mods to all weapons, the game is not able to
// calculate the attachment parameters, and usually results in a crash or the game hanging
// on the /client/items request. Due to this, I set the inclusion filter to only add all
// handguards. You can change this to other filters, such as mod_muzzle. However, odds are 
// if it is too many attachments the client to handle, it will either crash your game, take 
// an extremely long time to load, or simply never load in at all. I'm currently looking for
// ways to avoid this, but it seems adding mods to all items takes an extreme load on the
// client. So for now, only handguards are supported, but I'm open for ideas on how to get
// around this client limitation.
```
