import React from "react";
import { useTranslation } from "react-i18next";

const TrranslateText: React.FC<{contentData:string,defaultValue?:string,start?:string|JSX.Element,end?:string|JSX.Element}> = (props):JSX.Element => {
    const [translation,i18n] = useTranslation();
    return <>{props.start||""}{translation(props.contentData,{defaultValue:props.defaultValue})}{props.end||""}</>;
}

export default TrranslateText;
