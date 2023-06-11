import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileAudioIcon, MessagesSquareIcon, View } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";

export const executeYoloXNode = async (node: Node, previousNode: Node) => {
  // const newForm = new FormData();
  // newForm.append("file", previousNode.data.output.image);
  // const response = await axios.post("/api/yolox", newForm);

  const dataJSON = await fetch("/api/yolox", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: previousNode.data.output.image }),
  });

  const data = await dataJSON.json();

  node.data.output.text = data.text;
  node.data.hasComputed = true; // TODO : Is hasComputed needed?
  return node;
};

const YoloXNode = memo(({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; // TODO : Fix this
  const [hover, setHover] = React.useState(false);

  return (
    <div>
      <div
        className={`flex-col ml-2 mb-1 transition-opacity ${
          hover ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <h1 className="text-md font-semibold text-foreground">YoloX</h1>
      </div>

      <div
        className="bg-background flex flex-col items-center justify-center rounded-md drop-shadow-lg border-[1px] border-solid border-foreground/10 relative p-6"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <View size={32} />

        <Handle
          className="!bg-foreground/50 !border-none"
          type="target"
          position={Position.Left}
          id="image"
          isConnectable={isConnectable}
        />

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Handle
                className="!bg-foreground/50 !border-none"
                type="source"
                position={Position.Right}
                id="text"
                isConnectable={isConnectable}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{nodeId}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
});

YoloXNode.displayName = "YoloXNode";

export default YoloXNode;
