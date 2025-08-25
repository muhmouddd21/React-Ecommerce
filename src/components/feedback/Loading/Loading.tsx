import { TLoading } from "src/Types/shared"

type TloadingProps={
    status:TLoading,
    error:string | null,
    children:React.ReactNode;
}


export default function Loading({status,error,children}:TloadingProps) {
    if(status === "pending"){
        return <div>loading please wait</div>
    }
    if(status === "failed"){
        return <div>{error}</div>;
    }
    return <div>{children}</div>
}
