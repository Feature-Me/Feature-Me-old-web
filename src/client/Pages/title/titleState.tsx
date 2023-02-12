import { createSignal } from "solid-js";

export const [canBegin, setCanBegin] = createSignal(true);

export const [showModal, setShowModal] = createSignal(false);

export const [showDeleteSettingsModal, setShowDeleteSettingsModal] = createSignal(false);
