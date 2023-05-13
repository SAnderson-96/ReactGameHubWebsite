import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isDismissable: boolean;
  onCloseClicked: () => void;
}

const Alert = ({ children, isDismissable, onCloseClicked }: Props) => {
  return (
    <div
      className={`alert alert-primary ${
        isDismissable ? "alert-dismissible fade show" : ""
      }`}
      role="alert"
    >
      {children}
      {isDismissable && (
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onCloseClicked}
        ></button>
      )}
    </div>
  );
};

export default Alert;
