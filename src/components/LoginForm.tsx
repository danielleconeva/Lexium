import { Mail, Lock, Eye, EyeOff, Building2 } from "lucide-react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { showNotification } from "../features/notifications/notificationsSlice";
import type { AppDispatch } from "../store/store";

const FormWrapper = styled.form`
    font-family: ${({ theme }) => theme.fonts.main};
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 600px;
    padding: 2rem 0 2rem 12rem;
    margin: 0 auto;

    @media (max-width: 640px) {
        padding: 5rem 0 1.5rem 0;
        max-width: 100%;
    }

    @media (min-width: 641px) and (max-width: 1024px) {
        padding: 7rem 0 2rem 4rem;
    }

    input {
        background: #f5f5f5;
        border: 1px solid #ddd;
        font-family: ${({ theme }) => theme.fonts.main};
        font-size: 0.8rem;
    }

    button {
        font-family: ${({ theme }) => theme.fonts.main};
        display: inline-block;
        padding: 1rem 2.5rem;
        font-size: 1.05rem;
        font-weight: 500;
        color: white;
        margin: 0 auto;
        background: linear-gradient(135deg, #3d70fe 0%, #667eea 100%);
        border: none;
        border-radius: 50px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 8px 24px rgba(61, 90, 254, 0.3),
            0 3px 12px rgba(102, 126, 234, 0.2),
            inset 0 -2px 8px rgba(0, 0, 0, 0.1),
            inset 0 2px 8px rgba(255, 255, 255, 0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        position: relative;
        overflow: hidden;

        @media (max-width: 640px) {
            padding: 0.9rem 2rem;
            font-size: 1rem;
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.3),
                transparent
            );
            transition: left 0.5s;
        }

        &:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow: 0 16px 40px rgba(61, 90, 254, 0.5),
                0 8px 20px rgba(102, 126, 234, 0.4),
                inset 0 -2px 8px rgba(0, 0, 0, 0.1),
                inset 0 2px 8px rgba(255, 255, 255, 0.3);
        }

        &:hover::before {
            left: 100%;
        }

        &:active {
            transform: translateY(-1px) scale(1.01);
        }

        &:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
    }
`;

const InputGroup = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:focus-within {
        transform: translateY(-2px);
    }

    input {
        width: 100%;
        padding: 0.8rem 2.5rem;
        border-radius: 2rem;
        font-size: 1rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.04),
            inset 0 1px 2px rgba(255, 255, 255, 0.5);

        &:hover {
            background: rgba(255, 255, 255, 0.35);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
                0 4px 12px rgba(0, 0, 0, 0.08),
                inset 0 1px 2px rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.4);
        }

        &:focus {
            outline: none;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-color: ${({ theme }) => theme.colors.primaryBlue};
            box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryBlue}20,
                0 12px 48px rgba(61, 90, 254, 0.2),
                0 6px 20px rgba(102, 126, 234, 0.15),
                inset 0 1px 2px rgba(255, 255, 255, 0.7);
            transform: scale(1.01);
        }
    }

    svg {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        z-index: 1;
        transition: all 0.2s ease;
    }

    &:hover svg {
        color: #4b5563;
        transform: translateY(-50%) scale(1.1);
    }

    &:focus-within svg.left-icon {
        color: ${({ theme }) => theme.colors.primaryBlue};
        transform: translateY(-50%) scale(1.15);
    }

    .left-icon {
        left: 0.75rem;
    }

    .right-icon {
        right: 0.75rem;
        cursor: pointer;

        &:hover {
            color: ${({ theme }) => theme.colors.primaryBlue};
            transform: translateY(-50%) scale(1.2);
        }

        &:active {
            transform: translateY(-50%) scale(1.05);
        }
    }
`;

const ValidationError = styled.span`
    color: #e63946;
    font-size: 0.85rem;
    display: block;
    transition: opacity 0.2s ease;
    margin-top: -0.8rem;
    margin-bottom: 0.5rem;
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-5px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 640px) {
        font-size: 0.8rem;
    }
`;

const SignupLink = styled(Link)`
    font-weight: 600;
    color: #5257d8;
    text-decoration: none;
    transition: all 0.2s ease;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: ${({ theme }) => theme.colors.primaryPurple};
        transition: width 0.3s ease;
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primaryPurple};
        transform: translateX(2px);
    }

    &:hover::after {
        width: 100%;
    }
`;

const IconCircle = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #ffffff;
    border: 1px solid #d5d5d7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.2rem auto;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;

    @media (max-width: 640px) {
        width: 72px;
        height: 72px;
    }

    svg {
        width: 40px;
        height: 40px;
        color: #3a3e7d;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        z-index: 1;

        @media (max-width: 640px) {
            width: 32px;
            height: 32px;
        }
    }
`;

const BottomText = styled.p`
    text-align: center;
    color: #343232;
    transition: color 0.2s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.text || "#333"};
    }

    @media (max-width: 640px) {
        font-size: 0.95rem;
    }
`;

export type LoginValues = { email: string; password: string };
export type LoginTouched = { email: boolean; password: boolean };
export type LoginErrors = Partial<LoginValues>;

export default function LoginForm() {
    const { loading, login } = useAuth();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<LoginErrors>({});
    const [touched, setTouched] = useState<LoginTouched>({
        email: false,
        password: false,
    });

    function validateField(field: "email" | "password", value: string) {
        let error = "";

        if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Please enter a valid email address.";
        }
        if (field === "password" && value.length < 6) {
            error = "Password must be at least 6 characters.";
        }
        setErrors((prev) => ({ ...prev, [field]: error }));
    }

    function handleBlur(field: "email" | "password", value: string) {
        setTouched((prev) => ({ ...prev, [field]: true }));
        validateField(field, value);
    }

    function handleChange(field: "email" | "password", value: string) {
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
        if (touched[field]) validateField(field, value);
    }

    function toggleShowPassword() {
        setShowPassword((prev) => !prev);
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setTouched({ email: true, password: true });

        if (!email || !password) {
            setErrors({
                email: !email ? "Email is required." : errors.email,
                password: !password ? "Password is required." : errors.password,
            });
            return;
        }

        if (errors.email || errors.password) return;

        try {
            await login(email, password);

            dispatch(
                showNotification({
                    type: "success",
                    message: "Logged in successfully!",
                })
            );

            navigate("/dashboard");
        } catch (err: any) {
            dispatch(
                showNotification({
                    type: "error",
                    message: err?.message || "Invalid email or password",
                })
            );
        }
    }

    return (
        <FormWrapper onSubmit={handleSubmit}>
            <IconCircle>
                <Building2 strokeWidth={1.2} />
            </IconCircle>

            <InputGroup>
                <Mail className="left-icon" size={18} />
                <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Enter your email"
                    onBlur={(e) => handleBlur("email", e.target.value)}
                    onChange={(e) => handleChange("email", e.target.value)}
                />
            </InputGroup>
            {touched.email && errors.email && (
                <ValidationError>{errors.email}</ValidationError>
            )}

            <InputGroup>
                <Lock className="left-icon" size={18} />
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onBlur={(e) => handleBlur("password", e.target.value)}
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                {showPassword ? (
                    <EyeOff
                        className="right-icon"
                        size={18}
                        onClick={toggleShowPassword}
                    />
                ) : (
                    <Eye
                        className="right-icon"
                        size={18}
                        onClick={toggleShowPassword}
                    />
                )}
            </InputGroup>
            {touched.password && errors.password && (
                <ValidationError>{errors.password}</ValidationError>
            )}

            <button type="submit" disabled={loading}>
                {loading ? "Loading.." : "Log In"}
            </button>

            <BottomText>
                Don't have an account?{" "}
                <SignupLink to="/register">Sign Up</SignupLink>
            </BottomText>
        </FormWrapper>
    );
}
