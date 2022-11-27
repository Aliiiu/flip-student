export const formatDateYmd = (date: any) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
};

export const formatDateDmy = (date: any) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('-');
};

export const getSessionStorageOrDefault = (
	key: string,
	defaultValue: number
) => {
	const stored = sessionStorage.getItem(key);
	if (!stored) {
		return defaultValue;
	}
	return JSON.parse(stored);
};
