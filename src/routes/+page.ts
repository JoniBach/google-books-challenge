import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		return { loading: false };
	} catch (err) {
		console.log(err);
		return null;
	}
};
