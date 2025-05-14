import Link from "next/link";

interface CardProps {
    key: number;
    id: number;
    data: { title: string; description: string; publisher: string };
}

export default function Card(props: CardProps) {
    const { data } = props;
    return (
        <Link href={`/dataset/${props.id}`} className="block">
            <div className="w-100 px-4 py-5 border-1 border-gray-300 overflow-hidden rounded-lg bg-white shadow-md">
                <div>
                    <div className="text-xl font-bold sm:px-6">
                        {data.title}
                    </div>
                    <div className=" text-lg sm:px-6">{data.description}</div>
                </div>

                <div className="sm:p-6">{data.publisher}</div>
            </div>
        </Link>
    );
}
