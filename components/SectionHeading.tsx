export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-rule pb-2 text-[1.5rem] font-normal italic leading-none">{children}</h2>
  );
}
