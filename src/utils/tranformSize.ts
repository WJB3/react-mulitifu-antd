const kbToMd=(size)=>{
    if(size){
        if(size>1024*1024*1024){
            return `${(size/1024/1024/1024).toFixed(2)}GB`
        }else if(size>1024*1024){ 
            return `${(size/1024/1024).toFixed(2)}MB`
        }else if(size>1024){
            return `${(size/1024).toFixed(2)}KB`
        }else{
            return `${(size/1024).toFixed(2)}B`
        }
    }else{
        return 0
    }
    
}

export {
    kbToMd
}