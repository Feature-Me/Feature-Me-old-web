import Card from "Components/card/card";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import AceEditor from "react-ace";
import { Ace } from "ace-builds";
import { chartProjectState } from "State/editor/chartProjectState";
import msToStringTime from "Utils/msToStringTime/msToStringTime";

import style from "./metadata.scss";
import json5 from "json5";
import NumberInput from "Components/numberInput/numberInput";
import ChamferdTextInput from "Components/textInput/chamferedTextInput/chamferedTextInput";
import { cloneDeep } from "lodash";
import { file } from "jszip";
import arrayBufferToBase64 from "Utils/ArrayBufferToBase64/ArrayBufferToBase64";
import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";

interface metadata {
    label: React.ReactNode,
    input: React.ReactNode
}

const ChartEditorMetadata: React.FC = () => {
    const [chartEditorProject, setChartEditorProject] = useRecoilState(chartProjectState);
    const projectMetadata = chartEditorProject.project.metadata
    let inputEditor: Ace.Editor;

    const metadatas: Array<metadata> = [
        {
            label: <TranslateText content="editor.chartEditor.metadata.name" />,
            input: <input className={style.textInput} defaultValue={chartEditorProject.project.name} onChange={(e) => setChartEditorProject(proj => { return { ...proj, project: { ...proj.project, name: e.target.value } } })} />
        },
        {
            label: <TranslateText content="editor.chartEditor.metadata.bpm" />,
            input: <NumberInput min={0} max={9999} step={1} value={projectMetadata.bpm} onChange={value => setMetadata("bpm", value)} />
        },
        {
            label: <TranslateText content="editor.chartEditor.metadata.composer" />,
            input: <input className={style.textInput} defaultValue={projectMetadata.composer} onChange={e => setMetadata("composer", e.target.value)} />
        },
        {
            label: <TranslateText content="editor.chartEditor.metadata.license" />,
            input: <input className={style.textInput} defaultValue={projectMetadata.license} onChange={e => setMetadata("license", e.target.value)} />
        },
        {
            label: <TranslateText content="editor.chartEditor.metadata.time" />,
            input: <NumberInput min={0} max={9999} step={1} value={projectMetadata.time} onChange={value => setMetadata("time", value)} />
        },
        {
            label: <TranslateText content="editor.chartEditor.metadata.thumbnail" />,
            input: <div className={style.thumbnail} style={{backgroundImage: `url(data:${projectMetadata.thumbnail.mime};base64,${arrayBufferToBase64(projectMetadata.thumbnail.data)})` }}><ChamferedButton><label htmlFor="editorMetadataFileInput"><TranslateText content="editor.chartEditor.metadata.changeimg" /></label></ChamferedButton><input type="file" id="editorMetadataFileInput" accept="image" hidden onChange={e => setThumbnail(e.target.files)} /></div>,
        }

    ]

    function setMetadata(key: (keyof typeof projectMetadata), value: any) {
        let data = cloneDeep(projectMetadata);
        data = Object.defineProperty(data, key, {
            value,
            writable: true
        })

        setChartEditorProject(proj => {
            return {
                ...proj,
                project: {
                    ...proj.project,
                    metadata: data
                }
            }
        })
    }

    function setThumbnail(files: FileList | null) {
        if(!files)return;
        const file = files.item(0);
        if(!file)return;
        file.arrayBuffer().then(buffer=>setMetadata("thumbnail",{data:buffer,mime:file.type}));
        file.arrayBuffer().then(buffer => console.log({ data: buffer, mime: file.type }));
    }

    React.useEffect(() => {
        document.title = `Editor - Metadata - Feature Me`;
    }, [])

    return (
        <div className={style.metadata}>
            <h1><TranslateText content="editor.chartEditor.metadata.title" /></h1>
            <div className={style.metadataEdit}>
                {
                    metadatas.map((data, index) => {
                        return (
                            <div className={style.content} key={index}>
                                <h1>{data.label}</h1>
                                {data.input}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ChartEditorMetadata;