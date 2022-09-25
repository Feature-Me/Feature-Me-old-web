import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { motion, useAnimation } from "framer-motion";

import style from "./quickmenu.scss";
import quickmenuState from "State/quickmenu/quickmenuState";
import chatState from "State/chat/chatState";
import useWebSocket from "Hooks/webSocket/useWebSocket";
import { cloneDeep } from "lodash";
import webSocketState from "State/webSocket/webSocketState";

const QuickMenu: React.FC = () => {
    const [quickmenu, setQuickmenu] = useRecoilState(quickmenuState);
    const quickmenuRef = React.useRef<HTMLDivElement>(null)
    const [chat, setChat] = useRecoilState(chatState);
    const webSocket = useRecoilValue(webSocketState);
    const chatWs = useWebSocket("/chat");

    const chatInputRef = React.useRef<HTMLInputElement>(null);

    const bgAnimationController = useAnimation();
    const leftAnimationController = useAnimation();
    const rightAnimationcontroller = useAnimation();

    const initialBg = {
        opacity: 0,
    }
    const fadeInBg = {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: "easeIn",
        }
    }
    const fadeOutBg = {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        }
    }

    const initialLeft = {
        x: "-100%",
    }
    const inLeft = {
        x: 0,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        }
    }
    const outLeft = {
        x: "-100%",
        transition: {
            duration: 0.15,
            ease: "easeOut",
        }
    }

    const initialRight = {
        x: "100%",
    }
    const inRight = {
        x: 0,
        transition: {
            duration: 0.15,
            ease: "easeIn",
        }
    }
    const outRight = {
        x: "100%",
        transition: {
            duration: 0.15,
            ease: "easeOut",
        }
    }

    React.useEffect(()=>{
        //socket events
        chatWs.on("connect",()=>{
            setChat(chat => {
                let rooms = cloneDeep(chat.rooms)
                rooms[chat.room].push({
                    name: "SYSTEM",
                    time: Date.now(),
                    content: "Connected to chat rooms."
                })
                return {
                    ...chat,
                    rooms
                }
            })
        })
        chatWs.on("disconnect",()=>{
            setChat(chat => {
                let rooms = cloneDeep(chat.rooms)
                rooms[chat.room].push({
                    name: "SYSTEM",
                    time: Date.now(),
                    content: "Disonnected from chat rooms."
                })
                return {
                    ...chat,
                    rooms
                }
            })
        })
        chatWs.on("receiveMessage",(message:chatMessageType)=>{
            setChat(chat => {
                let rooms = cloneDeep(chat.rooms)
                rooms[chat.room].push({
                    name: message.name,
                    time: message.time,
                    content: message.content,
                })
                return {
                    ...chat,
                    rooms
                }
            })
        })
    },[])

    React.useEffect(() => {
        if (!quickmenuRef.current) return;
        let hiddenTimeout: NodeJS.Timeout;
        if (quickmenu) {
            //set visible
            quickmenuRef.current.style.visibility = "visible";
            //animation
            bgAnimationController.start(fadeInBg);
            leftAnimationController.start(inLeft);
            rightAnimationcontroller.start(inRight);

        } else {
            //animation
            bgAnimationController.start(fadeOutBg);
            leftAnimationController.start(outLeft);
            rightAnimationcontroller.start(outRight);
            setTimeout(() => {
                if (!quickmenuRef.current) return;
                //set invisible
                quickmenuRef.current.style.visibility = "hidden";
            }, 200);
        }
        return () => {
            clearTimeout(hiddenTimeout);
        }

    }, [quickmenu])

    function hide() {
        setQuickmenu(false);
    }
    function setRoom(room:string){
        setChat(chat=>{
            return{
                ...chat,
                room
            }
        })
    }
    function sendMessage(){
        if(!chatInputRef.current)return;
        const message = chatInputRef.current.value;
        if (message.startsWith("//")) chatWs.emit("command", { name: webSocket.user.name, time: Date.now(), content: message.substring(2) })
        else chatWs.emit("sendMessage",{name:webSocket.user.name,time:Date.now(),content:message})

        chatInputRef.current.value = "";
    }

    return (
        <motion.div className={style.quickmenu} tabIndex={0} ref={quickmenuRef} animate={bgAnimationController} initial={initialBg}>
            {/*left quick menu(chat)*/}
            <motion.div className={style.left} animate={leftAnimationController} initial={initialLeft}>
                <div className={style.chat}>
                    <h2>Chat # {chat.room}</h2>
                    {
                        //show chat messages
                        chat.rooms[chat.room].map((message, index) => {
                            return (
                                <div className={style.chatMessage} key={index}>
                                    {/*author name and time */}
                                    <div className={style.author}>
                                        <span className={style.name}>{message.name}</span>
                                        <span className={style.time}>{new Date(message.time).toLocaleTimeString()}</span>
                                    </div>
                                    {/*chat content */}
                                    <p>{message.content}</p>
                                </div>
                            )
                        })
                    }
                </div>
                {/* chat room selector*/}
                <div className={style.roomSelect}>
                    {
                        Object.keys(chat.rooms).map((room,index)=>{
                            return(
                                <div className={style.roomName} onClick={e => setRoom(room)} data-active={String(Boolean(chat.room == room))} key={index}># {room}</div>
                            )
                        })
                    }
                </div>
                {/*show username*/}
                <div>
                    @{webSocket.user.name}
                </div>
                {/*input field*/}
                <form onSubmit={(e) => {e.preventDefault();sendMessage();return false;}}>
                    <input type="text" className={style.chatText} onBlur={e => e.stopPropagation()} placeholder={`Message #${chat.room}`} disabled={chat.room=="room"} ref={chatInputRef}/>
                </form>
            </motion.div>
            {/*center transparent space*/}
            <div onClick={hide}></div>
            {/*left quick menu(social)*/}
            <motion.div className={style.right} animate={rightAnimationcontroller} initial={initialRight}>
            </motion.div>
        </motion.div>
    );
}

export default QuickMenu;
