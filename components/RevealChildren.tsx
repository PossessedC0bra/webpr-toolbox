import React, {useState} from "react";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import {Eye} from "lucide-react";

export interface RevealChildrenProps {
    children: React.ReactNode;
}

const RevealChildren = ({children}: RevealChildrenProps) => {
    const [showChildren, setShowChildren] = useState(false);

    // use classes min-w-[150px] and min-h-[40px] to always fit the button regardless of the content
    return <div className={"relative min-w-[150px] min-h-[40px] flex justify-center items-center"}>
        <div className={`w-full h-full grid ${!showChildren ? "blur-sm pointer-events-none" : ""}`}>
            {children}
        </div>
        {!showChildren &&
            <ButtonWithIcon className={"absolute"} Icon={Eye} variant={"outline"} onClick={() => setShowChildren(true)}>
                Show solution
            </ButtonWithIcon>
        }
    </div>
}

export default RevealChildren;