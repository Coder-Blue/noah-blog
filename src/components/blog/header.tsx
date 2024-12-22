type HeaderProps = {
  children: React.ReactNode;
};

export default function Header({ children }: HeaderProps) {
  return <div className="bg-gray-100 p-8 dark:bg-[#262626]">{children}</div>;
}
