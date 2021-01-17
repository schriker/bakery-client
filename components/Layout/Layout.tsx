import Footer from '../Footer/Footer';
import Header, { HeaderPtopsType } from '../Header/Header';
import Navbar from '../Navbar/Navbar';

interface LayoutPtopsType extends HeaderPtopsType {
  children: React.ReactNode;
}

export default function Layout({
  title,
  ogImage,
  ogDescription,
  children,
}: LayoutPtopsType) {
  return (
    <>
      <Header title={title} ogImage={ogImage} ogDescription={ogDescription} />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
