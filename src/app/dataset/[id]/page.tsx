import Header from "@/app/Header";
import { mockData } from "@/app/page";
import { supabase } from "@/app/supabaseClient";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function CardDetail({ params }: { params: Params }) {
    const { id } = await params;
    const { data } = await supabase.from("datasets").select("*").eq("id", id);

    if (!data) {
        notFound();
    }

    const dataset = data[0];

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
                                <header className="text-xl mb-8 font-bold sm:px-6">
                                    {dataset.title}
                                </header>

                                <h2 className="font-bold">Dataset Overview</h2>
                                <div className="sm:px-6">
                                    Created Date: {dataset.created_at}
                                </div>

                                <div className="sm:px-6">
                                    Description: {dataset.description}
                                </div>

                                <div className="sm:p-6">
                                    Publisher: {dataset.publisher}
                                </div>

                                <Button>View in Looker Studio</Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
