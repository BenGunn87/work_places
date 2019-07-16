import React from 'react'
import { observer } from 'mobx-react'
import { Table, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words';

class MyTable extends React.Component {
  state = {
    searchText: '',
    searchIndex: ''
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
      if (text === record[this.state.searchIndex]) {
        return <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      }
      return text;
    },
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText : selectedKeys[0],
      searchIndex: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({
      searchText : '',
      searchIndex: ''
    });
  };

  render() {
    const { people, loaded } = this.props.store;
    //const columns =
    if (loaded) {
      const columns = [];
      for (let key in people[0]) {
        if (people[0].hasOwnProperty(key)) {
          columns.push({
            title: key,
            dataIndex: key,
            key: key,
            ...this.getColumnSearchProps(key),
          });
        }
      }
      return (
        <Table dataSource={people} columns={columns}/>
      );
    } else {
      return (
        <div>Загрузка</div>
      );
    }
  }
}

observer(MyTable);

export default MyTable;