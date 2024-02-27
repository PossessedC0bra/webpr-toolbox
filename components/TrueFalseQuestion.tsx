import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import RevealChildren from "@/components/RevealChildren";

export interface TrueFalseQuestionProps {
    question: React.JSX.Element | string;
    answer: boolean;
    children: React.JSX.Element;
}

const TrueFalseQuestion = ({question, answer, children}: TrueFalseQuestionProps) => {
    return <>
        <div className={"mt-2 flex justify-between items-center"}>
            <div>{question}</div>
            <RevealChildren>
                {/* class "h-[40px]" is required to avoid the UI from jumping after revealing the content */}
                <div className={`h-[40px] mr-2 flex gap-4 items-center place-content-end`}>
                    <div className={"flex gap-2"}>
                        <Checkbox id="trueCheckbox" className={"cursor-auto"} checked={answer}/>
                        <Label htmlFor={"trueCheckbox"}>Yes</Label>
                    </div>
                    <div className={"flex gap-2"}>
                        <Checkbox id="trueCheckbox" className={"cursor-auto"} checked={!answer}/>
                        <Label htmlFor={"trueCheckbox"}>No</Label>
                    </div>
                </div>
            </RevealChildren>
        </div>
        {children}
    </>
}

export default TrueFalseQuestion;