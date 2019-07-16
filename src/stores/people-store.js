import { observable, action, decorate } from 'mobx'
import { getPeople } from '../model/people'

class PeopleStore {
  constructor() {
    this.people = [];
    this.loaded = false;
    this.fetch();
  }

  fetch() {
    this.loaded = false;
    getPeople()
      .then(people => {
        this.putPeople(people);
        this.loaded = true;
      });
  }

  putPeople(people) {
    let peopleArray = [];
    people.forEach(man => {
      peopleArray.push({
        name: man.name,
        birth_year: man.birth_year,
        gender: man.gender
      });
    });
    this.people = peopleArray;
  }
}
decorate(PeopleStore, {
  people: observable,
  loaded: observable,
  putPeople: action
});

const peopleStore = new PeopleStore();
export default peopleStore;
export { PeopleStore };