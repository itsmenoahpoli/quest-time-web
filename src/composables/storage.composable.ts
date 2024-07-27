export const useStorage = () => {
	const setStorageValue = (key: string, value: unknown): void => {
		localStorage.setItem(
			key,
			JSON.stringify({
				data: value,
			}),
		);
	};

	const getStorageValue = <T = any>(key: string, fallbackValue?: any): T => {
		const retrieved = localStorage.getItem(key);

		return retrieved ?? fallbackValue;
	};

	const clearStorage = (): void => {
		localStorage.clear();
	};

	return {
		setStorageValue,
		getStorageValue,
		clearStorage,
	};
};
