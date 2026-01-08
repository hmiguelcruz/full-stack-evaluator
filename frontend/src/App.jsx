import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Tasks from './Tasks';

function App() {
  return (
    <UserProvider>
      <Layout>
        <Tasks />
      </Layout>
    </UserProvider>
  );
}

export default App;
