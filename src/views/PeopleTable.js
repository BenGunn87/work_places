import React from 'react'
import peopleStore from '../stores/people-store'
import MyTable from "../components/MyTable"

class PeopleTable extends React.Component {
  render() {
    return <MyTable store={peopleStore}/>;
  }
}

export default PeopleTable;
