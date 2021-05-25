import React from 'react'
import AliOss from './AliOss'
import API from '@/api/resource/index'

const OSS_BASE_URL="http://mec.hml-media.net";
const Url="http://yxs-zygl.oss-cn-beijing.aliyuncs.com";

export default async function AliDownload(  
    file?:any
) {
    console.log("file",file)
    const aliOssClient = await AliOss(); 
    
    const filename=await API.download({id:file.id}) 

    const response = {
        'content-disposition': `attachment; filename=${encodeURIComponent(file.fileName)}`
    }

    const url=aliOssClient.signatureUrl(filename, { response });

    return url;

}