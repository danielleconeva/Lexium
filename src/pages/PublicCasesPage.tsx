import styled, { keyframes } from "styled-components";
import SearchBar from "../components/public-cases/SearchBar";
import { useCases } from "../hooks/useCases";
import type { CaseRecord } from "../types/Case";
import { useEffect, useState } from "react";
import PublicCaseCard from "../components/public-cases/PublicCaseCard";
import { Filter } from "lucide-react";

const PAGE_SIZE = 6;

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

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    width: 100%;
    animation: ${fadeIn} 0.5s ease-out;
`;

const HeroSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem 4rem;
    position: relative;
    background: #fefeff;
    animation: ${slideInDown} 0.7s ease-out;
`;

const HeroContent = styled.div`
    max-width: 1200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

const HeroTitle = styled.div`
    text-align: center;
    margin-bottom: 2rem;
    animation: ${slideInUp} 0.8s ease-out 0.1s backwards;
`;

const TitleLine1 = styled.h1`
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.1;
    color: #0a0a0a;
    margin: 0;
    letter-spacing: -0.02em;
`;

const TitleLine2 = styled.h1`
    font-size: 3.2rem;
    font-weight: 700;
    line-height: 1.1;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 50%, #5c7cff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    letter-spacing: -0.02em;
`;

const HeroDescription = styled.p`
    font-size: 1.2rem;
    line-height: 1.6;
    color: #666;
    max-width: 800px;
    text-align: center;
    margin: 0 auto 3rem;
    animation: ${fadeIn} 0.8s ease-out 0.2s backwards;
`;

const SearchBarWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;
    animation: ${scaleIn} 0.8s ease-out 0.3s backwards;
`;

const ResultsSection = styled.div`
    padding: 3rem 3rem 4rem 3rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
`;

const BrowseHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    animation: ${slideInUp} 0.7s ease-out 0.4s backwards;
`;

const BrowseTitle = styled.div``;

const BrowseHeading = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: #0a0a0a;
    margin: 0 0 0.5rem 0;
`;

const BrowseSubtext = styled.p`
    font-size: 1rem;
    color: #666;
    margin: 0;
`;

const FilterSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const FilterLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 1rem;
`;

const FilterIcon = styled(Filter)`
    width: 20px;
    height: 20px;
`;

const FilterButtons = styled.div`
    display: flex;
    gap: 0.75rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
    padding: 0.625rem 1.5rem;
    border-radius: 999px;
    border: 1px solid ${(props) => (props.$active ? "#3b82f6" : "#e2e8f0")};
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    background: ${(props) => (props.$active ? "#3b82f6" : "white")};
    color: ${(props) => (props.$active ? "white" : "#64748b")};

    &:hover {
        background: ${(props) => (props.$active ? "#2563eb" : "#f8fafc")};
        border-color: ${(props) => (props.$active ? "#2563eb" : "#cbd5e1")};
    }
`;

const CasesList = styled.div`
    margin-top: 3rem;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));

    > * {
        animation: ${scaleIn} 0.5s ease-out backwards;
    }

    > *:nth-child(1) {
        animation-delay: 0.5s;
    }
    > *:nth-child(2) {
        animation-delay: 0.55s;
    }
    > *:nth-child(3) {
        animation-delay: 0.6s;
    }
    > *:nth-child(4) {
        animation-delay: 0.65s;
    }
    > *:nth-child(5) {
        animation-delay: 0.7s;
    }
    > *:nth-child(6) {
        animation-delay: 0.75s;
    }
    > *:nth-child(n + 7) {
        animation-delay: 0.8s;
    }
`;

const LoadMoreWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    animation: ${fadeIn} 0.5s ease-out;
`;

const LoadMoreButton = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    padding: 0.9rem 2.3rem;
    border-radius: 999px;
    border: 1px solid #3d70fe;
    background: #ffffff;
    color: #3d70fe;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease,
        box-shadow 0.2s ease, transform 0.2s ease, color 0.2s ease;

    &:hover {
        background: #eff6ff;
        border-color: #1d4ed8;
        color: #1d4ed8;
        box-shadow: 0 8px 20px rgba(37, 99, 235, 0.08);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 4px 10px rgba(37, 99, 235, 0.06);
    }

    &:focus-visible {
        outline: 2px solid #1d4ed8;
        outline-offset: 2px;
    }
`;

export default function PublicCasesPage() {
    const { publicCases, loadPublicCases, error, loading } = useCases();

    const safePublicCases: CaseRecord[] = publicCases ?? [];

    const [filteredCases, setFilteredCases] = useState<CaseRecord[]>([]);
    const [activeFilter, setActiveFilter] = useState<string>("All Cases");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

    useEffect(() => {
        loadPublicCases();
    }, [loadPublicCases]);

    useEffect(() => {
        let result = safePublicCases;

        if (activeFilter !== "All Cases") {
            const normalizedFilter = activeFilter.toLowerCase();
            result = result.filter(
                (c) => c.type?.toLowerCase() === normalizedFilter
            );
        }

        const query = searchQuery.trim().toLowerCase();
        if (query) {
            result = result.filter((c) =>
                c.caseNumber.toLowerCase().includes(query)
            );
        }

        setFilteredCases(result);
        setVisibleCount(
            result.length === 0 ? 0 : Math.min(PAGE_SIZE, result.length)
        );
    }, [safePublicCases, activeFilter, searchQuery]);

    function handleSearchCases(value: string) {
        setSearchQuery(value);
    }

    function handleFilterChange(filter: string) {
        setActiveFilter(filter);
    }

    const shownCount = Math.min(visibleCount, filteredCases.length);
    const visibleCases = filteredCases.slice(0, visibleCount);

    return (
        <PageWrapper>
            <HeroSection>
                <HeroContent>
                    <HeroTitle>
                        <TitleLine1>Follow Legal Cases</TitleLine1>
                        <TitleLine2>Effortlessly</TitleLine2>
                    </HeroTitle>

                    <HeroDescription>
                        Monitor developments and access essential case details
                        instantly.
                    </HeroDescription>

                    <SearchBarWrapper>
                        <SearchBar onSearch={handleSearchCases} />
                    </SearchBarWrapper>
                </HeroContent>
            </HeroSection>

            <ResultsSection>
                <BrowseHeader>
                    <BrowseTitle>
                        <BrowseHeading>Browse Cases</BrowseHeading>
                        <BrowseSubtext>
                            Showing {shownCount} of {filteredCases.length}{" "}
                            matching cases
                        </BrowseSubtext>
                    </BrowseTitle>

                    <FilterSection>
                        <FilterLabel>
                            <FilterIcon />
                            Filter:
                        </FilterLabel>

                        <FilterButtons>
                            {[
                                "All Cases",
                                "Civil",
                                "Commercial",
                                "Administrative",
                                "Criminal",
                                "Administrative-Criminal",
                            ].map((filter) => (
                                <FilterButton
                                    key={filter}
                                    $active={activeFilter === filter}
                                    onClick={() => handleFilterChange(filter)}
                                >
                                    {filter}
                                </FilterButton>
                            ))}
                        </FilterButtons>
                    </FilterSection>
                </BrowseHeader>

                {loading && <p>Loading cases...</p>}
                {error && <p>Something went wrong.</p>}

                {!loading && !error && (
                    <>
                        <CasesList>
                            {visibleCases.map((c) => (
                                <PublicCaseCard key={c.id} caseData={c} />
                            ))}
                        </CasesList>

                        {visibleCount < filteredCases.length && (
                            <LoadMoreWrapper>
                                <LoadMoreButton
                                    onClick={() =>
                                        setVisibleCount((prev) =>
                                            Math.min(
                                                prev + PAGE_SIZE,
                                                filteredCases.length
                                            )
                                        )
                                    }
                                >
                                    Load more
                                </LoadMoreButton>
                            </LoadMoreWrapper>
                        )}
                    </>
                )}
            </ResultsSection>
        </PageWrapper>
    );
}
