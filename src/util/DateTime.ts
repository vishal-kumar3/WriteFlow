export function formatDateAgo(date: Date): string {
	const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

	const intervals: { [key: string]: number } = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
		second: 1,
	};

	for (const [key, value] of Object.entries(intervals)) {
		const count = Math.floor(seconds / value);
		if (count > 0) {
			return `${count} ${key}${count > 1 ? 's' : ''} ago`;
		}
	}

	return 'just now';
}

export function foramtDateTime(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric', // Correct type for day
		month: 'long', // Correct type for month
		year: 'numeric', // Correct type for year
	};

	return date.toLocaleDateString('en-US', options);
}
