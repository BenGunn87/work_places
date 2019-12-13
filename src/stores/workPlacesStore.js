import { observable, action, decorate, computed } from 'mobx'
import  randomId  from 'random-id'
import {getWorkPlaceById, getWorkPlaces, getWorkPlacesMock, putWorkPlace} from '../model/workPlaces';


class WorkPlacesStore {
	constructor(rootStore) {
		this.fieldList = [
			{field: 'lastName', title: 'Фамилия'},
			{field: 'firstName', title: 'Имя'},
			{field: 'workPlace', title: 'Место работы'},
			{field: 'address', title: 'Адрес работы'}
			];
		this.rootstore = rootStore;
		this.workPlaces = [];
		this.selectedWorkPlace = {};
		this.loaded = false;
		this.fetchData();
	}

	get workPlacesCount() {
		return this.workPlaces.length;
	}

	fetchData = async () => {
		this.loaded = false;
		try {
			console.log(await getWorkPlaces());
			const workPlaces = await getWorkPlacesMock();
			this.putWorkPlaces(workPlaces.map(item => {
					const obj = {};
					this.fieldList.forEach(({field}) => obj[field] = item[field]);
					return obj;
				}
			));
		} finally {
			this.loaded = true;
		}
	};

	addKey = workPlace => {
		return {key: randomId(), ...workPlace};
	};

	putWorkPlaces = workPlaces => {
		const workPlacesArray = [];
		workPlaces.forEach(workPlace => {
			workPlacesArray.push(this.addKey(workPlace));
		});
		this.workPlaces = workPlacesArray;
	};

	delWorkPlace = (keys = []) => {
		this.workPlaces = this.workPlaces.filter(item => !keys.includes(item.key));
	};

	addWorkPlace = async (workPlace) => {
		this.workPlaces.unshift(this.addKey(workPlace));

		console.log(await putWorkPlace(1, workPlace));
		// await this.fetchData();
	};

	editWorkPlace = async (key, workPlace) => {
		const ind = this.getWorkPlaceIndByKey(key);
		this.workPlaces[ind] = workPlace;
		this.workPlaces[ind].key = key;

		console.log(await putWorkPlace(1, workPlace));

		// await this.fetchData();
	};

	getWorkPlaceIndByKey = sKey => {
		return this.workPlaces.findIndex(({key}) => key === sKey);
	};

	getWorkPlaceByKey = async (sKey) => {
		console.log(await getWorkPlaceById(1));
		this.selectedWorkPlace = this.workPlaces.find( ({key}) => (key === sKey));
	}
}

decorate(WorkPlacesStore, {
	workPlaces: observable,
	loaded: observable,
	workPlacesCount: computed,
	putWorkPlaces: action,
	delWorkPlace: action,
	addWorkPlace: action,
	editWorkPlace: action
});

export default WorkPlacesStore;