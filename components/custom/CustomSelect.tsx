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

interface CustomFieldsProps {
    label: string;
    option: string;
    [key: string]: any;
}

interface Product {
    id: string;
    name: string;
}

const CustomSelect = ({ label,option, ...props }: CustomFieldsProps) => {
    const [field, meta] = useField(props);
    const person = ["light","dark","system"];
   // const parsedOptions = JSON.parse(option);

  //  console.log(parsedOptions);
  
    return (
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5" style={{marginBlock:"10px"}}>
                <Label htmlFor="Name">{label} </Label>

                <Select {...field} {...props} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {option && person.map((item :any, index:number) => (
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))}
                         
                        
                    </SelectContent>
                </Select>

                {meta.touched && meta.error && <div className="input-error" style={{color:"red",content:"justify"}}>{meta.error} </div>}
            </div>
        </div>
    );
}
export default CustomSelect;