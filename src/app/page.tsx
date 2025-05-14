import Sidebar from "./Sidebar";
import Header from "./Header";
import Card from "./Card";
// import LoginAndLibrary from "./LoginAndLibrary";
import { supabase } from "./supabaseClient";

// export const mockData = [
//     {
//         id: 1,
//         name: "Justin",
//         content: "hello",
//     },
//     { id: 2, name: "Mark", content: "hello" },
// ];

export default async function Example() {
      const { data } = await supabase.from("datasets").select("*");

      console.log(data)
    return (
        <>
            {/* <LoginAndLibrary /> */}
            <Header />

            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
                        <Sidebar />

                        <div>
                            <h1 className="text-3xl mb-6 font-bold tracking-tight text-gray-900">
                                RCI Discovery Dashboard
                            </h1>

                            <div className="flex flex-col gap-8">
                                {data?.map((data) => (
                                    <Card
                                        key={data.id}
                                        id={data.id}
                                        data={data}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
