import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Seat ({id,number, available, seatsSelect ,select}){

    function background(id){
        if(available === false){
            return "#FBE192";
        } 

        if (available === true && !seatsSelect.includes(id)){
            return "#C3CFD9"
        } else if (seatsSelect.includes(id)){
            return "#1AAE9E"
        }
    }

    function border(id){
        if(available === false){
            return "#F7C52B";
        } 

        if (available === true && !seatsSelect.includes(id)){
            return "#7B8B99"
        } else if (seatsSelect.includes(id)){
            return "#0E7D71"
        }
    }

    return (
    
        <SeatItem  onClick={() => select(id, available)} corBack={() => background(id)} 
                    corBorder={() => border(id)}> {number} </SeatItem>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${props => props.corBorder};     // Essa cor deve mudar
    background-color: ${props => props.corBack };    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`