const url = '/workPlaces';

export function getWorkPlaces() {
	return fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function ({results}) {
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

/*
export function getWorkPlacesMock() {
	const tmpArr = [];
	tmpArr.push({
		lastname: 'TestF',
		firstname: 'TestI',
		workphone: '888-888-88-88',
		mobilephone: '888-666-66-66',
		mail: 'ggg@mail.ru',
		birthdate: '01.01.1950',
	});
	tmpArr.push({
		lastname: 'TestF_2',
		firstname: 'TestI_2',
		workphone: '777-777-77-77',
		mobilephone: '777-666-66-66',
		mail: 'aaa@mail.ru',
		birthdate: '01.01.1960',
	});
	tmpArr.push({
		lastname: 'TestF_3',
		firstname: 'TestI_3',
		workphone: '666-666-66-66',
		mobilephone: '666-666-66-66',
		mail: 'bbb@mail.ru',
		birthdate: '01.01.1970',
	});
	return Promise.resolve(tmpArr);
}*/
