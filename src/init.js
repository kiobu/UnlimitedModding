exports.mod = () => {
	let inclusion = ["weap_", "mod"]
	let items = fileIO.readParsed(global.db.user.cache.items)

	let cnt = 0;

	for (let item in items.data) {
		let curritem = items.data[item]

		if (curritem._props.hasOwnProperty("ItemSound")) {
			if (inclusion.some(inc => curritem._props["ItemSound"].includes(inc))) {
				try {
					curritem._props["Slots"].forEach((el) => {
						try {
							el._props.filters = []
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

	logger.logSuccess(`[MOD] UnlimitedModding enabled. Removed filters for ${cnt} items.`)
}