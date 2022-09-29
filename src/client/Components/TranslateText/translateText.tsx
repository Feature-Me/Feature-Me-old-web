import React from "react";
import { useTranslation } from "react-i18next";

const TranslateText: React.FC<TranslateProps> = (props): JSX.Element => {
    const [translation, i18n] = useTranslation();
    return <>{props.start || ""}{translation(props.content, { defaultValue: props.defaultValue })}{props.end || ""}</>;
}

export default TranslateText;