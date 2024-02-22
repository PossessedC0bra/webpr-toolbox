import {Textarea} from "./ui/textarea";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs";
import {Button} from "./ui/button";
import {Input} from "./ui/input";
import {CheckCircle, HelpCircle, Play, XCircle} from "lucide-react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "./ui/resizable";
import {Code} from "nextra/components";
import {Separator} from "./ui/separator";
import {useRef, useState} from "react";

const RETURN_VALUE_ASSERT = "return";
const TEST_CASE_ASSERT = "test";

const CodeRunResult = ({success, evaluationResult, isTestCase, test}) => {
    return <div
        className={`flex flex-col items-center ${success !== null ? success ? 'text-success' : 'text-destructive' : ''}`}>
        {success === null
            ? <>
                <HelpCircle size={64} absoluteStrokeWidth></HelpCircle>
                Run the code to see the result
            </>
            : success
                ? <>
                    <CheckCircle size={64} absoluteStrokeWidth></CheckCircle>
                    Correct
                </>
                : <>
                    <XCircle size={64} absoluteStrokeWidth></XCircle>
                    Incorrect
                </>
        }
        {evaluationResult !== null && !success
            ? <div className={"m-2"}>
                {isTestCase
                    ? <>
                        The test case
                        &nbsp;
                        <Code>{test}</Code>
                        &nbsp;
                        evaluated to
                        &nbsp;
                        <Code>false</Code>
                    </>
                    : <>
                        Expected: <Code>{test}</Code>
                        <br/>
                        Actual: <Code>{evaluationResult}</Code>
                    </>
                }
            </div>
            : null
        }
    < /div>

}

const CodeRunner = () => {
    const activeTabRef = useRef(RETURN_VALUE_ASSERT);

    const [code, setCode] = useState("");
    const [test, setTest] = useState("");

    const [evaluationResult, setEvaluationResult] = useState(null);
    const success = evaluationResult === null
        ? null
        : activeTabRef.current === RETURN_VALUE_ASSERT
            ? evaluationResult === test
            : evaluationResult === true + "";

    const evaluateCode = () => {
        const activeTab = activeTabRef.current;

        let evaluationResult;
        try {
            evaluationResult = eval(activeTab === RETURN_VALUE_ASSERT ? code : code + test);
        } catch (e) {
            evaluationResult = e;
        }

        setEvaluationResult(evaluationResult + "");
    }

    return <ResizablePanelGroup className={"py-4"} direction={"horizontal"}>
        <ResizablePanel className={"mr-2"} minSize={60} defaultSize={80}>
            <Textarea
                className={"h-full rounded-none resize-none"}
                placeholder={"Code"}
                onChange={e => {
                    setCode(e.target.value);
                    setEvaluationResult(null);
                }}
            />
        </ResizablePanel>
        <ResizableHandle withHandle/>
        <ResizablePanel className={"ml-2 flex flex-col gap-2"} minSize={20}>
            <div className={"flex flex-col justify-between h-[60%]"}>
                <Tabs className={"flex-grow flex flex-col"} defaultValue="return" onValueChange={e => {
                    activeTabRef.current = e;

                    setEvaluationResult(null);
                    setTest("");
                }}>
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="return">
                            Return Value
                        </TabsTrigger>
                        <TabsTrigger value="test">
                            Test Case
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent className={"flex-grow"} value="return">
                        <div className={"grid gap-2"}>
                            Enter the expected return value of the code snippet below:
                            <Input placeholder={"Expected"}
                                   onChange={e => {
                                       setTest(e.target.value);
                                       setEvaluationResult(null);
                                   }}/>
                        </div>
                    </TabsContent>
                    <TabsContent className={"flex-grow"} value="test">
                        <div className={"h-full flex flex-col gap-2"}>
                            Enter the test case for the code snippet below. The test case must end with a
                            boolean statement that will be evaluated:
                            <Textarea className={"resize-none flex-grow"}
                                      placeholder={"Test case"}
                                      onChange={e => {
                                          setTest(e.target.value);
                                          setEvaluationResult(null)
                                      }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
                <Button className={"w-full mt-2"} onClick={evaluateCode}>
                    <Play className="mr-2 h-4 w-4"/>
                    Run
                </Button>
            </div>
            <Separator/>
            <div className={"grid justify-center items-center h-[40%]"}>
                <CodeRunResult success={success}
                               evaluationResult={evaluationResult}
                               isTestCase={activeTabRef.current === TEST_CASE_ASSERT}
                               test={test}
                />
            </div>
        </ResizablePanel>
    </ResizablePanelGroup>
}

export default CodeRunner;