import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateMetadata({params}: Props) {
    const {slug} = await params;
    return {
        title: `Product Detail ${slug}`, 
        description: `Product Detail ${slug}`
    };
}

export default async function ProductDetail({params}: Props){
    const  {slug} = await params;

    return (
        <div>

            <h1>Product Detail</h1>
            <p>Product ID: {slug}</p>
        </div>
    );




}