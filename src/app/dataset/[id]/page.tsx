import Header from "@/app/Header";
import { mockData } from "@/app/page";
import { supabase } from "@/app/supabaseClient";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CardDetail({
    params,
}: {
    params: { id: string };
}) {
    const { data } = await supabase
        .from("datasets")
        .select("*")
        .eq("id", params.id);

    if (!data) {
        notFound();
    }

    const dataset = data[0]

    return (
        <>
            <Header />
            <div className="py-10">
                <main>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex">
                        <div className="flex-1 ml-8">
                            <div className="flex items-center mb-6">
                                <Link
                                    href="/"
                                    className="text-blue-600 hover:text-blue-800 mr-2"
                                >
                                    ← Back to Dashboard
                                </Link>
                            </div>
                            <div className="w-100 px-4 py-5 border-1 border-gray-300 overflow-hidden rounded-lg bg-white shadow-md">
                                <div>
                                    <div className="text-xl font-bold sm:px-6">
                                        {dataset.title}
                                    </div>
                                    <div className=" text-lg sm:px-6">
                                        {dataset.description}
                                    </div>
                                </div>

                                <div className="sm:p-6">{dataset.publisher}</div>

                                <Button>View in Looker Studio</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
