import React from "react";
import { useTranslation } from "react-i18next";

const TrranslateText: React.FC<{key:string,defaultValue?:string}> = (props):JSX.Element => {
    const [translation,i18n] = useTranslation();
    console.log(props,props.key,translation(props.key, { defaultValue: props.defaultValue }));
    
    return <>{translation(props.key,{defaultValue:props.defaultValue})}</>;
}

export default TrranslateText;
