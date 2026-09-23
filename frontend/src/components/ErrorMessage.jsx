function ErrorMessage({ message = "Something went wrong." }) {
  return (
    <div className="status-container error-message">
      <h2>Oops!</h2>
      <p>{message}</p>
      <button
        className="retry-btn"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );
}

export default ErrorMessage;