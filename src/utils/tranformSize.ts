const kbToMd=(size)=>{
    if(size>1024){
        return `${(size/1024).toFixed(2)}MB`
    }else{
        return `${size.toFixed(2)}KB`
    }
}

export {
    kbToMd
}