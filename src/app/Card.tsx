import Link from "next/link";

interface CardProps {
    id: number;
    name: string;
    content: string;
}

export default function Card(props: CardProps) {
    return (
        <Link href={`/card/${props.id}`} className="block">
            <div className="divide-y w-100 divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="px-4 py-5 sm:px-6">{props.name}</div>
                <div className="px-4 py-5 sm:p-6">{props.content}</div>
            </div>
        </Link>
    );
}
