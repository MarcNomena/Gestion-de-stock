import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import React, { useState,useRef, FormEvent } from 'react';
import { Button } from "@/components/ui/button"

interface SearchTask {
text:string,
field:string
}

const ResearchFields =({SendSearchParams}:any)=>{

    const text=useRef<HTMLInputElement>(null);
    const field=useRef<HTMLSelectElement>(null);
    const unit = useRef<HTMLInputElement>(null);


    const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(text.current ){
            //console.log("field :",field);

            const searchParameter : SearchTask ={
                text:text?.current?.value,
                field:field?.current?.value??''
            }

            SendSearchParams(searchParameter);
        }
        
    }


        return (
            <div>
            <div className="space-y-1" style={{marginLeft:"100px"}}>
                <h4 className="text-sm font-medium leading-none">Simple Search Here!!</h4>
                <p className="text-sm text-muted-foreground">
                
                </p>
                </div>
                    <Separator className="my-4" />
                <form onSubmit={handleSubmit}>

                <div className="flex h-5 items-center space-x-4 text-sm">
                    <div></div>
                        <Separator orientation="vertical" />
                    <div>  <Button><Search /> </Button> </div>
                        <Separator orientation="vertical" />
                    <div>  <Input type="text" placeholder="..."  ref={text}/></div>
                    <Separator orientation="vertical" />
                    <div> 
                        <select name="field" ref={field}>
                            <option value="name">
                                name
                            </option>
                            <option value="description">
                                description
                            </option>
                            <option value="unit">
                                unit
                            </option>
                        </select>
                    </div>
                </div>
                </form>

            </div>
        );
}

export default ResearchFields;

