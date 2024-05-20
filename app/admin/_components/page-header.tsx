import React from "react";

const PageHeader = ({ children }: React.ReactNode) => {
    return <h1 className="text-4xl font-semibold">{children}</h1>;
};

export default PageHeader;
