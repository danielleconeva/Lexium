import styled from "styled-components";

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const Card = styled.div`
    background: #ffffff;
    border-radius: 1rem;
    padding: 1.4rem 1.8rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: 150px;
    justify-content: center;

    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
    border: 1px solid #f5f8fb;
`;

const DayNumber = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #3d70fe 0%, #667eea 50%, #5c7cff 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const DayName = styled.div`
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
`;

const MonthName = styled.div`
    font-size: 1rem;
    font-weight: 500;
    color: #475569;
`;

const Count = styled.div`
    padding: 0.6rem 0.9rem;
    background: #f3f7fc;
    border-radius: 999px;
    font-size: 0.875rem;
    font-weight: 600;
    color: #3d70fe;
`;

export default function DateRow({
    date,
    count,
}: {
    date: Date;
    count: number;
}) {
    return (
        <Row>
            <Card>
                <DayNumber>{date.getDate()}</DayNumber>

                <div>
                    <DayName>
                        {date
                            .toLocaleDateString("en-US", { weekday: "short" })
                            .toUpperCase()}
                    </DayName>
                    <MonthName>
                        {date.toLocaleDateString("en-US", { month: "long" })}
                    </MonthName>
                </div>
            </Card>

            <Count>
                {count} {count === 1 ? "hearing" : "hearings"}
            </Count>
        </Row>
    );
}
