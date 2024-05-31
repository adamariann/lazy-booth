import { ChakraProvider } from "@chakra-ui/react";
import { DndContext } from "@dnd-kit/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./globalStyle.css";
import Landing from "./pages/Landing";
import Payment from "./pages/Payment";
import globalTheme from "./theme/globalTheme";
import MissingPage from "./pages/errors/MissingPage";
import Foto from "./pages/Foto";
import Edit from "./pages/Edit";

export const App = () => (
  <DndContext>
    <ChakraProvider theme={globalTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/foto" element={<Foto />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/*" element={<MissingPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </DndContext>
);
