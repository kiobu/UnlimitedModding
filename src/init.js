exports.mod = () => {
    let items = fileIO.readParsed(global.db.user.cache.items)
    let inclusion = "mod"

    let modmap = {}

    // Set up the modmap.
    for (let item in items.data) {
        let curritem = items.data[item]
        try {
            curritem._props["Slots"].forEach((el) => {
                if (el["_name"].includes(inclusion)) {
                    let key = el["_name"]
                    try {
                        el._props.filters.forEach((ele) => {
                            modmap[key] ? modmap[key].add(...ele["Filter"]) : modmap[key] = new Set(ele["Filter"]);
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

    for (let item in items.data) {
        let curritem = items.data[item]
        try {
            curritem._props["Slots"].forEach((el) => {
                let key = el["_name"]
                if (modmap[key]) {
                    el._props.filters[0].Filter = Array.from(modmap[key])
                }
            })
        } catch (_) { }
    }
}