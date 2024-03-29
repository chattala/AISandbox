import { FileAudioIcon, MessagesSquareIcon } from "lucide-react";
import React, { memo } from "react";
import { Handle, NodeProps, Position, Node, useNodeId } from "reactflow";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import NodeHandle from "../Shared/Handle";
import NodeBody from "../Shared/Body";
import useAppState from "@/app/state/appState";
import NodeTitle from "../Shared/Title";
import NodeExecutionTime from "../Shared/ExecutionTime";

const WhisperNode = ({ data, isConnectable }: NodeProps) => {
  const nodeId = useNodeId() || ""; 
  const { zenMode, showStats } = useAppState();
  const [hover, setHover] = React.useState(false);

  return (
    <div className="flex flex-col items-center">
      <NodeTitle hover={hover} title="Whisper" zenMode={zenMode} />
      <NodeBody setHover={setHover} className="p-6">
        <FileAudioIcon strokeWidth={1} size={32} />

        <NodeHandle
          type="target"
          position={Position.Left}
          isConnectable={isConnectable}
          id="audio"
          nodeId={nodeId}
        />

        <NodeHandle
          id="text"
          type="source"
          position={Position.Right}
          isConnectable={isConnectable}
          nodeId={nodeId}
        />
      </NodeBody>{" "}
      <NodeExecutionTime showStats={showStats} data={data} />
    </div>
  );
};

export default memo(WhisperNode);
