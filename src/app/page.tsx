import { games } from "@/data/games";

export default function Home() {
  return (
    <main className="flex-1 bg-zinc-950 text-zinc-100">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-fuchsia-500">X</span>gamesHub
          </h1>
          <nav className="text-sm text-zinc-400">Hubgame</nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-4xl font-extrabold sm:text-5xl">
          รวมเกมไว้ในที่เดียว
        </h2>
        <p className="mt-3 max-w-xl text-zinc-400">
          เลือกเกมที่ชอบแล้วเล่นได้ทันทีบนเบราว์เซอร์
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((game) => (
            <li
              key={game.slug}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-fuchsia-500"
            >
              <div className="text-4xl">{game.emoji}</div>
              <h3 className="mt-3 text-lg font-semibold">{game.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{game.description}</p>
              <span className="mt-4 inline-block rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
                {game.genre}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
