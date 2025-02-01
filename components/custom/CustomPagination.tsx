import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const CustomPagination = ({ productLength,handleChangePage,ParentPage }:any) => {
  //  const [page,setPage]=useState<number>(1);
    const [maxPage,setMaxPage] =useState<number>();

  

    const handleNextPage =()=>{
        
        handleChangePage(ParentPage+1);      
    }
    const handlePreviousPage =()=>{
       
        handleChangePage(ParentPage-1);     
    }

    console.log("product length :"+productLength);

    const CalculateMaxPage=()=>{
        let quotient = Math.floor(productLength / 5); 
        const remainder = productLength % 5; 

        if(remainder>0 )quotient=quotient+1;
        
        return quotient;
    }

    return (
        <div>
     
     <Pagination>
              <PaginationContent >
               {ParentPage>1 && <PaginationItem >
                  <PaginationPrevious href="#" onClick={handlePreviousPage}/>
                </PaginationItem>}
                <PaginationItem>
                  <PaginationLink href="#">{ParentPage }</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                {CalculateMaxPage()>ParentPage && <PaginationItem>
                  <PaginationNext  href="#" onClick={handleNextPage} />
                </PaginationItem>}
              </PaginationContent>
        </Pagination>
        </div>
    );
};

export default CustomPagination;