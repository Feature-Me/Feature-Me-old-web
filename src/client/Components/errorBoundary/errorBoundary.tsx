import ChamferedButton from "Components/Button/chamferedButton/chamferedButton";
import React from "react";

import style from "./errorBoundary.scss"
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
                        <h1>Game Crashed.</h1>
                        <p>An Critical Error has occured.</p>
                        <div className={style.interaction}>
                            <ChamferedButton onClick={() => location.reload()}>Relaunch Page</ChamferedButton>
                            <ChamferedButton onClick={() => window.open("https://github.com/Feature-Me/Feature-Me/issues")}>Report</ChamferedButton>

                        </div>
                        <div className={style.errorMessage}>
                            <p>Error Details:</p>
                            <h2>{this.state.error?.toString()}</h2>
                            <hr />
                            <div className={style.stackTraces}>
                                <div className={style.errorTrace}>
                                    <h2>Stack Trace:</h2>
                                    <StackTrace stack={this.state.error?.stack || ""} isComponent={false} />
                                    <hr />
                                    <details>
                                        <summary>View Raw Code</summary>
                                        <code>
                                            {this.state.error?.stack}
                                        </code>
                                    </details>
                                </div>
                                <div className={style.componentTrace}>
                                    <h2>Component Stack:</h2>
                                    <StackTrace stack={this.state.errorInfo?.componentStack || ""} isComponent={true} />
                                    <hr />
                                    <details>
                                        <summary>View Raw Code</summary>
                                        <code>
                                            {this.state.errorInfo?.componentStack}
                                        </code>
                                    </details>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        }
        return this.children
    }
}

export default ErrorBoundary;