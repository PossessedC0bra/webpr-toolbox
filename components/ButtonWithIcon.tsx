import {Button} from "./ui/button";
import React from "react";
import {LucideProps} from "lucide-react";

export interface ButtonWithIconProps {
    Icon: React.ComponentType<LucideProps>;
    children: React.ReactNode;

    [key: string]: any;
}

const ButtonWithIcon = ({Icon, children, ...props}: ButtonWithIconProps) => (
    <Button {...props} >
        <Icon className="size-4 mr-2"/>
        {children}
    </Button>
);

export default ButtonWithIcon;