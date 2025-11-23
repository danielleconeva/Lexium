import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "../components/Navbar";
import { theme } from "../styles/theme";

const AppContainer = styled.div`
    font-family: ${({ theme }) => theme.fonts.main};
    min-height: 100vh;
    width: 100%;
    background: #fefeff;
`;

const StickyNavbarWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 999;
    background: transparent;
    backdrop-filter: none;
`;

const MainContent = styled.main`
    padding-top: 2px;
`;

const FooterElement = styled.footer`
    font-family: ${({ theme }) => theme.fonts.main};
    text-align: center;
    padding: 1.2rem;
    padding-bottom: 1.8rem;
    font-size: 0.9rem;
    color: #393737;
    background: #fefeff;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: -17px;
        left: 0;
        width: 100%;
        height: 3px;

        background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.07),
            rgba(0, 0, 0, 0)
        );
        pointer-events: none;
    }
`;

export default function RootLayout() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppContainer>
                    <StickyNavbarWrapper>
                        <Navbar />
                    </StickyNavbarWrapper>
                    <MainContent>
                        <Outlet />
                    </MainContent>
                    <FooterElement>
                        © 2025 Lexium — Legal Case Management Platform. All
                        rights reserved. Designed for law firms and legal
                        professionals.
                    </FooterElement>
                </AppContainer>
            </ThemeProvider>
        </>
    );
}
