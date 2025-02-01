import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect, useState } from "react";

interface CustomFieldsProps {
    label: string;
    [key: string]: any;
}

interface Category {
    id: string;
    name: string;
}

const CustomSelect = ({ label, ...props }: CustomFieldsProps) => {
    const [field, meta] = useField(props);
    const [category,setCategory]=useState<Category[]>([]);

    const list=[{id:'1',name:'test'},{id:'2',name:'aha'},]

  
    return (
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5" style={{marginBlock:"10px"}}>
                <Label htmlFor="Name">{label} </Label>
                <select  {...field} {...props}>
              
                </select>


                {meta.touched && meta.error && <div className="input-error" style={{color:"red",content:"justify"}}>{meta.error} </div>}
            </div>
            </div>
          
    );
}
export default CustomSelect;