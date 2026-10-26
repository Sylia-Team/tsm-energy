import Link from "next/link";
import { headerNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type NavigationProps = {
  className?: string;
};

export function Navigation({ className }: NavigationProps) {
  return (
    <nav aria-label="Navigation principale" className={cn(className)}>
      <ul className="flex items-center gap-6 xl:gap-9">
        {headerNav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.18em] xl:tracking-[0.24em] text-navy transition-colors duration-300 hover:text-brass"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
