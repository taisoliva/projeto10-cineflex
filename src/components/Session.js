import styled from "styled-components"


export default function Session({ idDay, weekDay, date, showtimes }) {
    return (
        <SessionContainer >
            {weekDay} - {date}
            <ButtonsContainer key={idDay}>
                {showtimes.map(time => <button> {time.name} </button>)}
            </ButtonsContainer>
        </SessionContainer>
    )
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`