import { observable, action, decorate } from 'mobx'

class ViewStore {
  visibleEditForm = false;
  key = '';
  constructor(rootstore) {
    this.rootstore = rootstore;
  };
  toggleVisibleEditForm = () => {
    return this.visibleEditForm = !this.visibleEditForm;
  }
}

decorate(ViewStore, {
  visibleEditForm: observable,
  toggleVisibleEditForm: action
});

export default ViewStore;