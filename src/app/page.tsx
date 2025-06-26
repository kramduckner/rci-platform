import Header from "./Header";
import Sidebar from "./Sidebar";
import WelcomeSection from "./WelcomeSection";
import StatsCards from "./StatsCards";
import { supabase } from "./supabaseClient";
import LoginAndLibrary from "./LoginAndLibrary"

export default async function Page() {
    const { data }:any = await supabase.from("datasets").select("*");

    const recentDataset = data?.toSorted((a:any, b:any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
    
    const userAccessedDatasets = data?.filter((d:any) => d.user_has_access) || [];

    return (
        <>
          <Header />
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex py-10">
            <Sidebar />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-6 text-gray-900">RCI Data Discovery Dashboard</h1>
              <WelcomeSection recentDataset={recentDataset} userAccessedDatasets={userAccessedDatasets} />
              <StatsCards
                accessibleCount={userAccessedDatasets.length}
                totalDatasets={data.length}
                recentDataset={null}
                accessibleDatasetsCount={1}
                userAccessedDatasets={[]}
              />
            </div>
          </main>
        </>
    );
}
