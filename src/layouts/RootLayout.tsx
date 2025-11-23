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
    backdrop-filter: blur(20px);
    background: rgba(255, 255, 255, 0.04);
`;

const MainContent = styled.main`
    padding-top: 2px;
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
