import { observable, action, decorate } from 'mobx'

class ViewStore {
  visibleEditWorkPlaceForm = false;
  visibleEditPhoneBookRecordForm = false;
  key = '';
  constructor(rootstore) {
    this.rootstore = rootstore;
  };
  toggleVisibleEditForm = (form) => {
    this[form] = !this[form];
  }
}

decorate(ViewStore, {
  visibleEditWorkPlaceForm: observable,
  visibleEditPhoneBookRecordForm: observable,
  toggleVisibleEditForm: action
});

export default ViewStore;