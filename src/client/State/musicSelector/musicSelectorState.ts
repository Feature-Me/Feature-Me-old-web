import {atom} from 'recoil';
import { MusicAssetContents } from 'Utils/resources/musicResources/installMusic';

interface musicSelect{
    selectedName:string;
    selectedData:MusicAssetContents|{};
    search:string;
}

const musicSelectorState = atom<musicSelect>({
    key: 'musicSelectorState',
    default: {
        selectedName: JSON.parse(localStorage.getItem("musicSelect") || "{}").selected as string || "",
        selectedData: {},
        search: ""
    }
});

export default musicSelectorState;
export type { musicSelect };
