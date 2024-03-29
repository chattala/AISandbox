import Replicate from "replicate";
import { Node } from "reactflow";

export const fetchResult = async (data: any) => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN as string,
  });

  const output: any = await replicate.run(data.model_url, {
    input: {
      prompt: data.text,
    },
  });

  const outputText = output.join(" ");

  return {
    text: outputText,
  };
};

const executeNode = async (
  node: Node,
  previousNode: Node,
  model_url: string,
  localExecution: boolean = false
) => {

  let data;
  if (localExecution) {
    const out = await fetch("/api/v1/models/replicatellm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model_url: model_url,
        text: previousNode.data.output.text,
      }),
    });
    data = await out.json();
  } else {
    data = await fetchResult({
      model_url: model_url,
      text: previousNode.data.output.text,
    });
  }


  node.data.output.text = data.text;
  return node;
};

export const executeDollyV2Node = async (
  node: Node,
  previousNode: Node,
  localExecution: boolean = false
) => {
  return executeNode(
    node,
    previousNode,
    "replicate/dolly-v2-12b:ef0e1aefc61f8e096ebe4db6b2bacc297daf2ef6899f0f7e001ec445893500e5",
    localExecution
  );
};

export const executeMpt7bNode = async (
  node: Node,
  previousNode: Node,
  localExecution: boolean = false
) => {
  return executeNode(
    node,
    previousNode,
    "replicate/mpt-7b-storywriter:a38b8ba0d73d328040e40ecfbb2f63a938dec8695fe15dfbd4218fa0ac3e76bf",
    localExecution
  );
};

export const executeOpenAssistantNode = async (
  node: Node,
  previousNode: Node,
  localExecution: boolean = false
) => {
  return executeNode(
    node,
    previousNode,
    "replicate/oasst-sft-1-pythia-12b:28d1875590308642710f46489b97632c0df55adb5078d43064e1dc0bf68117c3",
    localExecution
  );
};

export const executeStableLMNode = async (
  node: Node,
  previousNode: Node,
  localExecution: boolean = false
) => {
  return executeNode(
    node,
    previousNode,
    "stability-ai/stablelm-tuned-alpha-7b:c49dae362cbaecd2ceabb5bd34fdb68413c4ff775111fea065d259d577757beb",
    localExecution
  );
};

export const executeVicuna13BNode = async (
  node: Node,
  previousNode: Node,
  localExecution: boolean = false
) => {
  return executeNode(
    node,
    previousNode,
    "replicate/vicuna-13b:6282abe6a492de4145d7bb601023762212f9ddbbe78278bd6771c8b3b2f2a13b",
    localExecution
  );
};
