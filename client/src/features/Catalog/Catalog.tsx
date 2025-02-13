import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync,setPageNumber, setProductParams } from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButttonGroup";
import CheckButtons from "../../app/components/CheckButtons";
import AppPagination from "../../app/components/AppPagination";
import useProducts from "../../app/hooks/useProducts";

const sortOptions = [
  {value:'name', label:'Alfabetycznie'},
  {value:'priceDesc', label:'Cena - Od najwyższej do najniższej'},
  {value:'price', label:'Cena - Od najniższej do najwyższej'},
]

export default function Catalog(){
  const {products,brands,types,filtersLoaded,productsLoaded,metaData} = useProducts();

    const {productParams} = useAppSelector(state=>state.catalog)
    const dispatch =  useAppDispatch();
    

  useEffect(()=>{
     if(!productsLoaded) dispatch(fetchProductsAsync());
     
  },[productsLoaded,dispatch])

  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters());
  },[dispatch,filtersLoaded])

  if(!filtersLoaded) return <LoadingComponent message="Czekaj...."/>


    return (
        <Grid container columnSpacing={4}>
          <Grid item xs={3}>
              <Paper sx={{mb:2}}>
                <ProductSearch/>
              </Paper>
              <Paper sx={{mb:2, p:2}}>
                <RadioButtonGroup
                  selectedValue={productParams.orderBy}
                  options={sortOptions}
                  onChange={ (e) => dispatch(setProductParams({orderBy: e.target.value}))}
                />
              </Paper>

              <Paper sx={{mb:2,p:2}}>
                 <CheckButtons
                  items={brands}
                  checked={productParams.brands}
                  onChange={(items:string[])=>dispatch(setProductParams({brands:items}))}
                 />
              </Paper>

              <Paper sx={{mb:2,p:2}}>
              <CheckButtons
                  items={types}
                  checked={productParams.types}
                  onChange={(items:string[])=>dispatch(setProductParams({types:items}))}
                 />
              </Paper>
          </Grid>
          <Grid item xs={9}>
            <ProductList products={products}></ProductList>  
          </Grid>

          <Grid item xs={3}></Grid>
          <Grid item xs={9} sx={{mb:2}}>
            {metaData &&
            <AppPagination
              metaData={metaData}
              onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
            />}
          </Grid>
                 
        </Grid>
    )
}