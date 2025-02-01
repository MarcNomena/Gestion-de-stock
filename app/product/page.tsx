
"use client"
import { createClient } from '@/utils/supabase/client';
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import CustomPopover from '@/components/custom/popovercontent';
import { useEffect, useState,useCallback } from 'react';
import { PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';
import CustomPopoverInsertProduct from '@/components/custom/popoverInsertProducts';
import CustomPagination from '@/components/custom/CustomPagination';

import ResearchFields from '@/components/custom/ResearchFields';

interface SearchTask {
  text:string,
  field:string
  }
  

const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
  const [ProductCount,setProductCount]=useState<number|null>();
  const [page,setPage]=useState<number>(1);
  const [searchParams,setSearchParams]=useState<SearchTask>();
  const [resetPage,setResetPage]= useState<boolean>(false);

  const createSupabaseClient = useCallback(async () => {
    const supabase = await createClient();
    setSupabase(supabase);
   
  }, []);

  const incrementPage=(number:number)=>{
    setPage(number);
  }

  const getSearchParams=(value:SearchTask)=>{
    try{
      setSearchParams(value);
      setPage(1);
    //  console.log("search params :",value);
    }catch( error){
      console.log(value);
      alert(error)
    }
   
  }


  const countProduct = useCallback(async () => {
    if (!supabase) {
  //    console.error('Supabase client is not initialized');
      return;
    }
   // const { data, error } = await supabase.rpc('get_product_count');
   const { count, error } = await supabase
   .from('Product')
   .select('*', {
     head: true, // 👈 No data returned
     count: 'exact'
   });
   //console.log(count);

      if(count){
     //  console.log(data);
       setProductCount(count);
      }
      if(error){
        console.log(error);
      }

  },[supabase]);

  const fetchProducts = useCallback(async (searchParameter:SearchTask| undefined) => {
    try{
          if (!supabase) {      
            throw "Supabase client is not initialized";
          }
          
        
          
       let query =  supabase
            .from('Product')
            .select(`id,name,description,price,unit,Category(name)`,{count:'exact'})            


            
            let from = (page -1)*5;
            let to = (page*5)-1 ; 

            if(searchParameter){
              query=query.ilike(searchParameter.field,`%${searchParameter.text}%`);
            }
    
            const { data: productlist, error ,count} = await query.range(from,to) 

            if (productlist) {
                setResetPage(true);
                setProductCount(count);
                setProducts(productlist);
              }
      
          if (error) {
            console.error('Error fetching data:', error);
            throw (error);
          }

    }catch(error){
        alert(error);
    }
   
  }, [supabase,page]);

  useEffect(() => {
 
    if (supabase) {
      countProduct();
    }
  }, [supabase, countProduct]);

  useEffect(() => {
 
    if (supabase) {
      fetchProducts(searchParams);
    }
  }, [supabase, fetchProducts,searchParams]);

  useEffect(() => {

    const initializeAndFetch = async () => {
      await createSupabaseClient();
    };

    initializeAndFetch();
  }, [createSupabaseClient]);



  return (
    <div>

    <ResearchFields SendSearchParams={getSearchParams}/>
   
      <br/>
       <Table >
       <TableCaption> {supabase && <CustomPopoverInsertProduct  supabase={supabase} rehydrateProducts={fetchProducts}/>} </TableCaption>
       <TableHeader>
         <TableRow>
           <TableHead className="w-[100px]">Name</TableHead>
           <TableHead>Category</TableHead>
           <TableHead className="text-left">Description</TableHead>
           <TableHead className="text-right">Price $</TableHead>
           <TableHead className="text-right">Unit</TableHead>
           <TableHead className="text-right">Action</TableHead>
         </TableRow>
       </TableHeader>
       <TableBody>
       {products != null && products.map((item, index) => (  
         <TableRow key={index}>
           <TableCell className="font-medium">{item.name}</TableCell>
           <TableCell>{item.Category.name}</TableCell>
           <TableCell className="text-left">{item.description}</TableCell>
           <TableCell className="text-right">${item.price}</TableCell>
           <TableCell className="text-right">{item.unit}</TableCell>
           <TableCell className="text-right" style={{margin: "3px !important"}}>
              {supabase && <CustomPopover product={item} supabase={supabase} rehydrateProducts={fetchProducts}/>}     
                      
             </TableCell>
         </TableRow>
          ))}
       </TableBody>
     </Table>
   <CustomPagination productLength={ProductCount} handleChangePage={incrementPage} ParentPage={page}/>

      
    </div>
  

    );
}

export default ProductPage;
