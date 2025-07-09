import AccountProfile from "@/components/customComponents/UserProfile";
// import UserProfile from "@/components/customComponents/UserProfile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,

} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
export default function Dashboard(){
    return(
    <div >
    <h1 className="text-center">Welcome to Dashboard</h1>


      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="mr-2">Account Profile</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[95vw] sm:max-w-md p-0">
        
 
        {/* Tightly integrated AccountProfile without extra spacing */}
        <div className="overflow-y-auto max-h-[60vh]">
          <AccountProfile />
        </div>
        
        <AlertDialogFooter className="px-6 pb-4 pt-2 bg-muted/50">
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>


    </div>
    )
}