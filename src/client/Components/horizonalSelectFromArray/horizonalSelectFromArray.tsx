import React from "react";
import { VscChevronLeft, VscChevronRight } from "react-icons/vsc";
import style from "./horizonalSelectFromArray.scss";

interface horizonalSelectPropsType extends propsType {
    contents: Array<selectContents>
    onChange?: FunctionWithTypedProps<selectContents>
    value: selectContents
}

const HorizonalSelectFromArray: React.FC<horizonalSelectPropsType> = (props) =>{
    const [value, setValue] = React.useState<any>(props.value.value);
    const [label, setLabel] = React.useState<React.ReactNode>(props.value.label);
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
                <VscChevronLeft />
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
                <VscChevronRight />
            </div>
        </div>
    )
}

export default HorizonalSelectFromArray;