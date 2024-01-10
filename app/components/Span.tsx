export function Span({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-white/10 hover:bg-white/30 rounded-sm mr-2 mb-1 inline-block px-1 text-fl-xs">
      {children}
    </span>
  );
}
