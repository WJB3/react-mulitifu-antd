export default function editFiletype(name){
    return name.replace(/(image\/|application\/)/,"")
}