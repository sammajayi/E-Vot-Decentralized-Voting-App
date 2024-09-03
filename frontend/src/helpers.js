export const fetchKYC = async(nin)=>{
    const res = await fetch("http://localhost:5000/kyc/"+nin,{
       mode: "no-cors"
    })
    return res
}