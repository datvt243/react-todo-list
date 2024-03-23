import Header from './_Header';
import Footer from './_Footer';

interface iProps {
    onSetTheme: (theme: string) => void;
    theme: string;
    children: React.ReactElement;
}
function LayoutDefault({ onSetTheme, theme, children }: iProps) {
    return (
        <div className="body-wrapper">
            <Header theme={theme} onSetTheme={onSetTheme} />
            <main className="main-wrapper">{children}</main>
            <Footer />
        </div>
    );
}

export default LayoutDefault;
