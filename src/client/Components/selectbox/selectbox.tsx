import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';

import style from './style.scss';



const SelectBox: React.FC<{contents:Array<inputContents>,onChange:Function,value:inputContents}> = (props):JSX.Element => {
    const [value, setValue] = React.useState<string>(props.value.value);
    const [label, setLabel] = React.useState<string>(props.value.label);
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={style.selectbox}  onClick={e=>{e.stopPropagation();setIsOpen(!isOpen)}} onBlur={()=>{setIsOpen(false)}} tabIndex={0}>
            <p className={style.valuelabel}>{label}</p>
            <Selector isOpen={isOpen} setIsOpen={setIsOpen} contents={props.contents} onChange={props.onChange} setValue={setValue} setLabel={setLabel} />
        </div>
    )
}

const Selector: React.FC<{isOpen:boolean,setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,contents:Array<inputContents>,onChange:Function,setValue:Function,setLabel:Function}> = (props):JSX.Element => {
    const animationController = useAnimation();
    const [animating, setAnimating] = React.useState(false);
    const initialAnimation = {
        opacity: 0,
        y: -50,
    }

    const showSelector = {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        }
    }
    const hideSelector = {
        opacity: 0,
        y: -50,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        }
    }

        React.useEffect(() => {
            if(props.isOpen) {
                animationController.start(showSelector);
                setAnimating(true);
                setTimeout(() => {
                    setAnimating(false);
                }, 300);
            }
            else {
                animationController.start(hideSelector);
                setAnimating(true);
                setTimeout(() => {
                    setAnimating(false);
                }, 300);
            }
            
        }, [props.isOpen]);

    return(
        <motion.div className={`${style.selector} ${props.isOpen&&!animating ? "" : style.inactive}`} initial={initialAnimation} animate={animationController} onClick={e=>{e.preventDefault()}}>
            {props.contents.map((content, index) => {
                return (
                    <div key={index} className={style.option} onClick={() => {
                        animationController.start(hideSelector);
                        props.setLabel(content.label);
                        props.setValue(content.value);
                        props.onChange(content);
                        setTimeout(() => {
                            props.setIsOpen(false);
                        }, 300);
                    }}>
                        <p>{content.label}</p>
                    </div>
                )
            })}
        </motion.div>
    )
}

export default SelectBox;