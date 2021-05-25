export default function editFiletype(name){
    if(!name){
        return '';
    }
    if(name==='video/quicktime'){
        return 'mov';
    }
    return name.replace(/(image\/|application\/)/,"")
}