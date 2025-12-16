import { useState } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Scale, Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import ConfirmModal from "./ConfirmModal";

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    async function handleLogout() {
        await logout();
        navigate("/");
        setShowLogoutModal(false);
        setMobileMenuOpen(false);
    }

    function closeMobileMenu() {
        setMobileMenuOpen(false);
    }

    return (
        <>
            <NavbarContainer $hasUser={!!user}>
                <MobileMenuButton onClick={() => setMobileMenuOpen((v) => !v)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </MobileMenuButton>

                <LeftSection $hasUser={!!user} $mobileOpen={mobileMenuOpen}>
                    <NavLink to="/" onClick={closeMobileMenu}>
                        Home
                    </NavLink>

                    {user && (
                        <NavLink to="/dashboard" onClick={closeMobileMenu}>
                            Dashboard
                        </NavLink>
                    )}

                    {user && (
                        <NavLink to="/cases" onClick={closeMobileMenu}>
                            Cases
                        </NavLink>
                    )}

                    {!user && (
                        <NavLink to="/public-cases" onClick={closeMobileMenu}>
                            Public Cases
                        </NavLink>
                    )}
                </LeftSection>

                <CenterCircle $hasUser={!!user}>
                    <Scale size={26} />
                </CenterCircle>

                <RightSection $hasUser={!!user} $mobileOpen={mobileMenuOpen}>
                    {user ? (
                        <>
                            <NavLink
                                to="/public-cases"
                                onClick={closeMobileMenu}
                            >
                                Public Cases
                            </NavLink>

                            <NavLink to="/upcoming" onClick={closeMobileMenu}>
                                Upcoming
                            </NavLink>

                            <NavButton
                                type="button"
                                disabled={loading}
                                onClick={() => setShowLogoutModal(true)}
                            >
                                Log Out
                            </NavButton>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" onClick={closeMobileMenu}>
                                Log In
                            </NavLink>

                            <NavLink to="/register" onClick={closeMobileMenu}>
                                Sign Up
                            </NavLink>
                        </>
                    )}
                </RightSection>
            </NavbarContainer>

            {showLogoutModal && (
                <ConfirmModal
                    title="Log Out?"
                    message="Are you sure you want to log out of your account?"
                    confirmLabel="Log Out"
                    cancelLabel="Cancel"
                    onConfirm={handleLogout}
                    onCancel={() => setShowLogoutModal(false)}
                />
            )}
        </>
    );
}

const NavbarContainer = styled.nav<{ $hasUser: boolean }>`
    position: relative;
    top: 2rem;
    height: 70px;
    padding: 0 2.5rem;

    display: flex;
    align-items: center;
    gap: 2.5rem;

    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(3px);
    border-radius: 45px;

    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);

    margin: 0 auto;
    max-width: ${({ $hasUser }) => ($hasUser ? "890px" : "520px")};
    transition: max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1),
        box-shadow 0.3s ease;
    @media (min-width: 850px) and (max-width: 1026px) {
        max-width: ${({ $hasUser }) => ($hasUser ? "890px" : "520px")};
    }
    @media (max-width: 640px) {
        top: 2rem;
        height: 60px;
        padding: 0 1rem;
        margin: 0 2rem;
        gap: 0;
        max-width: calc(100% - 2rem);
        border-radius: 30px;
        justify-content: space-between;
    }
`;

const MobileMenuButton = styled.button`
    all: unset;

    display: none;
    cursor: pointer;

    @media (max-width: 640px) {
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
    }

    svg {
        width: 24px;
        height: 24px;
        stroke-width: 2;
        overflow: visible;
        display: block;
    }
`;

const LeftSection = styled.div<{ $hasUser: boolean; $mobileOpen: boolean }>`
    display: flex;
    align-items: center;
    gap: 3.4rem;
    margin-left: 2rem;

    ${({ $hasUser }) =>
        !$hasUser &&
        css`
            gap: 2.4rem;
            margin-left: 0.2rem;
        `}

    @media (max-width: 640px) {
        position: fixed;
        top: 72px;
        left: 0;
        right: 0;

        flex-direction: column;
        background: rgba(255, 255, 255, 0.98);
        margin: 0 1rem;
        border-radius: 20px;
        padding: 1.3rem;

        transform: ${({ $mobileOpen }) =>
            $mobileOpen ? "translateY(0)" : "translateY(-12px)"};
        opacity: ${({ $mobileOpen }) => ($mobileOpen ? 1 : 0)};
        pointer-events: ${({ $mobileOpen }) => ($mobileOpen ? "auto" : "none")};

        transition: all 0.25s ease;
        z-index: 40;
        gap: 1rem;
    }
`;

const RightSection = styled.div<{ $hasUser: boolean; $mobileOpen: boolean }>`
    display: flex;
    align-items: center;
    gap: 3rem;
    ${({ $hasUser }) =>
        !$hasUser &&
        css`
            gap: 2.8rem;
            margin-right: 0.4rem;
        `}
    @media (max-width: 640px) {
        position: fixed;
        top: ${({ $hasUser }) => ($hasUser ? "260px" : "205px")};
        left: 0;
        right: 0;
        gap: 1rem;

        flex-direction: column;
        background: rgba(255, 255, 255, 0.98);
        margin: 0 1rem;
        border-radius: 20px;
        padding: 1rem;

        transform: ${({ $mobileOpen }) =>
            $mobileOpen ? "translateY(0)" : "translateY(-12px)"};
        opacity: ${({ $mobileOpen }) => ($mobileOpen ? 1 : 0)};
        pointer-events: ${({ $mobileOpen }) => ($mobileOpen ? "auto" : "none")};

        transition: all 0.25s ease;
        z-index: 30;
    }
`;

const CenterCircle = styled.div<{ $hasUser: boolean }>`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(135deg, #3d70fe, #5c7cff);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem 0 2.4rem;

    ${({ $hasUser }) =>
        !$hasUser &&
        css`
            margin: 0 0.8rem 0 0.4rem;
        `}

    background: linear-gradient(135deg, #3d70fe 0%, #5c7cff 100%);
    color: white;

    box-shadow: 0 6px 20px rgba(61, 90, 254, 0.35),
        0 2px 8px rgba(61, 90, 254, 0.2);

    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 8px 24px rgba(61, 90, 254, 0.4),
            0 3px 10px rgba(61, 90, 254, 0.25);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        stroke-width: 2.2;
    }

    @media (max-width: 640px) {
        width: 45px;
        height: 45px;
    }
`;

const navItemStyles = css`
    text-decoration: none;
    color: #1a1a1a;
    font-weight: 400;
    position: relative;
    padding: 8px 0;

    background: none;
    border: none;
    cursor: pointer;
    font: inherit;

    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #3d5afe 0%, #667eea 100%);
        border-radius: 2px;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
        color: #3d5afe;
        &::before {
            transform: translateX(-50%) scaleX(1);
        }
    }
    cursor: pointer;
`;

const NavLink = styled(Link)`
    ${navItemStyles}
`;

const NavButton = styled.button`
    ${navItemStyles}
`;
