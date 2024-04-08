import { Provider } from 'react-redux';
import store from './store';
import Feeds from './pages/feeds';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <Feeds />
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
