import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

interface CustomFieldsProps {
    label: string;
    [key: string]: any;
}

const CustomFields = ({ label, ...props }: CustomFieldsProps) => {
    const [field, meta] = useField(props) ;
  
    return (
        <div>
            <div className="grid w-full max-w-sm items-center gap-1.5" style={{marginBlock:"10px"}}>
                <Label htmlFor="Name">{label} </Label>
                <Input {...field} {...props} className={meta.touched && meta.error ? "input-error":""} />
                {meta.touched && meta.error && <div className="input-error" style={{color:"red",content:"justify"}}>{meta.error} </div>}
            </div>
        </div>
    );
}
export default CustomFields;