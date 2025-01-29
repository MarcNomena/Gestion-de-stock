
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
import { SupabaseClient } from '@supabase/supabase-js';
import PopoverInsertProducts from '@/components/custom/popoverInsertProducts';
import CustomPopoverInsertProduct from '@/components/custom/popoverInsertProducts';


const ProductPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null);

  const createSupabaseClient = useCallback(async () => {
    const supabase = await createClient();
    setSupabase(supabase);
   
  }, []);

  const fetchProducts = useCallback(async () => {

    if (!supabase) {
      console.error('Supabase client is not initialized');
      return;
    }
    const { data: productlist, error } = await supabase
      .from('Product')
      .select(`id,name,description,price,unit,Category(name)`);

    if (productlist) {
      setProducts(productlist);
     console.log(productlist);
    }

    if (error) {
      console.error('Error fetching data:', error);
    }
  }, [supabase]);

  useEffect(() => {
 
    if (supabase) {
      fetchProducts();
    }
  }, [supabase, fetchProducts]);

  useEffect(() => {

    const initializeAndFetch = async () => {
      await createSupabaseClient();
    };

    initializeAndFetch();
  }, [createSupabaseClient]);



  return (
    <div>


      
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
     
       
      
    </div>
  

    );
}

export default ProductPage;
