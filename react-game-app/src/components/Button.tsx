interface Props {
  color?: string;
  text: string;
  onClickButton: () => void;
}

function Button({ text, onClickButton, color = "primary" }: Props) {
  return (
    <div>
      <button
        type="button"
        className={`btn btn-${color}`}
        onClick={onClickButton}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
