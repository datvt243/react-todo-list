import Header from './_Header';
import Footer from './_Footer';

function LayoutDefault({ children }: { children: React.ReactElement }) {
    return (
        <div className="body-wrapper bg-dark">
            <Header />
            <main className="main-wrapper">{children}</main>
            <Footer />
        </div>
    );
}

export default LayoutDefault;
