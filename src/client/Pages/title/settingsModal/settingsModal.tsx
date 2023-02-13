import LargeButton from "Components/Button/largeButton/largeButton";
import ModernModal from "Components/Modal/ModernModal/ModernModal";
import TranslateText from "Components/TranslateText/TranslateText";
import { useI18n } from "intl/intlContext";
import *  as solid from "solid-js";
import { showModal, setShowModal, showDeleteSettingsModal, setShowDeleteSettingsModal, setCanBegin } from "../titleState";
import TitleDeleteModal from "./deleteModal";

import style from "../title.module.scss";
import SelectBox from "Components/Selectbox/selectbox";
import downloadLocalStorage from "Utils/Export/localStorage/downloadLocalStorage";

const SettingsModal: solid.Component = (props) => {

    const [t, intl] = useI18n();

    const languages = [
        { label: "言語 : JA - 日本語", value: "ja" },
        { label: "Language : EN(UK) - English(United Kingdom)", value: "en_uk" },
        { label: "Language : EN(US) - English(United States)", value: "en_us" },
    ]

    return (
        <ModernModal
            title={t("title.settings.title").toString()}
            show={showModal()}
            interactions={[{ label: t("title.settings.close").toString(), onClick: () => setShowModal(false) }]}
            onClickBackground={() => setShowModal(false)} >
            <div class={style.settingsWindowInner}>
                <SelectBox class={style.lngSettings} contents={languages} value={languages[0]} />
                <LargeButton onClick={downloadLocalStorage}><TranslateText content="title.settings.export" /></LargeButton>
                <LargeButton onClick={() => setShowDeleteSettingsModal(true)}><TranslateText content="title.settings.clear" /></LargeButton>
                <LargeButton><TranslateText content="title.terms" /></LargeButton>
            </div>
            <TitleDeleteModal />
        </ModernModal>
    )
}

export default SettingsModal;