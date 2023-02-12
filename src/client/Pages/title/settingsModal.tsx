import ModernModal from "Components/Modal/ModernModal/ModernModal";
import { useI18n } from "intl/intlContext";
import *  as solid from "solid-js";
import { showModal, setShowModal } from "./titleState";

const SettingsModal: solid.Component = (props) => {

    const [t, intl] = useI18n();

    return (
        <ModernModal title={t("title.settings.title").toString()} show={showModal()} interactions={[{ label: t("title.settings.close").toString(), onClick: () => setShowModal(false) }]} onClickBackground={() => setShowModal(false)} >
            
        </ModernModal>
    )
}

export default SettingsModal;