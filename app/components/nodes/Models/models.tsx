import {
  Bird,
  Bot,
  Brush,
  Dog,
  FileAudioIcon,
  FileVolume2,
  MessagesSquareIcon,
  View,
} from "lucide-react";
import OpenAIChatGPTNode from "./OpenAIChatGPT";
import StableDiffusionNode from "./StableDiffusion";
import TortoiseTTSNode from "./TortoiseTTS";
import WhisperNode from "./Whisper";
import YoloXNode from "./YoloX";
import Vicuna13B from "./vicuna13b";
import StableLM from "./stablelm";
import DollyV2 from "./dollyv2";
import OpenAssistant from "./oasst12b";
import mpt7b from "./mpt7b";

export const modelsNodesData = {
  OpenAIChatGPTNode: {
    name: "ChatGPT",
    description: "OpenAI's ChatGPT model",
    icon: <MessagesSquareIcon />,
  },
  StableDiffusionNode: {
    name: "Stable Diffusion",
    description: "Image generation using Stable Diffusion",
    icon: <Brush />,
  },
  TortoiseTTSNode: {
    name: "Tortoise TTS",
    description: "Text to speech using Tortoise TTS",
    icon: <FileVolume2 />,
  },
  WhisperNode: {
    name: "Whisper",
    description: "Speech to text using OpenAI Whisper",
    icon: <FileAudioIcon />,
  },
  YoloXNode: {
    name: "YoloX",
    description: "Object detection using YoloX",
    icon: <View />,
  },
  Vicuna13B: {
    name: "Vicuna 13B",
    description: "Text to text using Vicuna 13B",
    icon: <MessagesSquareIcon />,
  },
  StableLM: {
    name: "Stable LM",
    description: "Text to text using Stable LM",
    icon: <Bird />,
  },
  DollyV2: {
    name: "Dolly V2",
    description: "Text to text using Dolly V2",
    icon: <Dog />,
  },
  OpenAssistant: {
    name: "Open Assistant",
    description: "Text to text using Open Assistant",
    icon: <Bot />,
  },
  mpt7b: {
    name: "MPT 7B",
    description: "Text to text using MPT 7B",
    icon: <MessagesSquareIcon />,
  },
};

export const modelNodes = {
  OpenAIChatGPTNode,
  StableDiffusionNode,
  WhisperNode,
  YoloXNode,
  TortoiseTTSNode,
  Vicuna13B,
  StableLM,
  DollyV2,
  OpenAssistant,
  mpt7b,
};
