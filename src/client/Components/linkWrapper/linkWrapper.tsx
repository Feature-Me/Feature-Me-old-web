import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import useSeneChangeNavigation from "Hooks/scenechange/useSceneChangeNavigation";

interface linkWrapperPropsType {
    children?: React.ReactNode,
    to: string,
    className?: string,
    state?:any;
}

const LinkWrapper: React.FC<linkWrapperPropsType> = (props): JSX.Element => {
    const navigate = useSeneChangeNavigation();

    function handleClick(e: React.MouseEvent<HTMLDivElement>): void {
        navigate(props.to,{state:props.state});
    }

    return (
        <div onClick={handleClick} className={props.className}>
        {props.children}
        </div>
    )
}

export default LinkWrapper;