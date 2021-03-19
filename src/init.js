exports.mod = () => {
	let inclusion = ["weap_", "mod"]
	let items = fileIO.readParsed(global.db.user.cache.items)

	let allmods = []

	// Get all mods.
	for (let item in items.data) {
		let curritem = items.data[item]
		try {
			if (inclusion.some(inc => curritem._props["ItemSound"].includes("mod"))) {
				if (!allmods.includes(curritem._parent)) {
					allmods.push(curritem._parent)
				}
			}
		} catch (_) { } // This item is not a mod.
	}

	let cnt = 0;

	// Set the filters of all weapons and mods to all mods.
	for (let item in items.data) {
		let curritem = items.data[item]
		if (curritem._props.hasOwnProperty("ItemSound")) {
			if (inclusion.some(inc => curritem._props["ItemSound"].includes(inc))) {
				try {
					curritem._props["Slots"].forEach((el) => {
						try {
							el._props.filters = [{ "Filter": allmods }]
							cnt++;
						} catch (_) {
							return; // This item doesn't have a 'filters' array.
						}
					})
				} catch (err) { } // This item doesn't have a 'Slots' array.
			}
		}
	}

	fileIO.write(global.db.user.cache.items, items) // Write our changes to the cache.

	logger.logSuccess(`[MOD] UnlimitedModding enabled. Refiltered ${cnt} items.`)
	logger.logWarning(`NOTE: UnlimitedModding is taxing on the client. It will cause your game to take significantly longer to load (5+ minutes).`)
}