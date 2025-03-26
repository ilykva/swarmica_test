import {DataProvider} from "./DataProvider";
import {Layout} from './components/Layout';
import {Search} from "./components/Search";
import {Articles} from './components/Articles';

function App() {
  return (
    <DataProvider>
      <Layout>
       <Search />
       <Articles/>
      </Layout>
    </DataProvider>
  )
}

export default App
