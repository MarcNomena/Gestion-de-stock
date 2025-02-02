import Link from "next/link";
import { TutorialStep } from "./tutorial-step";
import { ArrowUpRight, MailOpen } from "lucide-react";
import Image from "next/image"
import { Button } from "../ui/button";
 

export default function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <TutorialStep title="Sign up your first user">
        <p>
       

            <Link
            href="/sign-up"
            className="font-bold hover:underline text-foreground/80"
          >
             <Button >
              <MailOpen /> Go to the sign Page
             </Button>
           
          </Link>{" "}
          <br/>
         
         
          
        </p>
      </TutorialStep>
    </ol>
  );
}
