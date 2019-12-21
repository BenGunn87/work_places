
export async function getPhoneBook() {
	return fetch('http://localhost:8080/camel/api/person', {
		method: 'GET',
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

export async function postPhoneBook(id, newData) {
	return fetch("http://localhost:8080/camel/api/person/to-file",
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

export async function sendPhoneBookRecord(fileName) {
	fetch("http://localhost:8080/camel/api/person/to-work",
		{
			method: "POST",
			mode: 'cors',
			body: JSON.stringify(fileName),
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

export async function clearPhoneBookRecordFile(fileName) {
	fetch("http://localhost:8080/camel/api/person/clear-file",
		{
			method: "POST",
			mode: 'cors',
			body: JSON.stringify(fileName),
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
