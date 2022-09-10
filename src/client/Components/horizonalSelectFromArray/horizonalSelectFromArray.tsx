import React from "react";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import style from "./horizonalSelectFromArray.scss";


const HorizonalSelectFromArray: React.FC<{ contents: Array<inputContents>, className?: string, onChange?: Function, value: inputContents }> = (props) =>{
    const [value, setValue] = React.useState<string>(props.value.value);
    const [label, setLabel] = React.useState<string>(props.value.label);
    const [index,setIndex] = React.useState<number>(props.contents.findIndex(c=>c==props.value)||0);

    //when < or > button clicked,index is changed.after,value will be changed
    React.useEffect(()=>{
        const value = props.contents[index].value;
        const label = props.contents[index].label;
        setValue(value);
        setLabel(label);
        if(props.onChange) props.onChange({value,label});

    },[index])

    function handleClick(num:number){
        let value = index;
        value+=num;
        if(value<0) value = props.contents.length -1;
        else if (value > props.contents.length - 1) value = 0;

        setIndex(value);
    }

    return(
        <div className={`${style.horizonalSelect} ${props.className || ""}`}>
            <div className={style.arrowBtn} onClick={()=>handleClick(-1)}>
                <MdOutlineArrowBackIos />
            </div>
            <div className={style.label}>
                <span>{label}</span>
                <div className={style.indexPoint}>
                    {
                        props.contents.map((value,indexNum)=>{
                            return(
                                //if indexNum == index,this will be blue.
                                <div key={indexNum} data-index={String(Boolean(indexNum == index))}></div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={style.arrowBtn} onClick={() => handleClick(1)}>
                <MdOutlineArrowForwardIos />
            </div>
        </div>
    )
}

export default HorizonalSelectFromArray;