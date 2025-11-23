import styled from "styled-components";
import { Link } from "react-router-dom";
import { Scale } from "lucide-react";

export default function Navbar() {
    return (
        <NavbarContainer>
            <NavSection>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/public-cases">Public Cases</NavLink>
            </NavSection>
            <ContainerCircle>
                <Scale size={26} />
            </ContainerCircle>
            <NavSection>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/register">Sign Up</NavLink>
            </NavSection>
        </NavbarContainer>
    );
}

const NavbarContainer = styled.nav`
    position: relative;
    top: 2rem;
    height: 70px;
    padding: 0 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 45px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04);
    margin: 0 auto;
    max-width: 600px;
    font-size: 1.06rem;
    color: #1a1a1a;
    transition: box-shadow 0.3s ease;
`;

const NavSection = styled.div`
    display: flex;
    gap: 3.4rem;
    align-items: center;
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: #1a1a1a;
    font-weight: 400;
    position: relative;
    padding: 8px 0;
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

    &:active {
        transform: scale(0.96);
    }
`;

const ContainerCircle = styled.div`
    position: absolute;
    left: 52%;
    transform: translateX(-50%);
    top: 7px;
    width: 55px;
    height: 55px;
    background: linear-gradient(135deg, #3d5afe 0%, #5c7cff 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(61, 90, 254, 0.35),
        0 2px 8px rgba(61, 90, 254, 0.2);
    transition: all 0.2s ease;

    &:hover {
        box-shadow: 0 8px 24px rgba(61, 90, 254, 0.4),
            0 3px 10px rgba(61, 90, 254, 0.25);
    }

    &:active {
        transform: translateX(-50%) scale(0.95);
    }

    svg {
        stroke-width: 2.2;
    }
`;
