import Link from "next/link";
import NavLink from "./NavLink";

const links = [
  { href: "/", label: "Home" },

  { href: "/about", label: "About Us" },
  { href: "/articles", label: "Articles" },
];

export default function Header() {
  return (
    <header className="bg-white/50">
      <nav className="container mx-auto flex justify-between items-center py-4">
        <Link href="/">Our Cool Project</Link>

        <ul className="flex gap-4">
          {links.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </ul>
      </nav>
    </header>
  );
}
