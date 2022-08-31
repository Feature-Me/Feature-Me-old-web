import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";


const LinkWrapper: React.FC<{children?:React.ReactNode,to:string,className?:string}> = (props): JSX.Element => {
    const navigate = useSeneChangeNavigation();

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>): void {
        navigate(props.to);
    }

    return (
        <span onClick={handleClick} className={props.className}>
        {props.children}
        </span>
    )
}

export default LinkWrapper;