// const url = '/workPlaces';

/**
 * Функция для получения списка мест работы
 *
 * @returns {Promise<string>}
 */
export async function getWorkPlaces() {
	//return 'getWorkPlaces';
	return fetch("http://localhost:8080/camel/api/workplace", {
		method: "GET",
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		}
	})
		.then(function (response) {
			return response.json();
		})
		.catch(alert);
}

/**
 * Функция для получения места работы по id
 *
 * @param {Number} id - ид места работы
 * @returns {Promise<string>}
 */
export async function getWorkPlaceById(id) {
	return 'getWorkPlaceById';
	/*fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function ({results}) {
			return results;
		})
		.catch(alert);*/
}

/**
 * Функция для записи данных о месте работы
 *
 * @param {Number} id - ид места работы
 * @param newData новые данные
 * @returns {Promise<string>}
 */
export async function postWorkPlace(id, newData) {
	fetch("http://localhost:8080/camel/api/workplace",
		{
			method: "POST",
			mode: 'cors',
			body: JSON.stringify(newData),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		.then(function (results) {
			console.log(results);
			return results;
		})
		.catch(alert);
}

export function getWorkPlacesMock() {
	const tmpArr = [];
	tmpArr.push({
		lastName: 'TestF',
		firstName: 'TestI',
		workPlace: 'WP_1',
		address: 'Street_1'
	});
	tmpArr.push({
		lastName: 'TestF_2',
		firstName: 'TestI_2',
		workPlace: 'WP_2',
		address: 'Street_2'
	});
	tmpArr.push({
		lastName: 'TestF_3',
		firstName: 'TestI_3',
		workPlace: 'WP_3',
		address: 'Street_3'
	});
	return Promise.resolve(tmpArr);
}
