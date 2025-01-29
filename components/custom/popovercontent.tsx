
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { ArrowUpFromLine, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage,useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Description } from "@radix-ui/react-toast";
import CustomFields from "./CustomFields";
import { SupabaseClient } from '@supabase/supabase-js';
import { useState } from "react";


const CustomPopover =  ({ product,supabase,rehydrateProducts }: { product: any,supabase: SupabaseClient,rehydrateProducts:Function}) =>  {
    const [submitted,setSumbitted]=useState<boolean>(false);

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

        const updateProductDatabase=async (value:any) =>{
            const {  error } = await supabase
            .from('Product')
            .update({ name: value.name,description :value.description,price:value.price,unit:value.unit}) 
            .match({ id: product.id });
            if (error) {
              console.error('Error updating data:', error);

            }
            setSumbitted(true);
            rehydrateProducts();

            setTimeout(() => {
              setSumbitted(false);
            }, 2000);
        }

        const deleteProductDatabase=async () =>{
            const {  error } = await supabase
            .from('Product')
            .delete() 
            .match({ id: product.id });
            if (error) {
                console.error('Error deleting data:', error);
            }
            rehydrateProducts();
        }
  
    return (
        <div>
<div className="flex justify-end">

<div> <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline"><Edit />Edit </Button>
      </PopoverTrigger>               
      <PopoverContent className="w-80">
      <Formik
       initialValues={{ name: product.name, description: product.description, price: product.price, unit: product.unit }}
       onSubmit={(values, actions) => {
        console.log(values);
        /* setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);*/
         updateProductDatabase(values);

       }}
       validationSchema={formikValdiationSchema}
     >
       {props => (
         <form onSubmit={props.handleSubmit}>
            <CustomFields label="Name" name="name" type="text" placeholder="Name"/>
            <CustomFields label="Description" name="description" type="text" placeholder="Description"/>
            <CustomFields label="Price" name="price" type="number" placeholder="Price"/>
            <CustomFields label="unit" name="unit" type="text" placeholder="Unit"/>
           
                <Button type="submit">Submit {submitted && <ArrowUpFromLine />}</Button>
                       
                
         
         </form>
       )}
     </Formik>
      </PopoverContent>
    </Popover>
     
</div>
&nbsp;
<div style={{margin: "3px !important"}} >   <Button variant="destructive" onClick={deleteProductDatabase} >Delete</Button></div>
  
 </div>
               
        </div>
    );
}

export default CustomPopover;