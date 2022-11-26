import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import TranslateText from "Components/TranslateText/TranslateText";
import React from "react";

import style from "./errorBoundary.scss"
import ErrorModal from "./errorModal";
import StackTrace from "./stackTrace";

class ErrorBoundary extends React.Component {
    children: React.ReactNode
    state: { error: Error | null, errorInfo: { componentStack: string } | null }
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { error: null, errorInfo: null };
        this.children = props.children;
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
        // You can also log the error to an error reporting service
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }


    render() {
        if (this.state.error || this.state.errorInfo) {
            // You can render any custom fallback UI
            return (
                <div className={style.errorPage}>
                    <div className={style.errorDetails}>
                        <h1><TranslateText defaultValue="Game Crashed." content="crashHandler.header" /></h1>
                        <p><TranslateText defaultValue="An Critical Error has occured." content="crashHandler.description" /></p>
                        <div className={style.interaction}>
                            <ChamferedButton onClick={() => location.reload()} > <TranslateText content="crashHandler.interaction.relaunch" /></ChamferedButton>
                            <ChamferedButton onClick={() => window.open("https://github.com/Feature-Me/Feature-Me/issues")}><TranslateText content="crashHandler.interaction.report" /></ChamferedButton>
                        </div>
                        <div className={style.errorMessage}>
                            <p><TranslateText defaultValue="Error details" content="crashHandler.details" /></p>
                            <h2>{this.state.error?.toString()}</h2>
                            <hr />
                            <div className={style.stackTraces}>
                                <div className={style.trace}>
                                    <h2><TranslateText defaultValue="Stack Trace" content="crashHandler.stackTrace" end=":" /></h2>
                                    <StackTrace stack={this.state.error?.stack || ""} isComponent={false} />
                                </div>
                                <div className={style.trace}>
                                    <h2><TranslateText defaultValue="Component Trace" content="crashHandler.componentTrace" end=":" /></h2>
                                    <StackTrace stack={this.state.errorInfo?.componentStack || ""} isComponent={true} />
                                </div>
                                <hr />
                                <hr />
                                <details className={style.rawTrace}>
                                    <summary><TranslateText defaultValue="View raw Error" content="crashHandler.viewRawError" /></summary>
                                    <code>
                                        {this.state.error?.stack}
                                    </code>
                                </details>
                                <details className={style.rawTrace}>
                                    <summary><TranslateText defaultValue="View raw Component Stack" content="crashHandler.viewRawComponent" end=":" /></summary>
                                    <code>
                                        {this.state.errorInfo?.componentStack}
                                    </code>
                                </details>
                            </div>
                        </div>
                    </div>
                    <ErrorModal message={this.state.error?.message||""} />
                </div>
            )
        }
        return this.children
    }
}

export default ErrorBoundary;