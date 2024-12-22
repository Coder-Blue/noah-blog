import "@/styles/app.css";

type DummyLayoutProps = {
  children: React.ReactNode;
};

export default function DummyLayout({ children }: DummyLayoutProps) {
  return <>{children}</>;
}
