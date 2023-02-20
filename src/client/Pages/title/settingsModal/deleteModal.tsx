import * as solid from "solid-js";
import { useTransContext } from "@mbarzda/solid-i18next";

import GradientButton from "Components/Button/gradientButton/gradientButton";
import ModernModal from "Components/Modal/ModernModal/ModernModal";
import TranslateText from "Components/TranslateText/translateText";

import clearStorage from "Utils/Storage/clear/clearStorage";
import deleteDatabase from "Utils/Storage/database/deleteDatabase";
import { deleteLocalStorage } from "Utils/Storage/LocalStorage/deleteLocalStorage";

import { showDeleteSettingsModal, setShowDeleteSettingsModal, setCanBegin } from "../titleState";


const TitleDeleteModal: solid.Component = () => {

    const [t, intl] = useTransContext();

    function deleteData(func: Function) {
        func();
        setCanBegin(false);
    }

    return (
        <ModernModal
            muted
            show={showDeleteSettingsModal()}
            title={t("title.settings.deleteDataModal.title").toString()}
            onClickBackground={() => setShowDeleteSettingsModal(false)}
            interactions={[{ label: t("title.settings.deleteDataModal.cancel").toString(), onClick: () => setShowDeleteSettingsModal(false) }]} >
            <TranslateText key="title.settings.deleteDataModal.description" />
            <GradientButton onClick={() => deleteData(deleteLocalStorage)}><TranslateText key="title.settings.deleteDataModal.saveData" /></GradientButton>
            <GradientButton onClick={() => deleteData(deleteDatabase)}><TranslateText key="title.settings.deleteDataModal.resources" /></GradientButton>
            <GradientButton onClick={() => deleteData(clearStorage)}><TranslateText key="title.settings.deleteDataModal.all" /></GradientButton>
        </ModernModal>
    )
}

export default TitleDeleteModal;