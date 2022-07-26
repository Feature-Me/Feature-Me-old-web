import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import sceneChangerState from "State/sceneChanger/sceneChangerstate";

const LinkWrapper: React.FC<{children?:React.ReactNode,to:string,className?:string}> = (props): JSX.Element => {
    const navigate = useNavigate();
    const [sceneChanger, setSceneChanger] = useRecoilState(sceneChangerState);

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
        setSceneChanger(sceneChanger+1);

        setTimeout(() => {
            navigate(props.to);
        },500);
    }

    return (
        <span onClick={handleClick} className={props.className}>
        {props.children}
        </span>
    )
}

export default LinkWrapper;