import * as solid from "solid-js";

import { useI18n } from "intl/intlContext";
import GradientButton from "Components/Button/gradientButton/gradientButton";
import ModernModal from "Components/Modal/ModernModal/ModernModal";
import TranslateText from "Components/TranslateText/translateText";
import clearStorage from "Utils/Storage/clear/clearStorage";
import deleteDatabase from "Utils/Storage/database/deleteDatabase";
import { deleteLocalStorage } from "Utils/Storage/LocalStorage/deleteLocalStorage";
import { showDeleteSettingsModal, setShowDeleteSettingsModal, setCanBegin } from "../titleState";

const TitleDeleteModal:solid.Component = () => {

    const [t,intl]= useI18n();

    function deleteData(func: Function) {
        func();
        setCanBegin(false);
    }

    return(
        <ModernModal
            title={t("title.settings.deleteDataModal.title").toString()}
            show={showDeleteSettingsModal()}
            onClickBackground={() => setShowDeleteSettingsModal(false)}
            interactions={[{ label: t("title.settings.deleteDataModal.cancel").toString(), onClick: () => setShowDeleteSettingsModal(false) }]} >
            <TranslateText content="title.settings.deleteDataModal.description" />
            <GradientButton onClick={() => deleteData(deleteLocalStorage)}><TranslateText content="title.settings.deleteDataModal.saveData" /></GradientButton>
            <GradientButton onClick={() => deleteData(deleteDatabase)}><TranslateText content="title.settings.deleteDataModal.resources" /></GradientButton>
            <GradientButton onClick={() => deleteData(clearStorage)}><TranslateText content="title.settings.deleteDataModal.all" /></GradientButton>
        </ModernModal>
    )
}

export default TitleDeleteModal;