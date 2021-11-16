import React, { FC } from 'react';
import { Layout, Menu, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../router';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import { useDispatch } from 'react-redux';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
  const router = useHistory();
  const { isAuth, user } = useTypedSelector(state => state.auth);
  const {logout} = useActions();

  return (
    <div>
      <Layout.Header>
        <Row justify="end">
          {
            isAuth
            ? 
              <>
                <span style={{color: "#ffffff"}}>{user.username}</span>
                <Menu theme="dark" mode="horizontal" selectable={false}>
                  <Menu.Item onClick={() => logout()} key={1}>Выйти</Menu.Item>
                </Menu>
              </>
            :
              <Menu theme="dark" mode="horizontal" selectable={false}>
                <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={1}>Логин</Menu.Item>
              </Menu>
          }
        </Row>
      </Layout.Header>
    </div>
  );
};

export default Navbar;