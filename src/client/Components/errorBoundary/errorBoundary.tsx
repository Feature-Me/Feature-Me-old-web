import React from "react";

class ErrorBoundary extends React.Component {
    children: React.ReactNode
    state:{error:any,errorInfo:any}
    constructor(props: {children:React.ReactNode}) {
        super(props);
        this.state = { error: null, errorInfo: null };
        this.children = props.children;
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        
    }

    render() {
        if (this.state.error||this.state.errorInfo) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h1>Game Crashed.</h1>
                    <p>An Critical Error has occured.</p>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <summary>Error details</summary>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            )
        }
        return this.children
    }
}

export default ErrorBoundary;