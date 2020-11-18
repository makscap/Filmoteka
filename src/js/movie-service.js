//Example API Request
//https://api.themoviedb.org/3/movie/550?api_key=6914e86918040074e2fe382ba8e8cb5e

const API_KEY = 'bb47a995514a49758140b073ef1103f5';
const BASE_URL = 'https://developers.themoviedb.org/3';

export default async (name, page) => {
	try {
		const db = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
		return db.json();
	} catch (error) {
		return error;
	}
}

