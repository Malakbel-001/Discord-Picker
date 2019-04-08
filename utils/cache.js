const NodeCache = require('node-cache');

class Cache {
	constructor(ttlSeconds) {
		this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
	}

	get(key, getResultFromDb) {
		// Get value from cache by key
		const valueFromCache = this.cache.get(key);
		// Use value from cache if possible
		if (valueFromCache) {
			return valueFromCache;
		}

		// Get from Database instead if there's no cache yet
		const valueFromDb = getResultFromDb();
		// Update cache
		this.cache.set(key, valueFromDb);
		// Get value from Database
		return valueFromDb;
	}

	del(keys) {
		this.cache.del(keys);
	}

	// TODO: Not used atm
	delStartWith(startStr = '') {
		if (!startStr) {
			return;
		}

		const keys = this.cache.keys();
		for (const key of keys) {
			if (key.indexOf(startStr) === 0) {
				this.del(key);
			}
		}
	}

	// TODO: Not used atm
	flush() {
		this.cache.flushAll();
	}
}

module.exports = Cache;