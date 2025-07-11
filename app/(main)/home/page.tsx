export default async function HomePage(){
       await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve('resolved')
      },4000)
     })
return(
<>
    <h1>HomePage of NCEAC</h1>
    </>)
}