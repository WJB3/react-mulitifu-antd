 
import React from 'react';
import style from './index.module.less';

const PDF_IMG=require('./PDF.png');
const PNG_IMG=require('./PNG.png');
const ZIP_IMG=require('./ZIP.png');
const MAP_IMG=require('./MP3.png');
const RAR_IMG=require('./RAR.png');
const Z_IMG=require('./7z.png');
const MOV_IMG=require('./mov.png');
const CDR_IMG=require('./CDR.png');
const Tiff_IMG=require('./Tiff.png');
const pptx_IMG=require('./pptx.png');
const DOC_IMG=require('./DOC.png');

const FileTypeImage=(props)=>{

    const {
        fileType='pdf'
    }=props;

    const mapImageUrl={
        'png':PNG_IMG,
        'image/png':PNG_IMG,
        'image/jpeg':PNG_IMG,
        'image/tiff':Tiff_IMG,
        'pdf':PDF_IMG,
        'application/pdf':PDF_IMG,
        'application/x-gzip':ZIP_IMG,
        'application/zip':ZIP_IMG,
        'video/mp3':MAP_IMG,
        'video/mp4':MAP_IMG,
        'rar':RAR_IMG,
        '7z':Z_IMG,
        'video/quicktime':MOV_IMG,
        'cdr':CDR_IMG,
        'pptx':pptx_IMG,
        'docx':DOC_IMG,
        'doc':DOC_IMG,
    }

    return (
        <div className={style.fileTypeImage} >
            {/* <img src={mapImageUrl[fileType]} /> */}
        </div>
    )
}

export default FileTypeImage;