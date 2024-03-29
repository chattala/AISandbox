import { Node } from "reactflow";
import { executeCreatePromptNode } from "./others/utils";
import { executeOpenAIChatGPTNode } from "./chatgpt/util";
import { executeStableDiffusionNode } from "./stablediffusion/util";
import { executeWhisperNode } from "./whisper/util";
import { executeYoloXNode } from "./yolox/util";
import { executeTortoiseTTSNode } from "./tortoisetts/util";
import {
  executeDollyV2Node,
  executeMpt7bNode,
  executeOpenAssistantNode,
  executeStableLMNode,
  executeVicuna13BNode,
} from "./replicatellm/util";

const modelFuncMapping = {
  OpenAIChatGPTNode: executeOpenAIChatGPTNode,
  StableDiffusionNode: executeStableDiffusionNode,
  WhisperNode: executeWhisperNode,
  YoloXNode: executeYoloXNode,
  TortoiseTTSNode: executeTortoiseTTSNode,
  Vicuna13B: executeVicuna13BNode,
  DollyV2: executeDollyV2Node,
  Mpt7b: executeMpt7bNode,
  OpenAssistant: executeOpenAssistantNode,
  StableLM: executeStableLMNode,
};

export const nodeExecution = async (
  node: Node,
  previousNodes: Node[],
  isFrontEnd: boolean
): Promise<Node> => {
  const type = node.type;

  if (type === undefined) {
    throw new Error("Invalid Node");
  }

  try {
    if (
      previousNodes.length === 1 &&
      modelFuncMapping[type as keyof typeof modelFuncMapping]
    ) {
      const outNode = await modelFuncMapping[
        type as keyof typeof modelFuncMapping
      ](
        node,
        previousNodes[0],
        isFrontEnd,
        isFrontEnd
          ? {
              ProjectId: window.location.pathname.split("/")[2], // TODO : Hacky way to get project id
              // UserId : NOTE: is added in the middleware, should be here
            }
          : {}
      );

      outNode.data.hasComputed = true; // TODO : Is hasComputed needed?

      return outNode;
    } else if (previousNodes.length === 0) {
      node.data.hasComputed = true;
      return node;
    } else if (type === "CreatePromptNode") {
      return executeCreatePromptNode(node, previousNodes);
    } else if (previousNodes.length === 1) {
      node.data = {
        ...node.data,
        hasComputed: true,
        input: previousNodes[0].data.output, // TODO: This is a hack, need to fix this
        output: previousNodes[0].data.output,
      };

      return node;
    } else {
      throw new Error("Invalid Node");
    }
  } catch (err) {
    console.log("RUN ERROR EXECUTING NODE", err);
    return node;
  }
};
