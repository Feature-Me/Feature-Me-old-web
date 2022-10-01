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
import convertAlphaChart from "Features/chartConvert/FeatureMeAlpha";

const ChartConverter: React.FC = () => {
    const [translate, i18n] = useTranslation()
    let inputEditor: Ace.Editor;
    const inputFileRef = React.useRef<HTMLInputElement>(null);
    const [chartText, setChartText] = React.useState<string>("");
    const [inputFileName, setInputFileName] = React.useState<string>(translate("editor.converter.input.selectedFile"))
    const [convertType, setConvertType] = React.useState<string>("");
    const [convertDirection, setConvertDirection] = React.useState<boolean>(true);
    const [resultText, setResultText] = React.useState<string>("");

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
        {name:"FMAlphaJson",exec:convertAlphaChart}
    ]

    React.useEffect(() => {
        setConvertType(convertTypeSelect[0].value);
        setConvertDirection(directionSelect[0].value);

        document.title = `Convert Chart - Feature Me`;
    }, [])

    function inputFile(e: React.FormEvent<HTMLInputElement>) {
        if (!inputFileRef.current) return;
        const file = inputFileRef.current.files?.item(0);
        if (!file) return;
        if (file.name) setInputFileName(file.name);
        file.text().then(str => setChartText(str))
    }

    function convert() {
        console.log("convert");

        if (!chartText) return;

        try {
            const chart = convertFunctions.find(f=>f.name==convertType)?.exec(convertDirection, chartText)
            if(!chart) throw new Error("cant exec convert: unsolved function.")
            setResultText(chart)
        } catch (error) {
            console.log(error);
            setResultText(String(error));
        }
    }

    function copyChart(){
        if (navigator.clipboard) {
            navigator.clipboard.writeText(resultText)
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
                            <ChamferedButton onClick={() => inputFileRef.current?.click()}>Upload</ChamferedButton>
                            <span><TranslateText content="editor.converter.input.fileName" /> {inputFileName} </span>
                            <input type={"file"} className={style.fileInput} ref={inputFileRef} onInput={inputFile} />
                        </div>
                    </div>
                </div>
                <div className={style.selectType}>
                    <h2><TranslateText content="editor.converter.input.selectType" /></h2>
                    <div>
                        {/* convert type */}
                        <h4><TranslateText content="editor.converter.input.direction" /></h4>
                        <SelectBox contents={directionSelect} value={directionSelect[0]} onChange={e => setConvertDirection(e.value)} />
                    </div>
                    <div>
                        {/* convert file type */}
                        <h4><TranslateText content="editor.converter.input.type" /></h4>
                        <SelectBox contents={convertTypeSelect} value={convertTypeSelect[0]} onChange={e => setConvertType(e.value)} />
                    </div>
                    <div>
                        {/* convert button */}
                        <ChamferedButton className={style.convetBtn} onClick={convert}>Convert</ChamferedButton>
                    </div>
                    <div>
                        <a href="https://github.com/setchi/NoteEditor">Unity Note Editor</a> <br />
                        <a href="https://github.com/TinyTany/M4ple-Editor">M4ple SUS Editor</a> <br />
                        <a href="https://github.com/cnSchwarzer/Arcade.Launcher">Arcade AFF Editor</a>
                    </div>


                </div>
                <div className={style.output}>
                    <div className={style.content}>
                        <h2><TranslateText content="editor.converter.input.output" /></h2>
                        <AceEditor mode="json5" fontSize={14} theme="monokai" readOnly value={resultText} height="100%" width="100%" />
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