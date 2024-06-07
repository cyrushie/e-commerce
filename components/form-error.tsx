interface FormErrorProps {
  message: string | undefined;
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="w-full text-destructive rounded-md  text-sm">{message}</div>
  );
};

export default FormError;
