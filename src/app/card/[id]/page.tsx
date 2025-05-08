import Header from "@/app/Header";
import { mockData } from "@/app/page";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CardDetail({ params }) {
    const cardId = parseInt(params.id);

    const card = mockData.find((item) => item.id === cardId);

    if (!card) {
        notFound();
    }

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
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                                {card.name}'s Details
                            </h1>
                            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
                                <p className="text-gray-700 mb-4">
                                    {card.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
