import { Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import styled from "styled-components";

const SearchForm = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SearchWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background: white;
    border-radius: 999px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1.5rem;
    gap: 1rem;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const SearchIcon = styled(Search)`
    width: 24px;
    height: 24px;
    color: #94a3b8;
    flex-shrink: 0;
`;

const Bar = styled.input`
    font-family: ${({ theme }) => theme.fonts.main};
    flex: 1;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1.1rem;
    color: #334155;

    &::placeholder {
        color: #94a3b8;
    }
`;

const SearchButton = styled.button`
    font-family: ${({ theme }) => theme.fonts.main};
    border: none;
    background: #3b82f6;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
    border-radius: 999px;
    transition: background-color 0.2s ease;

    &:hover {
        background: #2563eb;
    }
`;

type SearchBarProps = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [caseNumber, setCaseNumber] = useState("");

    function handleChange(value: string) {
        setCaseNumber(value);
    }

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        onSearch(caseNumber.trim());
    }

    return (
        <SearchForm onSubmit={handleSearch}>
            <SearchWrapper>
                <IconWrapper>
                    <SearchIcon />
                </IconWrapper>
                <Bar
                    type="text"
                    value={caseNumber}
                    placeholder="Search by case number..."
                    onChange={(e) => handleChange(e.target.value)}
                />
                <SearchButton type="submit">Search</SearchButton>
            </SearchWrapper>
        </SearchForm>
    );
}
