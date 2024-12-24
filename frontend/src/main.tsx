import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider, SocketContextProvider } from "./context";
import { Provider } from "react-redux";
import store from "./app/store";
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthContextProvider>
      <SocketContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </Provider>
);
