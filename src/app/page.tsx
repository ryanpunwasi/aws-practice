import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

export default async function Home() {
  const client = new LambdaClient({});
  const addends = { x: Math.floor(Math.random() * 10), y: 8 };
  const input = {
    FunctionName: "myTestFunction",
    Payload: JSON.stringify(addends),
  };
  const command = new InvokeCommand(input);
  const { Payload } = await client.send(command);

  const result = Payload ? Buffer.from(Payload).toString() : "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>{`${addends.x} + ${addends.y} = ${result}`}</p>
    </main>
  );
}
