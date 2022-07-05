import * as React from 'react';
import gameData from 'dataController/gameData/gameData';

import style from "./musicSelect.scss"
import Head from 'global/head/head';
import switchPage from 'global/sceneChanger/swtchPage';

const SelectMusic: React.FC<{ backFunc?: Function }> = (props) => {
    const backFunc = props.backFunc || function () { switchPage("play") }
    return (
        <div className={style.menu}>
            <Head title='Select Music' backFunc={backFunc} />
        </div>
    )
}


export default SelectMusic;