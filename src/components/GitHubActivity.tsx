"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
};

type Status = "loading" | "ready" | "unavailable";

export default function GitHubActivity() {
  const [status, setStatus] = useState<Status>("loading");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [publicRepos, setPublicRepos] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [userResponse, repoResponse] = await Promise.all([
          fetch("https://api.github.com/users/tasnimhdh"),
          fetch("https://api.github.com/users/tasnimhdh/repos?sort=updated&per_page=5"),
        ]);
        if (!userResponse.ok || !repoResponse.ok) throw new Error("unavailable");
        const user = (await userResponse.json()) as { public_repos?: number };
        const list = (await repoResponse.json()) as Repo[];
        if (cancelled) return;
        setPublicRepos(typeof user.public_repos === "number" ? user.public_repos : null);
        setRepos(Array.isArray(list) ? list : []);
        setStatus("ready");
      } catch {
        if (!cancelled) setStatus("unavailable");
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="activity" className="scroll-mt-20 border-t border-line py-20 lg:py-28" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="GitHub" title="Building in public." id="activity-title">
          Public activity for tasnimhdh. Nothing here is estimated.
        </SectionHeading>
        {status === "loading" ? <p className="text-muted">Loading public GitHub activity…</p> : null}
        {status === "unavailable" ? (
          <p className="text-muted">
            Public activity is unavailable right now.{" "}
            <a href="https://github.com/tasnimhdh" target="_blank" rel="noopener noreferrer">
              Open the GitHub profile
            </a>
            .
          </p>
        ) : null}
        {status === "ready" ? (
          <div className="flex flex-col gap-5">
            {publicRepos !== null ? (
              <p className="text-sm text-muted">
                {publicRepos} public {publicRepos === 1 ? "repository" : "repositories"} on GitHub.
              </p>
            ) : null}
            {repos.length === 0 ? <p className="text-muted">No public repositories to show.</p> : null}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {repos.map((repo) => (
                <li key={repo.id} className="rounded-lg border border-white/10 bg-surface p-5">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-ink no-underline">
                    {repo.name}
                  </a>
                  {repo.description ? <p className="mt-2 text-sm text-muted">{repo.description}</p> : null}
                  <p className="mt-3 text-xs text-muted">
                    {repo.language || "Language not listed"}
                    {typeof repo.stargazers_count === "number" ? ` · ${repo.stargazers_count} stars` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
