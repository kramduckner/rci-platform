import { supabase } from "../supabaseClient";
import Dashboard from "./Dashboard"

export default async function Page() {
  
  const { data }:any = await supabase.from("datasets").select("*");
  
  return (
    <>
      <Dashboard data={data}/>
    </>
  );
}
