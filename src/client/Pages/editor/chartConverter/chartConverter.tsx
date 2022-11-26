import Header from "Block/head/head";
import React from "react";
import style from "./chartConverter.scss"
import AceEditor from "react-ace";
import { Ace } from "ace-builds";

import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/snippets/json5";
import "ace-builds/src-noconflict/theme-monokai";
import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import { useTranslation } from "react-i18next";
import TranslateText from "Components/TranslateText/TranslateText";
import SelectBox from "Components/SelectBox/selectBox";
import convertAlphaChart from "Features/editor/chartConvert/FeatureMeAlpha";
import { useRecoilState } from "recoil";
import chartConverterState from "State/editor/chartConverterState";

const ChartConverter: React.FC = () => {
    let inputEditor: Ace.Editor;
    const [chartText, setChartText] = React.useState<string>("");
    const [chartConvert, setChartConvert] = useRecoilState(chartConverterState)

    const directionSelect: selectContentsArray<boolean> = [
        { label: "Others → Feature Me", value: true },
        { label: "Feature Me → Others", value: false }
    ]
    const convertTypeSelect: selectContentsArray<string> = [
        { label: "Feature Me Alpha (.json)", value: "FMAlphaJson" },
        { label: "Feature Me Blossom (.fmc)", value: "fmc" },
        { label: "Unity™ Note Editor (.json)", value: "UnityJson" },
        { label: "Seaurchin Score (.sus)", value: "sus" },
        { label: "Arcaea™ (.aff)", value: "aff" }
    ]

    const convertFunctions = [
        { name: "FMAlphaJson", exec: convertAlphaChart }
    ]

    React.useEffect(() => {
        setChartConvert(convert => {
            return {
                ...convert,
                convertType: convertTypeSelect[0].value,
                convertDirection: directionSelect[0].value
            }
        })
        document.title = `Convert Chart - Feature Me`;
    }, [])

    function inputFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        const file = e.target.files.item(0);
        if (!file) return;
        if (file.name) {
            setChartConvert(convert => {
                return {
                    ...convert,
                    inputFileName: file.name
                }
            })
        }
        file.text().then(str => setChartText(str))
    }

    function convert() {

        if (!chartText) return;
        let resultString: string = "";
        try {
            const chart = convertFunctions.find(f => f.name == chartConvert.convertType)?.exec(chartConvert.convertDirection, chartText)
            if (!chart) throw new Error("cant exec convert: unsolved function.")
            resultString = chart
        } catch (error) {
            resultString = String(error);
        }
        setChartConvert(convert => {
            return {
                ...convert,
                resultText: resultString
            }
        })
    }

    function copyChart() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(chartConvert.resultText)
        }
    }

    return (
        <div className={style.chartConverter}>
            <Header title="Convert Chart" />
            <div className={style.convert}>
                <div className={style.input}>
                    <div className={style.content}>
                        <h2><TranslateText content="editor.converter.input.convert" /></h2>
                        {/* input editor */}
                        <AceEditor mode="json5" fontSize={14} theme="monokai" onLoad={e => inputEditor = e} value={chartText} onChange={setChartText} height="100%" width="100%" />
                    </div>
                    <div className={style.content}>
                        <h2><TranslateText content="editor.converter.input.file" /></h2>
                        <div>
                            {/* input file button */}
                            <ChamferedButton ><label htmlFor="convertChartFileInput" >Upload</label></ChamferedButton>
                            <span><TranslateText content="editor.converter.input.fileName" /> {chartConvert.inputFileName} </span>
                            <input type="file" id="convertChartFileInput" className={style.fileInput} onChange={inputFile} />
                        </div>
                    </div>
                </div>
                <div className={style.selectType}>
                    <h2><TranslateText content="editor.converter.input.selectType" /></h2>
                    <div>
                        {/* convert type */}
                        <h4><TranslateText content="editor.converter.input.direction" /></h4>
                        <SelectBox contents={directionSelect} value={directionSelect[0]} onChange={e => setChartConvert(convert => { return { ...convert, convertDirection: e.value } })} />
                    </div>
                    <div>
                        {/* convert file type */}
                        <h4><TranslateText content="editor.converter.input.type" /></h4>
                        <SelectBox contents={convertTypeSelect} value={convertTypeSelect[0]} onChange={e => setChartConvert(convert => { return { ...convert, convertType: e.value } })} />
                    </div>
                    <div>
                        {/* convert button */}
                        <ChamferedButton className={style.convetBtn} onClick={convert}>Convert</ChamferedButton>
                    </div>
                    <div>
                        <a href="https://github.com/setchi/NoteEditor" target="_blank" >Unity Note Editor</a> <br />
                        <a href="https://github.com/TinyTany/M4ple-Editor" target="_blank" >M4ple SUS Editor</a> <br />
                        <a href="https://github.com/cnSchwarzer/Arcade.Launcher" target="_blank" >Arcade AFF Editor</a>
                    </div>


                </div>
                <div className={style.output}>
                    <div className={style.content}>
                        <h2><TranslateText content="editor.converter.input.output" /></h2>
                        <AceEditor mode="json5" fontSize={14} theme="monokai" readOnly value={chartConvert.resultText} height="100%" width="100%" />
                    </div>
                    <div>
                        <ChamferedButton className={style.convetBtn} onClick={copyChart}>Copy</ChamferedButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChartConverter;