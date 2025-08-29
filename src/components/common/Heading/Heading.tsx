import { memo } from "react";

 const Heading =memo(({title}:{title:string})=>{
  console.log("from heading");
  
  return (
    <p className="mb-3" style={{fontSize:"26px"}}>{title}</p>
  )
});
export default Heading;
