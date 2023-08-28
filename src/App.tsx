import { Home } from "./pages/Home";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h3>Header</h3>
        </header>
        <Home />
      </div>
    </QueryClientProvider>
  );
}

export default App;
