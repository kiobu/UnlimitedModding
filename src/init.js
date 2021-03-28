// PLEASE READ ME!

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

exports.mod = () => {
    let items = fileIO.readParsed(global.db.user.cache.items)
    let inclusion = ["mod_handguard"]

    let cnt = 0

    let modmap = {}

    // Set up the modmap.
    for (let item in items.data) {
        let curritem = items.data[item]
        try {
            curritem._props["Slots"].forEach((el) => {
                if (inclusion.includes(el["_name"])) {
                    let key = el["_name"]
                    try {
                        el._props.filters[0].Filter.forEach((ele) => {
                            modmap[key] ? modmap[key].add(helper_f.getItem(ele)[1]._parent) : modmap[key] = new Set(ele["Filter"]);
                        })
                    } catch (_) { }
                }
            })
        } catch (_) { }
    }

    // Clean up modmap.
    for (let k in modmap) {
        modmap[k].forEach((el) => {
            if (typeof el === "undefined") {
                modmap[k].delete(el)
            }
        })
    }

    console.log(modmap)

    for (let item in items.data) {
        let curritem = items.data[item]
        try {
            curritem._props["Slots"].forEach((el) => {
                let key = el["_name"]
                if (modmap[key]) {
                    el._props.filters[0].Filter = Array.from(modmap[key])
                    cnt++
                }
            })
        } catch (_) { }
    }

    fileIO.write(global.db.user.cache.items, items)
    logger.logSuccess(`Changed ${cnt} items.`)
}