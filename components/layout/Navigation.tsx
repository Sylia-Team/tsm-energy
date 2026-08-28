import Link from "next/link";
import { headerNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type NavigationProps = {
  className?: string;
};

export function Navigation({ className }: NavigationProps) {
  return (
    <nav aria-label="Navigation principale" className={cn(className)}>
      <ul className="flex items-center gap-7">
        {headerNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-forest transition-colors duration-150 hover:text-accent"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
