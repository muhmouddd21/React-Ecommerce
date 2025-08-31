import CartSkeleton from "@components/common/skeletons/cartSkeleton";
import categorySkeleton from "@components/common/skeletons/categorySkeleton";
import ProductSkeleton from "@components/common/skeletons/productSkeleton";
import { TLoading } from "src/Types/shared"


const skeletonsTypes={
    category:categorySkeleton,
    product:ProductSkeleton,
    cart:CartSkeleton
};



type TloadingProps={
    status:TLoading,
    error:string | null,
    children:React.ReactNode;
    type?: keyof typeof skeletonsTypes;
}


export default function Loading({status,error,children,type ='category'}:TloadingProps) {
    const Component = skeletonsTypes[type];
    if(status === "pending"){
        return <Component />;
    }
    if(status === "failed"){
        return <div>{error}</div>;
    }
    return <div>{children}</div>
}
