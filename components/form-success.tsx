interface FormSuccessProps {
  message: string;
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  return <div className="text-sm text-emerald-500 w-full">{message}</div>;
};

export default FormSuccess;
