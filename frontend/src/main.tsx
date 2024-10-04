import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </AuthContextProvider>
);
