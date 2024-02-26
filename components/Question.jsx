import {useState} from "react";
import {Button} from "./ui/button";
import {Code} from "nextra/components";
import {CheckSquare, Play, X} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "./ui/tooltip";

const ResultButton = ({expectedValue, actualValue, children}) => {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent align={"end"}>
                <p>Expected: <Code>{expectedValue + ""}</Code></p>
                <p>Actual: <Code>{actualValue + ""}</Code></p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>;

}

const Question = ({question, code, expectedValue, children}) => {
    // variable for storing the result of the code evaluation
    const [evaluationResult, setEvaluationResult] = useState(null);

    const success = evaluationResult === null ? null : evaluationResult === expectedValue + "";

    const evaluateCode = () => {
        let result;
        try {
            result = eval(code);
        } catch (e) {
            result = e;
        }

        setEvaluationResult(result + "");
    }

    return (<>
            <div className={"mt-2 flex justify-between items-center"}>
                <div>{question}</div>
                {
                    success === null
                        ? <Button onClick={evaluateCode}>
                            <Play className="mr-2 h-4 w-4"/> Run
                        </Button>
                        : success
                            ? <Button className={"cursor-default disabled:opacity-100"} disabled
                                      variant={"success"}><CheckSquare className="mr-2 h-4 w-4"/> Correct</Button>
                            :
                            <ResultButton expectedValue={expectedValue}
                                          actualValue={evaluationResult}>
                                <Button className={"cursor-help"}
                                        variant={"destructive"}><X className="mr-2 h-4 w-4"/> Incorrect</Button>
                            </ResultButton>
                }
            </div>
            {children}
        </>
    );
};

export default Question;