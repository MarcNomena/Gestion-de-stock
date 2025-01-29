
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";

  
import { ArrowUpFromLine, BadgePlus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage,useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Description } from "@radix-ui/react-toast";
import CustomFields from "./CustomFields";
import { SupabaseClient } from '@supabase/supabase-js';
import { useCallback, useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

export interface Category {
  id: string;
  name: string;
}

const jsonString = '[{"id": "123", "name": "John Doe" },{{"id": "1234", "name": "test"}]';

const CustomPopoverInsertProduct =  ({ supabase,rehydrateProducts }: {supabase: SupabaseClient,rehydrateProducts:Function}) =>  {
    const [submitted,setSumbitted]=useState<boolean>(false);
    const [Category,setCategory]=useState<Category[]>([]);

      const fetchCategory = useCallback(async () => {
    
        if (!supabase) {
          console.error('Supabase client is not initialized');
          return;
        }
        const { data: data, error } = await supabase
          .from('Category')
          .select(`id,name`);
    
        if (data) {
          setCategory(data);
          console.log(data);
        }
    
        if (error) {
          console.error('Error fetching data:', error);
        }
      }, [supabase]);

      useEffect(() => {
        if(supabase){
            fetchCategory();
        }
    }, [supabase,fetchCategory]);

    const formikValdiationSchema = 
        Yup.object().shape({
          name: Yup.string()
            .min(3, 'Must be 3 characters or above')
            .required('Required'),
          description: Yup.string()
            .min(3, 'Must be 3 characters or less')
            .max(1000,'Must be less than 1000 characters'),
          price: Yup.number()
            .min(1, 'Must be 1 or above')
            .required('Required'),
        unit: Yup.string()
            .max(300, 'Must be less than 300 characters')
            .max(1000,'Must be less than 1000 characters'),
        });

        const insertProductIntoDatabase=async (value:any) =>{
            
          const { error } = await supabase
            .from('Product')
            .insert({  name: value.name,description :value.description,price:value.price,unit:value.unit}) ;

            if (error) {
              console.error('Error inserting data:', error);
            }
           
            setSumbitted(true);
            rehydrateProducts();

            setTimeout(() => {
              setSumbitted(false);
            }, 2000);
        }


  
    return (
        <div>
<div className="flex justify-center">
     
<div> <Popover>
        <PopoverTrigger asChild>
          <Button > Create<BadgePlus  /> </Button>
      </PopoverTrigger>               
      <PopoverContent className="w-100 max-h-80 overflow-y-auto">
      <Formik
       initialValues={{ name: '', description: '', price: 0, unit: ''}}
       onSubmit={(values, actions) => {
        console.log(values);
        /* setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);*/
         insertProductIntoDatabase(values);

       }}
       validationSchema={formikValdiationSchema}
     >
       {props => (
         <form onSubmit={props.handleSubmit}>
            <CustomFields label="Name" name="name" type="text" placeholder="Name"/>
            <CustomFields label="Description" name="description" type="text" placeholder="Description"/>
            <CustomFields label="Price" name="price" type="number" placeholder="Price"/>
            <CustomFields label="unit" name="unit" type="text" placeholder="Unit"/>
            <CustomSelect label="Category" name="category" option ={jsonString} />
                <Button type="submit">Submit {submitted && <ArrowUpFromLine />}</Button>                                    
         </form>
       )}
     </Formik>
      </PopoverContent>
    </Popover>
     
</div>
 </div>
               
        </div>
    );
}

export default CustomPopoverInsertProduct;