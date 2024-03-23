export default function Footer() {
    return (
        <footer className="header-wrapper py-2 border-top mt-2">
            <p className="text-center mb-0 opacity-75">
                <span className="small">
                    Copyright &copy; {new Date().getFullYear()}. make by{' '}
                    <a className="link" href="https://github.com/datvt243" target="_blank">
                        me
                    </a>
                </span>
            </p>
        </footer>
    );
}
