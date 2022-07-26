import { motion, useAnimation } from "framer-motion";
import React from "react";
import { VscClose } from "react-icons/vsc";
import { SetterOrUpdater } from "recoil";
import style from "./window.scss";

const Window: React.FC<{className?: Array<string>|string,title:string,children:React.ReactNode,showed:boolean,setShowed:React.Dispatch<React.SetStateAction<boolean>>|SetterOrUpdater<boolean>}> = (props) => {
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
    React.useEffect(() => {
        try {
            if (props.showed) {
                WindowRef.current?.setAttribute("data-open", "true");
                animationController.start(animation);
            }
            else {
                animationController.start(exitAnimation);
                setTimeout(() => {
                    WindowRef.current?.setAttribute("data-open", "false");
                }, 300);
            }
        } catch (error) {
            console.log(error);
        }
    }, [props.showed]);

    return (
        <div className={`${style.window} ${props.className ? typeof props.className == "string" ? props.className : props.className!.join("\s") : ""}`} data-open={false} ref={WindowRef}>
            <motion.div initial={initialAnimation} animate={animationController} className={style.animation_wrapper}>
                <div className={style.wrapper}>
                    <div className={style.window_inner}>
                        <div className={style.titlebar}>
                            <h1>{props.title}</h1>
                            <div className={style.closebtn}>
                                <VscClose className={style.close_icon} onClick={() => {props.setShowed(false)}} />
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