import { navItems, profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-sm text-muted">
        <p className="font-medium text-ink">{profile.name}</p>
        <p>
          {profile.role} · {profile.companyRole}, {profile.company} · {profile.location}
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
        <p>© {new Date().getFullYear()} {profile.name}. Built with Next.js.</p>
      </div>
    </footer>
  );
}
