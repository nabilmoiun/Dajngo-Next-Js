import Breadcumb from "./Breadcrumb";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

    const items = [
        {title: "Home", link: '/'},
        {title: "File", link: "#"}
    ]

    return (
        <>
          <Breadcumb items={items} />
          {children}
        </>
      );
}
