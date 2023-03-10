import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {

    const [nameMovie, setNameMovie] = useState("")
    const [imgMovie, setImgMovie] = useState("")
    const [day, setDay] = useState("")
    const [time, setTime] = useState("")
    const [seatsSelect, setSeatsSelect] = useState([])
    const [name, setName] = useState("")
    const [cpf, setCPF] = useState("")
    const [numberSeat, setNumberSeat] = useState("")

    function reset(){
        setNameMovie("")
        setImgMovie("")
        setDay("")
        setTime("")
        setSeatsSelect("")
        setName("")
        setCPF("")
        setNumberSeat("")
    }



    function select(id, available, number) {
        if (available && !seatsSelect.includes(id)) {

            const array = [...seatsSelect, id]
            const arrayNumber = [...numberSeat, number]
            setSeatsSelect(array)
            setNumberSeat(arrayNumber)

        } else if (seatsSelect.includes(id)) {
            const array = [...seatsSelect]
            const arrayNumber = [...numberSeat]
            setSeatsSelect(array.filter((i) => { if (i !== id) return true }))
            setNumberSeat(arrayNumber.filter ((i) => { if(i !== number) return true}))
        } else {
            alert("Esse assento não está disponível")
        }
    }

    console.log(numberSeat)

    return (
        <>
            <NavContainer>CINEFLEX</NavContainer>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sessoes/:idFilme" element={<SessionsPage nameMovie={nameMovie}
                        setNameMovie={setNameMovie}
                        imgMovie={imgMovie}
                        setImgMovie={setImgMovie} />} />

                    <Route path="/assentos/:idSessao" element={<SeatsPage nameMovie={nameMovie}
                        imgMovie={imgMovie}
                        day={day}
                        setDay={setDay}
                        time={time}
                        setTime={setTime}
                        seatsSelect={seatsSelect}
                        select={select}
                        name={name}
                        setName={setName}
                        cpf={cpf}
                        setCPF={setCPF}
                    />} />
                    <Route path="/sucesso" element={<SuccessPage nameMovie={nameMovie}
                        day={day}
                        time={time}
                        numberSeat={numberSeat}
                        name={name}
                        cpf={cpf}
                        reset={reset} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
