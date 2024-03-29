import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Handle, HandleType, Position } from "reactflow";
import { Badge } from "@/app/components/ui/badge";

type NodeHandleProps = {
  type: HandleType;
  position: Position;
  id: string;
  isConnectable: boolean;
  nodeId: string;
  style?: React.CSSProperties;
};

const NodeHandle = (props: NodeHandleProps) => {
  return (
    <div className="flex justify-between items-center gap-2 h-full">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Handle
              className="!bg-foreground/60 !border-[2px] !h-4 !w-2 !rounded-full"
              type={props.type}
              position={props.position}
              id={props.id}
              isConnectable={props.isConnectable}
              style={props.style}
            />
          </TooltipTrigger>
          <TooltipContent>
            <Badge variant="outline">
              {props.type === "source" ? "Output" : "Input"} : {props.id}
            </Badge>{" "}
            <Badge
              variant="outline"
              className="hover:cursor-cell"
              onClick={() => {
                navigator.clipboard.writeText(props.nodeId);
              }}
            >
              ID : {props.nodeId}
            </Badge>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NodeHandle;
