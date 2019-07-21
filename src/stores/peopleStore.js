import { observable, action, decorate, computed } from 'mobx'
import  randomId  from 'random-id'
import { getPeople } from '../model/people'

class PeopleStore {
  constructor(rootstore) {
    this.fieldList = ['name', 'gender', 'height', 'mass'];
    this.rootstore = rootstore;
    this.people = [];
    this.loaded = false;
    this.fetch();
  }
  get peopleCount() {
    return this.people.length;
  }
  fetch() {
    this.loaded = false;
    getPeople()
      .then(people => {
        this.putPeople(people.map( item => {
          const obj = {};
            this.fieldList.forEach(field => obj[field] = item[field]);
            return obj;
          }
        ));
        this.loaded = true;
      });
  }
  addKey = man => {
    return {key: randomId(), ...man};
  };
  putPeople = people => {
    const peopleArray = [];
    people.forEach(man => {
      peopleArray.push(this.addKey(man));
    });
    this.people = peopleArray;
  };
  delPeople = keys => {
    this.people = this.people.filter(item => keys.indexOf(item.key) === -1);
  };
  addMan = man => {
    this.people.unshift(this.addKey(man));
  };
  editMan = (key, man) => {
    const ind = this.getManIndByKey(key);
    this.people[ind] = man;
    this.people[ind].key = key;
  };
  getManIndByKey = key => {
    for (let i = 0; i < this.people.length; i++) {
      if (this.people[i].key === key) return i;
    }
    return -1;
  };
  getManByKey = sKey => {
    return this.people.filter( ({key}) => (key === sKey))[0];
  }
}
decorate(PeopleStore, {
  people: observable,
  loaded: observable,
  peopleCount: computed,
  putPeople: action,
  addMan: action,
  editMan: action,
  delPeople: action
});

export default PeopleStore;