import PeopleStore from './peopleStore'
import TableStore from './tableStore'
import ViewStore from './viewStore'
import WorkPlacesStore from './workPlacesStore'

class RootStore {
  constructor() {
    this.peopleStore = new PeopleStore(this);
    this.peopleTableStore = new TableStore(this);
    this.viewStore = new ViewStore(this);
    this.workPlacesStore = new WorkPlacesStore(this);
    this.workPlacesTableStore = new TableStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;