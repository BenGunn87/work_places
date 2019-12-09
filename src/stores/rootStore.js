import TableStore from './tableStore'
import ViewStore from './viewStore'
import WorkPlacesStore from './workPlacesStore'
import PhoneBookStore from './phoneBookStore';

class RootStore {
  constructor() {
    this.viewStore = new ViewStore(this);
    this.workPlacesStore = new WorkPlacesStore(this);
    this.workPlacesTableStore = new TableStore(this);
    this.phoneBookStore = new PhoneBookStore(this);
    this.phoneBookTableStore = new TableStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;