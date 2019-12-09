import { observable, action, decorate, computed } from 'mobx'
import  randomId  from 'random-id'
import {getWorkPlacesMock} from '../model/workPlaces';


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
		this.loaded = false;
		this.fetchData();
	}

	get workPlacesCount() {
		return this.workPlaces.length;
	}

	fetchData() {
		this.loaded = false;
		getWorkPlacesMock()
			.then(workPlaces => {
				this.putWorkPlaces(workPlaces.map( item => {
						const obj = {};
						this.fieldList.forEach(({field}) => obj[field] = item[field]);
						return obj;
					}
				));
				this.loaded = true;
			});
	}

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

	addWorkPlace = workPlace => {
		this.workPlaces.unshift(this.addKey(workPlace));
	};

	editWorkPlace = (key, workPlace) => {
		const ind = this.getWorkPlaceIndByKey(key);
		this.people[ind] = workPlace;
		this.people[ind].key = key;
	};

	getWorkPlaceIndByKey = key => {
		this.workPlaces.findIndex(item => item.key === key);
	};

	getWorkPlaceByKey = sKey => {
		return this.workPlaces.find( ({key}) => (key === sKey));
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