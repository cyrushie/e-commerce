import { ImSpinner9 } from "react-icons/im";

const AdminPageLoading = () => {
    return (
        <div className="h-[68vh] w-full flex justify-center items-center">
            <ImSpinner9 className="h-12 w-12 animate-spin text-secondary " />
        </div>
    );
};

export default AdminPageLoading;
