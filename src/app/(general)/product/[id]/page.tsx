import { notFound } from "next/navigation";

interface Props {
    params: {
        id: string;
    };
}

export  function generateMetadata({params}: Props) {
    return {
        title: `Product Detail ${params.id}`, 
        description: `Product Detail ${params.id}`
    };
}

export default function ProductDetail({params}: Props){
    const  id = parseInt(params.id);

    if (id>100) {
        notFound();
    }

    return (
        <div>
            <h1>Product Detail</h1>
            <p>Product ID: {id}</p>
        </div>
    );

}