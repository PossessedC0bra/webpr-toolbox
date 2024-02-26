import {Textarea} from "./ui/textarea";
import {Button} from "./ui/button";
import {Play} from "lucide-react"

const Assignment = ({description, children}) => {

    return <div className={"mt-2 flex flex-col gap-2"}>
        {description}
        <div>
            <Textarea
                className={"resize-none"}
                placeholder={"Code"}
            />
            Remaining characters: 512
        </div>
        Your solution will be tested against:
        {children}
        <Button className={"w-full"}>
            <Play className='mr-2 h-4 w-4'/> Run
        </Button>
    </div>
}

export default Assignment;