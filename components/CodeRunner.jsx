import {Textarea} from "./ui/textarea";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./ui/tabs";
import {Button} from "./ui/button";
import {useRef, useState} from "react";
import {Input} from "./ui/input";
import {CheckCircle, HelpCircle, Play, XCircle} from "lucide-react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "./ui/resizable";
import {Code} from "nextra/components";
import {Separator} from "./ui/separator";

const RETURN_VALUE_ASSERT = "return";
const TEST_ASSERT = "test";

const CodeRunner = () => {
    const activeTabRef = useRef(RETURN_VALUE_ASSERT);

    const [code, setCode] = useState("");
    const [test, setTest] = useState("");

    const [hasError, setHasError] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(null);
    const success = evaluationResult === null
        ? null
        : activeTabRef.current === RETURN_VALUE_ASSERT
            ? evaluationResult === test
            : evaluationResult === true + "";

    const onTabChange = (e) => {
        activeTabRef.current = e;

        setEvaluationResult(null);
        setTest("");
    }

    const evaluateCode = () => {
        const activeTab = activeTabRef.current;

        let evaluationResult = null;
        try {
            evaluationResult = eval(activeTab === RETURN_VALUE_ASSERT ? code : code + test);
        } catch (e) {
            setHasError(true);
            evaluationResult = e;
        }

        setEvaluationResult(evaluationResult + "");
    }

    return <>
        <ResizablePanelGroup className={"py-4"} direction={"horizontal"}>
            <ResizablePanel className={"mr-2"} minSize={50} defaultSize={75}>
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
            <ResizablePanel className={"ml-2"} minSize={25}>
                <ResizablePanelGroup direction={"vertical"}>
                    <ResizablePanel className={"pb-2 flex flex-col justify-between"} defaultSize={60}>
                        <Tabs className={"flex-grow flex flex-col"} defaultValue="return" onValueChange={onTabChange}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="return">Return Value</TabsTrigger>
                                <TabsTrigger value="test">Test Case</TabsTrigger>
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
                                    boolean
                                    statement that will be evaluated:
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
                        <Button className={"w-full mt-2"} onClick={evaluateCode}><Play
                            className="mr-2 h-4 w-4"/> Run
                        </Button>
                    </ResizablePanel>
                    <Separator/>
                    <ResizablePanel className={"pt-2"}>
                        <div className={"h-full grid justify-center items-center"}>
                            <div
                                className={`flex flex-col items-center gap-2 ${success !== null ? success ? 'text-success' : 'text-destructive' : ''}`}>
                                {
                                    success === null
                                        ? <HelpCircle size={64} absoluteStrokeWidth></HelpCircle>
                                        : success
                                            ? <CheckCircle size={64} absoluteStrokeWidth></CheckCircle>
                                            : <XCircle size={64} absoluteStrokeWidth></XCircle>
                                }
                                <h1>
                                    {
                                        success === null
                                            ? "Run the code to see the result"
                                            : success
                                                ? "Correct"
                                                : "Incorrect"
                                    }
                                </h1>
                                {evaluationResult !== null && !success
                                    && (<div className={"text-auto mt-2"}>
                                        <p>
                                            Expected: <Code>{test}</Code>
                                        </p>
                                        <p>
                                            Actual: <Code>{evaluationResult}</Code>
                                        </p>
                                    </div>)
                                }
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    </>
}

export default CodeRunner;