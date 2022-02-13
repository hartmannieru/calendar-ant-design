import {Routes, Route, Navigate} from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../router';

const AppRouter = () => {
  const { isAuth } = useTypedSelector(state => state.auth);

  return (
    isAuth
    ?
      <Routes>
        {
          privateRoutes.map(({path, component: Component}, index) => 
            <Route path={path} element={<Component />} key={index} />
          )
        }
        <Route path='*' element={<Navigate replace to={RouteNames.CALENDAR} />} />
      </Routes>
    :
      <Routes>
        {
          publicRoutes.map(({path, component: Component}, index) => 
            <Route path={path} element={<Component />} key={index} />
          )
        }
        <Route path='*' element={<Navigate replace to={RouteNames.LOGIN} />} />
      </Routes>
   
  );
};

export default AppRouter;