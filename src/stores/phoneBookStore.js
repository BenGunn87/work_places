import { observable, action, decorate, computed } from 'mobx'
import  randomId  from 'random-id'
import {getPhoneBookMock} from '../model/phoneBook';


class PhoneBookStore {
	constructor(rootStore) {
		this.fieldList = [
			{field: 'lastName', title: 'Фамилия'},
			{field: 'firstName', title: 'Имя'},
			{field: 'workPhone', title: 'Рабочий телефон'},
			{field: 'mobilePhone', title: 'Мобильный телефон'},
			{field: 'mail', title: 'e-mail'},
			{field: 'birthDate', title: 'Дата рождения'}
		];
		this.rootstore = rootStore;
		this.phoneBookRecords = [];
		this.loaded = false;
		this.fetchData();
	}

	get phoneBookRecordsCount() {
		return this.phoneBookRecords.length;
	}

	fetchData() {
		this.loaded = false;
		getPhoneBookMock()
			.then(phoneBookRecords => {
				this.putPhoneBook(phoneBookRecords.map( item => {
						const obj = {};
						this.fieldList.forEach(({field}) => obj[field] = item[field]);
						return obj;
					}
				));
				this.loaded = true;
			});
	}

	addKey = phoneBookRecords => {
		return {key: randomId(), ...phoneBookRecords};
	};

	putPhoneBook = phoneBookRecords => {
		const phoneBookRecordsArray = [];
		phoneBookRecords.forEach(record => {
			phoneBookRecordsArray.push(this.addKey(record));
		});
		this.phoneBookRecords = phoneBookRecordsArray;
	};

	delPhoneBookRecords = (keys = []) => {
		this.phoneBookRecords = this.phoneBookRecords.filter(item => !keys.includes(item.key));
	};

	addPhoneBookRecord = phoneBookRecord => {
		this.phoneBookRecords.unshift(this.addKey(phoneBookRecord));
	};

	editPhoneBookRecord = (key, phoneBookRecord) => {
		const ind = this.getPhoneBookRecordIndByKey(key);
		this.phoneBookRecords[ind] = phoneBookRecord;
		this.phoneBookRecords[ind].key = key;
	};

	getPhoneBookRecordIndByKey = key => {
		this.phoneBookRecords.findIndex(item => item.key === key);
	};

	getPhoneBookRecordByKey = sKey => {
		return this.phoneBookRecords.find( ({key}) => (key === sKey));
	}
}

decorate(PhoneBookStore, {
	phoneBookRecords: observable,
	loaded: observable,
	phoneBookRecordsCount: computed,
	putPhoneBook: action,
	delPhoneBookRecords: action,
	addPhoneBookRecord: action,
	editPhoneBookRecord: action
});

export default PhoneBookStore;