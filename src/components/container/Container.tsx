import type {ReactNode} from "react";


type ContainerProps = {
    children: ReactNode;
};

function Container({ children }: ContainerProps ) {
    return (
        <div className="w-full max-w-7xl mx-auto px-4">
            {children}
        </div>
    )

}

export default Container;