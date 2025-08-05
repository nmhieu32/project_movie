import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
