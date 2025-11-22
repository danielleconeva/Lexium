import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Navbar from "../components/Navbar";
import { theme } from "../styles/theme";

const AppContainer = styled.div`
    font-family: ${({ theme }) => theme.fonts.main};
    min-height: 100vh;
    width: 100%;
    background: radial-gradient(
            ellipse 80% 60% at 10% 40%,
            rgba(140, 140, 255, 0.35),
            transparent 60%
        ),
        radial-gradient(
            ellipse 70% 60% at 90% 20%,
            rgba(180, 180, 255, 0.25),
            transparent 60%
        ),
        linear-gradient(135deg, rgba(245, 245, 255, 1), rgba(235, 235, 250, 1));
`;

const StickyNavbarWrapper = styled.div`
    position: sticky;
    top: 0;
    z-index: 999;
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.04);
`;

const MainContent = styled.main`
    padding-top: 80px;
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
                </AppContainer>
            </ThemeProvider>
        </>
    );
}
