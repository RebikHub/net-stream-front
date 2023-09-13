import { BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h3>Header</h3>
          </header>
          <Home />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
