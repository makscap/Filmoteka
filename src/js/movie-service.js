//Example API Request
//https://api.themoviedb.org/3/movie/550?api_key=6914e86918040074e2fe382ba8e8cb5e

const API_KEY = 'b4c2f63def68e49abedf5a34ac5e443b';
const BASE_URL = 'https://developers.themoviedb.org/3';

export default async (name, page) => {
	try {
		const db = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`);
		return db.json();
	} catch (error) {
		return error;
	}
}

