//@ts-nocheck
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Space, DatePicker, Input, Form, Card, message, Tag, notification, Image, Button, Modal } from 'antd';
import API from '@/api/resource/index'
import { kbToMd } from '@/utils/tranformSize';
import style from './index.module.less';
import CustomTagInput from '@/components/CustomTagInput';
import { getImageUrl } from '@/utils/getSuccessUrl'
import CustomOssUploader from '@/components/CustomOssUploader';
import { FormOutlined, DownloadOutlined, ShareAltOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import AliDownload from '@/hooks/AliDownload';
import CustomModal from '@/components/CustomModal';
import TagInput from '@/components/TagInput';
import { layout, tailLayout } from '@/utils/layout'
import ResourceUploader from '@/components/ResourceUploader';
import editFileType from '@/utils/editFileType'
import roleApi from '@/api/system/label';
import share from '@/utils/share'
import moment from 'moment';
import PermissionsButton from '@/components/PermissionsButton';
import useWindowResize from '@/hooks/useWindowResize';

function split(flattenLabel, label) {
    let detailLabel = label.split(',');
    let customLabel = [];
    let labels = [];
    flattenLabel.forEach(item => {
        detailLabel.forEach(itemB => {
            if (item === itemB) {
                labels.push(itemB);
                detailLabel.splice(detailLabel.indexOf(itemB), 1)
            }
        })
    })
    customLabel = detailLabel;
    return {
        customLabel,
        labels
    }

}

const dateFormat = 'YYYY-MM-DD';

const FileDetail = (props) => {

    const [list, setList] = useState([]);

    const [customHeight]=useWindowResize(180);

    useEffect(() => {
        roleApi.tree().then(res => {
            setList(res)
        })
    }, [])

    const location = useLocation();

    const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                ?????????
            </Button>
        );
        notification.open({
            message: '????????????',
            description:
                '???????????????????????????????????????tab???',
            btn,
            key
        });
    };

    const fileId = useMemo(() => {
        const { pathname, search } = location;

        if (!pathname) {
            message.error("???????????????????????????")
        }

        try {
            return (pathname + decodeURIComponent(search)).match(/fileId=([\d]*)/)[1]
        } catch (e) {
            return undefined;
        }
    }, [location.pathname, location.search]) 

    const flattenLabel = list.reduce((total, current, index) => {
        if (current.children.length) {
            let newarr = []
            current.children.forEach(item => {
                newarr.push(item.name)
            })
            return total.concat(newarr)
        }
    }, [])

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

    const onDeleteItem = (current) => {
        Modal.confirm({
            title: '??????',
            icon: <ExclamationCircleOutlined />,
            content: '?????????????????????????????????',
            okText: '??????',
            cancelText: '??????',
            onOk: () => API.delete([current.id]).then(res => {
                openNotification()
            })
        });
    }

    const [detail, setDetail] = useState<IProps>({});

    useEffect(() => {
        if (fileId) {
            API.getDetail(fileId).then(res => {
                setDetail(res)
            })
        }
    }, [fileId]);

    const download = async (record) => {
        const url = await AliDownload(record);
        window.open(url);
    }

    const [form] = Form.useForm(); 

    const [visible, setVisible] = useState(false);

    const [addLoading, setAddLoading] = useState(false);

    const onFinish = (values: any) => { 
        let newObj: any = {};
        if (values.title) {
            newObj.title = values.title
        }
        if (values.customLabels || values.label) {
            newObj.fileLabel = (values.customLabels || []).concat(values.label || []).join(",")
        }
        if (values.desc) {
            newObj.fileDesc = values.desc
        }
        if (values.imgs) {
            newObj.fileCover = values.imgs.join(',')
        }
        if (values.youxiaoDate) {
            newObj.periodValidity = values.youxiaoDate.format(dateFormat)
        }
        if (values.file) {
            newObj.fileName = values.file.name;
            newObj.filePath = values.file.successUrl;
            newObj.fileSize = values.file.size;
            newObj.fileType = values.file.type;
        }
        if (props.foldId) {
            newObj.folderId = detail.foldId
        } 


        setAddLoading(true);

        API.edit({
            ...newObj,
            id: (detail as any).id
        }).then(res => {
            setAddLoading(false);
            message.success("????????????")
            API.getDetail(fileId).then(res => {
                setDetail(res)
            })
            setVisible(false)
        }).catch((e) => {
            setAddLoading(false);
        })


    };

    const handleFieldsChange = (changedFields, allFields) => { 
        if (changedFields[0]?.name?.[0] === 'file') {
            form.setFieldsValue({
                title: changedFields[0]?.value?.name?.split('.')?.[0],
                fileName: changedFields[0]?.value?.name?.split('.')?.[0],

            })
        }
    }



    useEffect(() => {
        if (visible) { 
            form.setFieldsValue({
                title: detail.title,
                file: {
                    name: detail.fileName,
                    successUrl: detail.filePath,
                    size: detail.fileSize,
                    type: detail.fileType
                },
                youxiaoDate: detail.periodValidity?moment(detail.periodValidity):moment(),
                desc: detail.fileDesc,
                imgs: detail.fileCover?detail.fileCover.split(','):[],
                customLabels: split(flattenLabel, detail.fileLabel).customLabel,
                label: split(flattenLabel, detail.fileLabel).labels

            })
        }
    }, [visible]) 


    return (
        <Card className={style.card} style={{height:customHeight,overflow:'auto'}}>
            <div className={style.CardItem}>
                <div>?????????</div>
                <div>{detail.fileName}</div>
            </div>
            <div className={style.CardItem}>
                <div>?????????</div>
                <div> {editFileType(detail.fileType)}</div>
            </div>
            <div className={style.CardItem}>
                <div>?????????</div>
                <div> {kbToMd(detail?.fileSize)}</div>
            </div>
            <div className={style.CardItem}>
                <div>???????????????</div>
                <div> {detail?.periodValidity}</div>
            </div>
            <div className={style.CardItem}>
                <div>?????????</div>
                <div> {detail?.fileLabel?.split(",")?.map(label => <Tag color="blue">{label}</Tag>)}</div>
            </div>
            <div className={style.CardItem}>
                <div>???????????????</div>
                <div> {detail?.createTimeStr}</div>
            </div>
            <div className={style.CardItem}>
                <div>?????????</div>
                <div>{detail?.fileDesc}</div>
            </div>
            <div className={style.CardItem}>
                <div>????????????</div>
                <div>{detail?.fileCover?.split(",")?.map(item => <Image height={100} width={100} src={getImageUrl(null, item)} />)}</div>
            </div>

            <div className={style.bottomAction}>
                <Button style={{ marginRight: 30 }} onClick={() => download(detail)} type="primary" shape="round" icon={<DownloadOutlined />} size={'large'}>
                    ??????
            </Button>
                <Button style={{ marginRight: 30 }} onClick={() => share()} type="primary" shape="round" icon={<ShareAltOutlined />} size={'large'}>
                    ??????
            </Button>
                {sessionStorage.getItem('CURRENTTYPEID') != 75 && <PermissionsButton permission={`Resource:Update`} ><Button style={{ marginRight: 30 }} onClick={() => setVisible(true)} type="primary" shape="round" icon={<FormOutlined />} size={'large'}>

                    ??????
            </Button></PermissionsButton>}

                {sessionStorage.getItem('CURRENTTYPEID') != 75 && <Button type="primary" onClick={() => onDeleteItem(detail)} danger shape="round" icon={<DeleteOutlined />} size={'large'}>
                    ??????
            </Button>}
            </div>

            <CustomModal
                visible={visible}
                customTitle={"????????????"}
                size="big"
                clickCancel={() => setVisible(false)}
                afterClose={() => form.resetFields()}
            >
                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFieldsChange={handleFieldsChange}
                    form={form}
                    {...layout}
                >
                    <Form.Item
                        label="????????????"
                        name="title"
                        rules={[{ required: true, message: '??????????????????!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="??????" name={"file"} rules={[{ required: true, message: '??????????????????!' }]}>
                        <ResourceUploader />
                    </Form.Item>

                    <Form.Item
                        label="????????????"
                        name="label"
                    >
                        <TagInput />
                    </Form.Item>

                    <Form.Item
                        label="???????????????"
                        name="customLabels"
                    >
                        <CustomTagInput />
                    </Form.Item>

                    <Form.Item
                        label="????????????"
                        name="youxiaoDate"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        label="?????????"
                        name="imgs"
                    >
                        <CustomOssUploader />
                    </Form.Item>


                    {/* <Form.Item
                        label="????????????"
                        name="authfile" 
                    >
                        <AuthorizationFile   /> 
                    </Form.Item> */}

                    <Form.Item
                        label="????????????"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Space align="end" style={{ float: 'right' }}>
                            <Button type="primary" htmlType="submit" loading={addLoading}>
                                ??????
                            </Button>
                            <Button type="default" onClick={() => setVisible(false)} >
                                ??????
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </CustomModal>
        </Card>

    )
}

export default FileDetail;