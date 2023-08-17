import { RiErrorWarningFill } from "react-icons/ri";

interface Props {
  text: string;
}

const ErrorMessage: React.FC<Props> = ({ text }) => {
  return (
    <p className="text-red-600 font-medium text-sm flex items-center gap-x-1.5 -mt-1 mb-2">
      <span className="text-lg">
        <RiErrorWarningFill />
      </span>
      {text}
    </p>
  );
};

export default ErrorMessage;
