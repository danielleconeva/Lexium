import styled from "styled-components";
import SearchBar from "../components/public-cases/SearchBar";
import { useCases } from "../hooks/useCases";
import type { CaseRecord } from "../types/Case";
import { useEffect, useState } from "react";
import PublicCaseCard from "../components/public-cases/PublicCaseCard";
import { Filter } from "lucide-react";

const PAGE_SIZE = 6;

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    width: 100%;
`;

const HeroSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem 4rem;
    position: relative;
    background: #fefeff;
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
`;

const SearchBarWrapper = styled.div`
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;
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
`;

const LoadMoreWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2rem;
`;

const LoadMoreButton = styled.button`
    padding: 0.75rem 2.5rem;
    border-radius: 999px;
    border: 1px solid #3b82f6;
    background: white;
    color: #1d4ed8;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #eff6ff;
        border-color: #1d4ed8;
        box-shadow: 0 12px 30px rgba(37, 99, 235, 0.25);
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
        box-shadow: none;
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
                            <FilterButton
                                $active={activeFilter === "All Cases"}
                                onClick={() => handleFilterChange("All Cases")}
                            >
                                All Cases
                            </FilterButton>
                            <FilterButton
                                $active={activeFilter === "Civil"}
                                onClick={() => handleFilterChange("Civil")}
                            >
                                Civil
                            </FilterButton>
                            <FilterButton
                                $active={activeFilter === "Commercial"}
                                onClick={() => handleFilterChange("Commercial")}
                            >
                                Commercial
                            </FilterButton>
                            <FilterButton
                                $active={activeFilter === "Administrative"}
                                onClick={() =>
                                    handleFilterChange("Administrative")
                                }
                            >
                                Administrative
                            </FilterButton>
                            <FilterButton
                                $active={activeFilter === "Criminal"}
                                onClick={() => handleFilterChange("Criminal")}
                            >
                                Criminal
                            </FilterButton>
                            <FilterButton
                                $active={
                                    activeFilter === "Administrative-Criminal"
                                }
                                onClick={() =>
                                    handleFilterChange(
                                        "Administrative-Criminal"
                                    )
                                }
                            >
                                Administrative-Criminal
                            </FilterButton>
                        </FilterButtons>
                    </FilterSection>
                </BrowseHeader>

                {loading && <p>Loading cases...</p>}
                {error && <p>Something went wrong.</p>}
                {!loading && !error && (
                    <>
                        <CasesList>
                            {visibleCases.map((singlePublicCase) => (
                                <PublicCaseCard
                                    key={singlePublicCase.id}
                                    caseData={singlePublicCase}
                                />
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
