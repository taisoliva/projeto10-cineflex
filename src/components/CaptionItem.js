
import styled from "styled-components"

export default function CaptionItem(props) {
    return (
        <CaptionItens>
            <CaptionCircle cor={props.cor} border={props.border}/>
            {props.children}    
        </CaptionItens>

    )
}

const CaptionItens = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const CaptionCircle = styled.div`
    border: 1px solid ${props => props.border};         // Essa cor deve mudar
    background-color: ${props => props.cor};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
   
`