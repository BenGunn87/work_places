const url = '/phoneBook';

export function getPhoneBook() {
	return fetch(url)
		.then(function (response) {
			return response.json();
		})
		.then(function ({results}) {
			return results;
		})
		.catch(alert);
}

export function getPhoneBookMock() {
	const tmpArr = [];
	tmpArr.push({
		lastName: 'TestF',
		firstName: 'TestI',
		workPhone: '888-888-88-88',
		mobilePhone: '888-666-66-66',
		mail: 'ggg@mail.ru',
		birthDate: '01.01.1950',
	});
	tmpArr.push({
		lastName: 'TestF_2',
		firstName: 'TestI_2',
		workPhone: '777-777-77-77',
		mobilePhone: '777-666-66-66',
		mail: 'aaa@mail.ru',
		birthDate: '01.01.1960',
	});
	tmpArr.push({
		lastName: 'TestF_3',
		firstName: 'TestI_3',
		workPhone: '666-666-66-66',
		mobilePhone: '666-666-66-66',
		mail: 'bbb@mail.ru',
		birthDate: '01.01.1970',
	});
	return Promise.resolve(tmpArr);
}
