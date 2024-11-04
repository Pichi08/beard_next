import Link from "next/link";

export default function NotFound(){
    return (
        <div>
            <h1>Product Not Found</h1>
            <p>Could not find product with id</p>
            <Link href="/">Return to Home</Link>
        </div>
    );
}