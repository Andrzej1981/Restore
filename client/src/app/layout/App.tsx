import { useEffect, useState } from "react"
import { Product } from "../models/product";
import Catalog from "../../features/Catalog/Catalog";
import { Container, CssBaseline } from "@mui/material";
import Header from "./Header";

function App() {

  const[products, setProducts]= useState<Product[]>([]);

  useEffect(()=>{
      fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data=>setProducts(data))
  },[])

  function addProduct(){
    setProducts(prevstate=>[...prevstate,
      { id: prevstate.length+101,
        name:'product'+(prevstate.length)+1,
        price:(prevstate.length*100)+100,
        description: '(prevstate.length*100)+100',
        pictureUrl: 'aa',
        type: '',
        brand: '',
        quantityInStock: 5
      }
      ])
  }

  return (
    <>
      <CssBaseline></CssBaseline>
      <Header/>
      <Container>
         <Catalog products={products} addProduct={addProduct}></Catalog>
      </Container>
      
    
    </>
  )
}

export default App
