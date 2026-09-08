import { ThemeToggle } from "@/components/theme-toggle";
import { Container } from "@/components/ui/container";
import { PROFILE } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface">
      <Container className="flex items-center justify-between py-6 text-xs text-muted">
        <span>
          © {year} {PROFILE.name}
        </span>
        <ThemeToggle />
      </Container>
    </footer>
  );
}
