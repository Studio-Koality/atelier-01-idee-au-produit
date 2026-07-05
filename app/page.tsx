export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <span className="text-6xl">🐈</span>
      <h1 className="text-3xl font-bold">La coquille fonctionne.</h1>
      <p className="max-w-md text-center text-lg opacity-70">
        C&apos;est tout ce qu&apos;elle sait faire, et c&apos;est exactement ce
        qu&apos;on attend d&apos;elle. Le produit, lui, commence dans{" "}
        <code className="rounded bg-black/5 px-1">CLAUDE.md</code>.
      </p>
    </main>
  );
}
