import { observable, action, decorate, computed } from 'mobx'
import  randomId  from 'random-id'
import {clearPhoneBookRecordFile, getPhoneBook, postPhoneBook, sendPhoneBookRecord} from '../model/phoneBook';

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
		this.fileName = '';
		this.loaded = false;
		this.fetchData();
	}

	get phoneBookRecordsCount() {
		return this.phoneBookRecords.length;
	}

	fetchData = async () => {
		this.loaded = false;
		try {
			const phoneBookRecords = await getPhoneBook();
			this.putPhoneBook(phoneBookRecords.map(item => {
					const obj = {};
					this.fieldList.forEach(({field}) => obj[field] = item[field]);
					return obj;
				}
			));
		} finally {
			this.loaded = true;
		}
	};

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

	addPhoneBookRecord = async (phoneBookRecord) => {
		let postResult = await postPhoneBook(1, phoneBookRecord);
		this.fileName = postResult.fileName;
	};

	sendPhoneBookRecord = async () => {
		await sendPhoneBookRecord(this.fileName);
		this.setFileName('');
	};

	clearPhoneBookRecordFile = async () => {
		await clearPhoneBookRecordFile(this.fileName);
		this.setFileName('');
	};

	setFileName = (fileName) => {
		this.fileName = fileName;
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
	fileName: observable,
	phoneBookRecordsCount: computed,
	putPhoneBook: action,
	delPhoneBookRecords: action,
	addPhoneBookRecord: action,
	editPhoneBookRecord: action,
	setFileName: action,
});

export default PhoneBookStore;