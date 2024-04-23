export async function GetNumberDescription(number, callback){
    const response=await fetch("http://numbersapi.com/"+number)
    if(!response.ok)throw new Error("An error occured while processing the request: "+e)
    const responseText=await response.text()
    console.log(responseText)
    callback(responseText)
    
    
}

export  async function GetDateDescription(months, day, callback){
    const response= await fetch(`http://numbersapi.com/${months}/${day}/date`)
    if(!response.ok)throw new Error("An error occured while processing the request: "+e)
    const responseText=await response.text()
    callback(responseText)
}