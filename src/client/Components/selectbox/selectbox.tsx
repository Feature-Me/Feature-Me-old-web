import * as React from 'react';
import { motion, useAnimation } from 'framer-motion';

import style from './selectbox.scss';

interface selectBoxPropsType extends propsType {
    contents: Array<selectContents>,
    onChange?: FunctionWithTypedProps<selectContents>
    value: selectContents
}

interface selectBoxSelectorPropsType {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    contents: Array<selectContents>,
    onChange: FunctionWithTypedProps<selectContents>,
    setValue: React.Dispatch<React.SetStateAction<any>>,
    setLabel: React.Dispatch<React.SetStateAction<React.ReactNode>>
}

const SelectBox: React.FC<selectBoxPropsType> = (props): JSX.Element => {
    const [value, setValue] = React.useState<any>(props.value.value);
    const [label, setLabel] = React.useState<React.ReactNode>(props.value.label);
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className={style.selectbox} onClick={e => { e.stopPropagation(); setIsOpen(!isOpen) }} onBlur={() => { setIsOpen(false) }} tabIndex={0}>
            <p className={style.valuelabel}>{label}</p>
            <Selector isOpen={isOpen} setIsOpen={setIsOpen} contents={props.contents} onChange={props.onChange || (() => { })} setValue={setValue} setLabel={setLabel} />
        </div>
    )
}

const Selector: React.FC<selectBoxSelectorPropsType> = (props): JSX.Element => {
    const animationController = useAnimation();
    const [animating, setAnimating] = React.useState(false);
    const initialAnimation = { opacity: 0, y: -50, }

    const showSelector = { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut", } }
    const hideSelector = { opacity: 0, y: -50, transition: { duration: 0.3, ease: "easeOut", } }

    React.useEffect(() => {
        let animationTimeout: NodeJS.Timeout;
        if (props.isOpen) {
            animationController.start(showSelector);
            setAnimating(true);
            animationTimeout = setTimeout(() => {
                setAnimating(false);
            }, 300);
        }
        else {
            animationController.start(hideSelector);
            setAnimating(true);
            animationTimeout = setTimeout(() => {
                setAnimating(false);
            }, 300);
        }
        return () => {
            clearTimeout(animationTimeout);
        }

    }, [props.isOpen]);

    return (
        <motion.div className={`${style.selector} ${props.isOpen && !animating ? "" : style.inactive}`} initial={initialAnimation} animate={animationController} onClick={e => { e.preventDefault() }}>
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