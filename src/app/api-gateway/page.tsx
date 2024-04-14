import { Request } from "./components/Request";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Request />
    </main>
  );
}
