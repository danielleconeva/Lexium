import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import CaseIdentificationCard from "../components/create-case/CaseIdentificationCard";
import CaseDetailsCard from "../components/create-case/CaseDetailsCard";
import PartiesInvolvedCard from "../components/create-case/PartiesInvolvedCard";
import ImportantDatesCard from "../components/create-case/ImportantDatesCard";
import NotesAndDescriptionCard from "../components/create-case/NotesAndDescriptionCard";

import { useCases } from "../hooks/useCases";
import type { CaseRecord } from "../types/Case";
import { useAuth } from "../hooks/useAuth";

import { useDispatch } from "react-redux";
import { showNotification } from "../features/notifications/notificationsSlice";
import type { AppDispatch } from "../store/store";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideInDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideInRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const scaleIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const sanitizeText = (v: unknown): string => {
    if (v === null || v === undefined) return "";
    const str = String(v).trim();

    if (str.toLowerCase() === "undefined" || str.toLowerCase() === "null") {
        return "";
    }
    return str;
};

type HearingDTO = { date: string; time: string };

export default function CaseEditPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const dispatch = useDispatch<AppDispatch>();

    const { updateCase, loadFirmCases, getFirmCaseById } = useCases();

    const existingCase: CaseRecord | null = id ? getFirmCaseById(id) : null;
    const [loadingCase, setLoadingCase] = useState(true);

    useEffect(() => {
        async function load() {
            if (existingCase) {
                setLoadingCase(false);
                return;
            }

            if (user?.uid) {
                await loadFirmCases(user.uid);
            }

            setLoadingCase(false);
        }

        load();
    }, [existingCase, user, loadFirmCases]);

    const [isPublic, setIsPublic] = useState(false);
    const [isStarred, setIsStarred] = useState(false);

    const [caseNumber, setCaseNumber] = useState("");
    const [caseYear, setCaseYear] = useState("");
    const [type, setType] = useState("");
    const [court, setCourt] = useState("");
    const [formation, setFormation] = useState("");
    const [status, setStatus] = useState("open");

    const [clientName, setClientName] = useState("");
    const [opposingParty, setOpposingParty] = useState("");

    const [initiationDate, setInitiationDate] = useState("");
    const [hearings, setHearings] = useState<HearingDTO[]>([]);

    const [notes, setNotes] = useState("");
    const [publicDescription, setPublicDescription] = useState("");

    const [initialized, setInitialized] = useState(false);

    const isFormValid =
        caseNumber.trim() &&
        caseYear.trim() &&
        type.trim() &&
        court.trim() &&
        formation.trim() &&
        clientName.trim() &&
        opposingParty.trim() &&
        initiationDate.trim();

    useEffect(() => {
        if (!existingCase || initialized) return;

        setCaseNumber(sanitizeText(existingCase.caseNumber));
        setCaseYear(sanitizeText(existingCase.caseYear));

        const rawType = sanitizeText(existingCase.type).toLowerCase();
        const allowedTypes = [
            "civil",
            "commercial",
            "criminal",
            "administrative",
            "administrative-criminal",
        ] as const;

        const normalizedType = allowedTypes.includes(rawType as any)
            ? rawType
            : "";

        setType(normalizedType);

        setCourt(sanitizeText(existingCase.court));
        setFormation(sanitizeText(existingCase.formation));

        const rawStatus = sanitizeText(existingCase.status).toLowerCase();
        const normalizedStatus = rawStatus === "archived" ? "archived" : "open";

        setStatus(normalizedStatus);

        setClientName(sanitizeText(existingCase.clientName));
        setOpposingParty(sanitizeText(existingCase.opposingParty));

        setInitiationDate(sanitizeText(existingCase.initiationDate));

        const mappedHearings =
            existingCase.hearingsChronology?.map((h) => ({
                date: sanitizeText(h.date),
                time: sanitizeText(h.time),
            })) ?? [];

        setHearings(mappedHearings);

        setNotes(sanitizeText(existingCase.notes));
        setPublicDescription(sanitizeText(existingCase.publicDescription));

        setIsPublic(!!existingCase.isPublic);
        setIsStarred(!!existingCase.isStarred);

        setInitialized(true);
    }, [existingCase, initialized]);

    const getPartiesInitials = () => {
        const toInitials = (fullName: string): string => {
            if (!fullName.trim()) return "";

            return fullName
                .trim()
                .split(/\s+/)
                .map((part) => part[0].toUpperCase() + ".")
                .join(" ");
        };

        return [toInitials(clientName), toInitials(opposingParty)];
    };

    const computeNextHearing = () => {
        const validHearings = hearings.filter(
            (h) => h.date.trim() !== "" || h.time.trim() !== ""
        );

        if (validHearings.length === 0) return undefined;

        const sorted = [...validHearings].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        return sorted[0].date;
    };

    function handleResetToOriginal() {
        if (!existingCase) return;
        setInitialized(false);
    }

    async function handleUpdateCase() {
        if (!id || !isFormValid) return;

        const validHearings = hearings.filter(
            (h) => h.date.trim() !== "" || h.time.trim() !== ""
        );

        const updatedData = {
            caseNumber,
            caseYear,
            type,
            court,
            formation,
            status,
            isStarred,

            clientName,
            opposingParty,
            notes: notes || null,

            isPublic,
            publicDescription: publicDescription || null,
            partiesInitials: getPartiesInitials(),
            initiationDate,
            hearingsChronology: validHearings,

            nextHearingDate: computeNextHearing() || null,
            archiveNumber: status === "archived" ? caseNumber : null,
        };

        try {
            await updateCase(id, updatedData);

            dispatch(
                showNotification({
                    type: "success",
                    message: "Case updated successfully!",
                })
            );

            navigate("/cases");
        } catch (err: any) {
            dispatch(
                showNotification({
                    type: "error",
                    message: err?.message || "Failed to update case.",
                })
            );
        }
    }

    if (loadingCase) {
        return <PageWrapper>Loading…</PageWrapper>;
    }

    if (!existingCase) {
        return (
            <PageWrapper>
                <HeadingSection>
                    <Heading>Case not found</Heading>
                </HeadingSection>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <BackButton onClick={() => navigate("/cases")}>
                Back to Cases
            </BackButton>

            <HeadingSection>
                <Heading>Edit Case</Heading>

                <BtnsSection>
                    <StarSection>
                        <StarButton
                            onClick={() => setIsStarred(!isStarred)}
                            $active={isStarred}
                        >
                            <Star
                                size={32}
                                strokeWidth={2}
                                fill={isStarred ? "currentColor" : "none"}
                            />
                        </StarButton>
                        <StarDescription>Mark as important</StarDescription>
                    </StarSection>
                </BtnsSection>
            </HeadingSection>

            <MainSection>
                <CaseIdentificationCard
                    caseNumber={caseNumber}
                    caseYear={caseYear}
                    setCaseNumber={setCaseNumber}
                    setCaseYear={setCaseYear}
                />

                <CaseDetailsCard
                    type={type}
                    setType={setType}
                    court={court}
                    setCourt={setCourt}
                    formation={formation}
                    setFormation={setFormation}
                    status={status}
                    setStatus={setStatus}
                />

                <PartiesInvolvedCard
                    clientName={clientName}
                    opposingParty={opposingParty}
                    setClientName={setClientName}
                    setOpposingParty={setOpposingParty}
                />

                <ImportantDatesCard
                    initiationDate={initiationDate}
                    setInitiationDate={setInitiationDate}
                    hearings={hearings}
                    setHearings={setHearings}
                />

                <NotesAndDescriptionCard
                    notes={notes}
                    setNotes={setNotes}
                    publicDescription={publicDescription}
                    setPublicDescription={setPublicDescription}
                />
            </MainSection>

            <BottomSection>
                <PublicToggle onClick={() => setIsPublic(!isPublic)}>
                    <ToggleWrapper $active={isPublic}>
                        <ToggleCircle $active={isPublic} />
                    </ToggleWrapper>

                    <ToggleTextGroup>
                        <ToggleTitle>Public Case</ToggleTitle>
                        <ToggleSubtitle>
                            Make this case visible in the public list
                        </ToggleSubtitle>
                    </ToggleTextGroup>
                </PublicToggle>

                <RightButtons>
                    <ClearButton onClick={handleResetToOriginal}>
                        Reset
                    </ClearButton>
                    <SubmitButton
                        onClick={handleUpdateCase}
                        disabled={!isFormValid}
                    >
                        Save Changes
                    </SubmitButton>
                </RightButtons>
            </BottomSection>
        </PageWrapper>
    );
}
const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    padding: 3rem 8rem 4rem 8rem;
    animation: ${fadeIn} 0.5s ease-out;

    @media (max-width: 1024px) {
        padding: 3rem 3rem 4rem 3rem;
    }

    @media (max-width: 640px) {
        padding: 2rem 1.25rem 3rem 1.25rem;
    }
`;

const BackButton = styled.a`
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.95rem;
    padding: 2rem;
    padding-bottom: 1rem;
    margin-left: 4.2rem;
    cursor: pointer;
    max-width: 180px;
    animation: ${slideInRight} 0.6s ease-out backwards;

    &::before {
        content: "<-";
        padding-right: 0.5rem;
    }

    &:hover {
        color: ${({ theme }) => theme.colors.primaryBlue};
    }

    @media (max-width: 1024px) {
        margin-left: 0;
        padding-left: 0;
    }
`;

const HeadingSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 5rem;
    animation: ${slideInDown} 0.7s ease-out 0.1s backwards;

    @media (max-width: 1024px) {
        margin-right: 0;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
    }
`;

const Heading = styled.h3`
    font-size: 2rem;
    font-weight: 700;
    color: #0a0a0a;
    margin: 1rem 0 0.5rem 6.5rem;

    @media (max-width: 1024px) {
        margin-left: 0;
        text-align: center;
    }

    @media (max-width: 640px) {
        font-size: 1.8rem;
    }
`;

const BtnsSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.8rem;

    @media (max-width: 640px) {
        gap: 1.25rem;
    }
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;

    & > * {
        animation: ${scaleIn} 0.5s ease-out backwards;
    }

    & > *:nth-child(1) {
        animation-delay: 0.2s;
    }
    & > *:nth-child(2) {
        animation-delay: 0.3s;
    }
    & > *:nth-child(3) {
        animation-delay: 0.4s;
    }
    & > *:nth-child(4) {
        animation-delay: 0.5s;
    }
    & > *:nth-child(5) {
        animation-delay: 0.6s;
    }
`;

const PublicToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    user-select: none;

    &:hover {
        opacity: 0.9;
    }
`;

const ToggleWrapper = styled.div<{ $active: boolean }>`
    width: 56px;
    height: 32px;
    border-radius: 999px;
    background: ${({ $active }) =>
        $active
            ? "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)"
            : "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)"};
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: ${({ $active }) => ($active ? "flex-end" : "flex-start")};
    transition: all 0.5s ease-in-out;
    box-shadow: ${({ $active }) =>
        $active
            ? "0 4px 12px rgba(37, 99, 235, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)"
            : "0 2px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.5)"};
    border: 1px solid
        ${({ $active }) =>
            $active ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.05)"};
`;

const ToggleCircle = styled.div<{ $active: boolean }>`
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-in-out;
    transform: ${({ $active }) => ($active ? "scale(1.05)" : "scale(1)")};
`;

const ToggleTextGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const ToggleTitle = styled.div`
    font-size: 0.95rem;
    font-weight: 600;
    color: #0f172a;
`;

const ToggleSubtitle = styled.div`
    font-size: 0.85rem;
    color: #6b7280;
`;

const StarSection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-right: 2.2rem;

    @media (max-width: 1024px) {
        margin-right: 0;
    }
`;

const StarButton = styled.button<{ $active: boolean }>`
    background: none;
    border: none;
    color: ${({ $active }) => ($active ? "#3b82f6" : "#d1d5db")};
    display: grid;
    place-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;

    &:hover {
        color: ${({ $active }) => ($active ? "#2563eb" : "#9ca3af")};
        transform: scale(1.15);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        transition: all 0.3s ease;
        filter: ${({ $active }) =>
            $active
                ? "drop-shadow(0 2px 6px rgba(59, 130, 246, 0.4))"
                : "none"};
    }
`;

const StarDescription = styled.div`
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 500;
`;

const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 6.5rem 0 6.5rem;
    padding-top: 2rem;
    padding: 1rem 4rem;
    animation: ${slideInUp} 0.7s ease-out 0.7s backwards;

    @media (max-width: 1024px) {
        margin: 2.5rem 0 0 0;
        padding: 1.5rem 0;
        flex-direction: column;
        gap: 2rem;
    }
`;

const RightButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: 640px) {
        flex-direction: column;
        width: 100%;
    }
`;

const SubmitButton = styled.button`
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
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 640px) {
        width: 100%;
        justify-content: center;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
    }

    &:disabled:hover {
        transform: none;
        box-shadow: none;
    }
`;

const ClearButton = styled.button`
    display: inline-block;
    padding: 1rem 2.5rem;
    font-size: 1.05rem;
    font-weight: 500;
    color: #4a4a4f;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    cursor: pointer;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04),
        inset 0 1px 2px rgba(255, 255, 255, 0.5),
        inset 0 -1px 2px rgba(0, 0, 0, 0.05);
    text-decoration: none;
    position: relative;
    overflow: hidden;

    @media (max-width: 640px) {
        width: 100%;
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
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        color: #2a2a2f;
        transform: translateY(-3px);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12),
            0 6px 20px rgba(0, 0, 0, 0.06),
            inset 0 1px 3px rgba(255, 255, 255, 0.6),
            inset 0 -1px 2px rgba(0, 0, 0, 0.05);
    }

    &:hover::before {
        left: 100%;
    }
    &:active {
        transform: translateY(-1px);
        background: rgba(255, 255, 255, 0.2);
    }
`;
