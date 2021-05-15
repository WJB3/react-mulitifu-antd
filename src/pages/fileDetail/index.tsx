import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Card, message, Tag, Image } from 'antd';
import API from '@/api/resource/index'
import style from './index.module.less';
import { getImageUrl } from '@/utils/getSuccessUrl'

const FileDetail = (props) => {

    const location = useLocation();

    const fileId = useMemo(() => {
        const { pathname,search } = location;  

        if (!pathname) {
            message.error("无法解析对应文件！")
        }

        try {
            return (pathname+decodeURIComponent(search)).match(/fileId=([\d]*)/)[1]
        } catch (e) { 
            return undefined; 
        }
    }, [location.pathname,location.search])

    console.log("fileId",fileId)

    interface IProps {
        fileName?: string,
        fileType?: string,
        fileSize?: number,
        periodValidity?: string,
        fileLabel?: string,
        createTimeStr?: string,
        fileDesc?: string,
        fileCover?: string
    }

    const [detail, setDetail] = useState<IProps>({});

    useEffect(() => {
        if (fileId) {
            API.getDetail(fileId).then(res => { 
                setDetail(res)
            })
        }  
    }, [fileId]);

    console.log("detail", detail)

    return (
        <Card className={style.card}>
            <div className={style.CardItem}>
                <div>名称：</div>
                <div>{detail.fileName}</div>
            </div>
            <div className={style.CardItem}>
                <div>格式：</div>
                <div> {detail.fileType}</div>
            </div>
            <div className={style.CardItem}>
                <div>大小：</div>
                <div> {(detail?.fileSize / 100)?.toFixed(2)}MB</div>
            </div>
            <div className={style.CardItem}>
                <div>有效日期：</div>
                <div> {detail?.periodValidity}</div>
            </div>
            <div className={style.CardItem}>
                <div>标签：</div>
                <div> {detail?.fileLabel?.split(",")?.map(label => <Tag color="blue">{label}</Tag>)}</div>
            </div>
            <div className={style.CardItem}>
                <div>上传时间：</div>
                <div> {detail?.createTimeStr}</div>
            </div>
            <div className={style.CardItem}>
                <div>描述：</div>
                <div>{detail?.fileDesc}</div>
            </div>
            <div className={style.CardItem}>
                <div>缩略图：</div>
                <div>{detail?.fileCover?.split(",")?.map(item => <Image height={100} width={100} src={getImageUrl(null, item)} />)}</div>
            </div> 
        </Card>

    )
}

export default FileDetail;