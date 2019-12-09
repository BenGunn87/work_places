import React from 'react'
import { Layout } from 'antd'
import { Route, Switch } from 'react-router-dom'
import { observer } from "mobx-react";
import MainMenu from './components/MainMenu'
import EditWorkPlaceFormContainer from "./components/EditWorkPlaceForm"
import {WorkPlacesView} from './views/WorkPlacesView';
import {PhoneBookView} from './views/PhoneBookView';

import './App.css';
import EditPhoneBookRecordFormContainer from './components/EditPhoneBookRecordForm';


const { Sider, Content } = Layout;

function App() {
  return (
    <div>
      <EditWorkPlaceFormContainer/>
      <EditPhoneBookRecordFormContainer/>
      <Layout className="layout">
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}>
          <MainMenu />
        </Sider>
        <Layout style={{ marginLeft: 200,  height: '100vh' }}>
          <Content style={{ padding: '0 50px' }}>
            <Switch>
              <Route path="/phoneBook" component={PhoneBookView} />
              <Route path="/" component={WorkPlacesView} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
observer(App);

export default App;
