import React from 'react'
import { Table, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words';
import { observer } from 'mobx-react'

class SearchableTable extends React.Component {
  constructor(props){
    super(props);
    this.tableStore = props.tableStore;
  }
  onSelectChange = selectedRowKeys => {
    this.tableStore.setSelectedRowKeys(selectedRowKeys);
  };
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text, record, index) => {
      if (text === record[this.tableStore.searchIndex]) {
        return <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[this.tableStore.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      }
      return text;
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.tableStore.setSearchData(selectedKeys[0], dataIndex);
    this.tableStore.setSelectedRowKeys([]);
  };

  handleReset = clearFilters => {
    clearFilters();
    this.tableStore.setSearchData('', '');
  };

  render() {
    const { selectedRowKeys } = this.tableStore;
    const rowSelection = {
      selectedRowKeys,
      hideDefaultSelections: true,
      onChange: this.onSelectChange,
    };

    let {columns, searchFields, ...restProps} = this.props;
    columns = columns.map((item, ind) => {
      if (searchFields.indexOf(ind) !== -1) {
        return {
          ...item,
          ...this.getColumnSearchProps(item.key)
        }
      }
      return {...item}
    });
    return (
      <Table columns = {columns} rowSelection={rowSelection} {...restProps} />
    );
  }
}

observer(SearchableTable);

export default SearchableTable;