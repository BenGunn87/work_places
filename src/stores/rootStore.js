import PeopleStore from './peopleStore'
import TableStore from './tableStore'
import ViewStore from './viewStore'

class RootStore {
  constructor() {
    this.peopleStore = new PeopleStore(this);
    this.peopleTableStore = new TableStore(this);
    this.viewStore = new ViewStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;