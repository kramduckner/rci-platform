import Sidebar from "./Sidebar";
import Header from "./Header";
import Card from "./Card";
import LoginAndLibrary from "./LoginAndLibrary"


export const mockData = [
    {
        id: 1,
        name: "Justin",
        content: "hello",
    },
    {   id: 2,
        name: "Mark",
        content: "hello",
    },
];

export default function Example() {
    return (
        <>
          <LoginAndLibrary />
            <Header />

            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
                        <Sidebar />

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                Dashboard
                            </h1>

                            <div className="flex flex-col gap-8">
                                {mockData.map((data) => (
                                    <Card
                                        id={data.id}
                                        name={data.name}
                                        content={data.content}
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
