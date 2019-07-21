import {observable, action, decorate, computed} from 'mobx'

class TableStore {
  searchText = '';
  searchIndex = '';
  selectedRowKeys = [];
  constructor(rootstore) {
    this.rootstore = rootstore;
  };
  get isSelected() {
    return this.selectedRowKeys.length !== 0;
  };
  setSearchData = (searchText, searchIndex) => {
    this.searchText = searchText;
    this.searchIndex = searchIndex;
  };
  setSelectedRowKeys = selectedRowKeys => {
    this.selectedRowKeys = selectedRowKeys
  }
}

decorate(TableStore, {
  searchText: observable,
  searchIndex: observable,
  selectedRowKeys: observable,
  isSelected: computed,
  setSearchData: action,
  setSelectedRowKeys: action
});

export default TableStore;