import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routes from './config/routes';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import { store } from './redux/slices/store';

// The brain. The dashboard of our car. This handles it all
function App() {
  
  return (
    <BrowserRouter>
      <Navbar />  
        <Provider store={store}>
          <Routes>
            { routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={
                  route.protected ? (
                    <route.component />
                  ) : (
                    <route.component/>
                  )
                }
                />
            )) }
          </Routes>
        </Provider>
    </BrowserRouter>
  )
}

export default App

