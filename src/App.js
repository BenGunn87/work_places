import React from 'react'
import MainMenu from './components/MainMenu'
import CardList from "./views/CardList"
import PeopleTable from "./views/PeopleTable"
import { Layout } from 'antd'
import { Route, Switch } from 'react-router-dom'
import './App.css';

const { Sider, Content } = Layout;

function App() {
  return (
    <div>
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
              <Route path="/cardlist" component={CardList} />
              <Route path="/" component={PeopleTable} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
