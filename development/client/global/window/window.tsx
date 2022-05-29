import * as React from 'react';
import style from "./window.scss";
import { VscClose } from 'react-icons/vsc';
import { motion, useAnimation } from 'framer-motion';

const Window: React.FC<{ className?: Array<string> | string, title: string, showWindow: boolean, setShowWindow: React.Dispatch<React.SetStateAction<boolean>>, children: JSX.Element }> = (props): JSX.Element => {
    const animationController = useAnimation();
    const WindowRef = React.useRef<HTMLDivElement>(null);
    const initialAnimation = {
        opacity: 0,
        y: 100,
    }
    const animation = {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        }
    }
    const exitAnimation = {
        opacity: 0,
        y: 100,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        }
    }

    function closeWindow(): void {
        props.setShowWindow(false);
    }

    React.useEffect(() => {
        if (props.showWindow) {
            WindowRef.current?.setAttribute("data-open", "true");
            animationController.start(animation);
        }
        else {
            animationController.start(exitAnimation);
            setTimeout(() => {
                WindowRef.current?.setAttribute("data-open", "false");
            }, 300);
        }
    }, [props.showWindow]);

    return (
        <div className={`${style.window} ${props.className ? typeof props.className == "string" ? props.className : props.className!.join("\s") : ""}`} data-open={false} ref={WindowRef}>
            <motion.div initial={initialAnimation} animate={animationController} className={style.animation_wrapper}>
                <div className={style.wrapper}>
                    <div className={style.window_inner}>
                        <div className={style.titlebar}>
                            <h1>{props.title}</h1>
                            <div className={style.closebtn}>
                                <VscClose className={style.close_icon} onClick={closeWindow} />
                            </div>
                        </div>
                        <div className={style.window_content}>
                            {props.children}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Window;