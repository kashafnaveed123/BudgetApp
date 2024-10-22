import React from "react";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Content from "./dashboard/Content";
import SalesRepresentation from './SideBar/Sale'
import Average from "./SideBar/Average";
import SalesmanMain from "./SideBar/Salesman/SalesmanMain";
import AddSalesman from "./SideBar/Salesman/AddSalesman";
import SalesmanSales from './SideBar/Salesman/SalesmanSales'
import SalesmanDetails from "./SideBar/Salesman/SalesmanDetails";
import Profit from "./SideBar/Profit";
import Loss from "./SideBar/Loss";
import Invoice from "./Invoice";
import WeeklyDetails from './SideBar/Salesman/WeeklyDetails'
import Stock from './SideBar/Stock'
import Expense from "./SideBar/Expense";
import './App.css'
import MonthlySales from "./SideBar/Salesman/MonthlyDetails";
function App() {
  return (
    <>
    <BrowserRouter>
   
    <Routes>
      <Route path="/" element={<Content />}/>
      <Route path="/SalesRepresentation" element={<SalesRepresentation/>}/>
      <Route path="/SalesmanMain" element={<SalesmanMain/>}/>
      <Route path="/SalesmanDetails" element={<SalesmanDetails/>}/>
      <Route path="/AddSalesman" element={<AddSalesman/>}/>
      <Route path="/SalesmanSales" element={<SalesmanSales/>}/>
      <Route path="/profit" element={<Profit/>}/>
      <Route path="/loss" element={<Loss/>}/>
      <Route path="/average" element={<Average/>}/>
      <Route path="/invoice" element={<Invoice/>}/>
      <Route path="/WeeklyDetails" element={<WeeklyDetails/>}/>
      <Route path="/MonthlySales" element={<MonthlySales/>}/>
      <Route path="/Stock" element={<Stock/>}/>
      <Route path="/Expense" element={<Expense/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
