show_deleted_input.addEventListener('click', function(){
    is_deleted_shown=show_deleted_input.checked;
    

    let facts=[]
    for (let index = 0; index < sessionStorage.length; index++) {
        let key = +sessionStorage.key(index);
        if(!isNaN(key)){
            facts.push({"key":key, "value":sessionStorage.getItem(key)})
        }
        
    }
    facts.forEach((fact)=>{
        const factJson=JSON.parse(fact.value)
        const element=$(`#${fact.key}`)
        if(factJson.status==='deleted'){
           if(is_deleted_shown){
            element.show()
           }
           else{
            element.hide()
           }
        }
    })
})