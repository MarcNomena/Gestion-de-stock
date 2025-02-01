"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserContext, UserProvider } from "../protected/context"
import { useCallback, useEffect, useState } from "react"
import { SupabaseClient, User } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client";
import { useUser } from "@/app/protected/context";

export default function Page ({ children }: { children: React.ReactNode }){
  
    const {setUser}=useUser();
    const [supabase, setSupabase] = useState<SupabaseClient | null>(null);
    const createSupabaseClient = useCallback(async () => {
    const supabase = await createClient();
    setSupabase(supabase);  
  }, []);



    useEffect(() => {
  
      const initializeAndFetch = async () => {
        await createSupabaseClient();
      };
  
      initializeAndFetch();
    }, [createSupabaseClient]);

    useEffect(()=>{
        const getUser = async () =>{
         const userSigned= await supabase?.auth.getUser();
         const value=userSigned?.data.user;
          
        
         setUser(value);
        };
        getUser();
    },[supabase])

  return (
    <div>
   
      <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Product List
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>List of products</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            
                {children}
              
            
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      
    
    </div>
  )
}
