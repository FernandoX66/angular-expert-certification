export interface CachingConfig {
	/**
	 * The type of storage that will be used to store the cached requests.
	 */
	storage: Storage;
	/**
	 * List of urls to be cached.
	 */
	urls: string[];
	/**
	 * Time in seconds while the cache will be valid.
	 */
	time: number;
}
