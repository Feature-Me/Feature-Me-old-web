import React from "react";
import { useRecoilState } from "recoil";

import style from "./musicListContent.scss";

import arrayBufferToBase64 from "../../../../Utils/ArrayBufferToBase64/ArrayBufferToBase64";

import musicSelectorState from "State/play/musicSelector/musicSelectorState";


const MusicListContent: React.FC<{ data: MusicAssetContents }> = (props) => {
    const [musicSelector, setMusicSelector] = useRecoilState(musicSelectorState);
    const contentRef = React.useRef<HTMLDivElement>(null);
    const background = `data:${props.data.metadata.thumbnail.mime || "image/png"};base64,${arrayBufferToBase64(props.data.metadata.thumbnail.data)}`
    const musicSelectCache = JSON.parse(localStorage.getItem("musicSelect")!);

    function select() {
        setMusicSelector(data => {
            return {
                ...data,
                selectedName: props.data.metadata.title,
                selectedData: props.data
            }
        }
        );
        musicSelectCache.selected = props.data.metadata.title;
        localStorage.setItem("musicSelect", JSON.stringify(musicSelectCache));
    }

    React.useEffect(() => {
        if (!contentRef.current) return;
        if (musicSelector.selectedName == "" && props.data.metadata.title == "Tutorial") {
            contentRef.current.classList.add(style.selected);
            select();
        } else if (musicSelector.selectedName == props.data.metadata.title) {
            contentRef.current.classList.add(style.selected);
            select();
        }

    }, []);

    React.useEffect(() => {
        if (!contentRef.current) return;
        contentRef.current.style.left = -contentRef.current.offsetTop * 0.125 + "px";
    }, [musicSelector]);


    React.useEffect(() => {
        if (!contentRef.current) return;
        if (musicSelector.selectedName === props.data.metadata.title) contentRef.current.classList.add(style.selected);
        else contentRef.current.classList.remove(style.selected);
    }, [musicSelector.selectedName]);

    return (
        <div className={style.musiclistcontent} ref={contentRef} onClick={select}>
            <img src={background} alt="" />
            <div className={style.text}>
                <h3>{props.data.metadata.title}</h3>
            </div>
        </div>

    )
}

export default MusicListContent;