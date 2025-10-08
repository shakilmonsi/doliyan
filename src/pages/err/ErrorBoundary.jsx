import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
          <p className="mb-6 text-lg">We're working on fixing this issue</p>
          <Link
            to="/"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Return Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
