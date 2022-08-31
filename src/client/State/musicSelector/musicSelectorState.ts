import {atom} from 'recoil';



const musicSelectorState = atom<musicSelectType>({
    key: 'musicSelectorState',
    default: {
        selectedName: JSON.parse(localStorage.getItem("musicSelect") || "{}").selected as string || "",
        selectedData: {},
        search: ""
    }
});

export default musicSelectorState;
