import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import Seat from "../../components/Seat"
import CaptionItem from "../../components/CaptionItem"

export default function SeatsPage({ nameMovie, imgMovie,
    day, setDay,
    time, setTime,
    seatsSelect, select,
    name, setName,
    cpf, setCPF }) {

    const { idSessao } = useParams()
    const [seats, setSeats] = useState([])
    const [weekDay, setWeekDay] = useState("")

    const navigate = useNavigate()  

    console.log(idSessao)

    useEffect(() => {

        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)

        promisse.then((resposta) => {
            console.log(resposta.data)
            setDay(resposta.data.day.date)
            setTime(resposta.data.name)
            setWeekDay(resposta.data.day.weekday)
            setSeats(resposta.data.seats)
        })
    }, [])

    function confirmarSessao (event){
        event.preventDefault();


        if(seatsSelect.length === 0){
            alert("Você precisa escolher pelo menos um assento!")
            return;
        }

        let object = {
            ids: seatsSelect,
            name: name,
            cpf: cpf
        }

        console.log(object)
        
        
        const requisicao = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", object) 
        requisicao.then(() => navigate("/sucesso"))

    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seats.map(seat => <Seat key={seat.id}
                    id={seat.id}
                    number={seat.name}
                    available={seat.isAvailable}
                    seatsSelect={seatsSelect}
                    select={select} />)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem cor={"#1AAE9E"} border={"#0E7D71"}>
                    Selecionado
                </CaptionItem>
                <CaptionItem cor={"#C3CFD9"} border={"#7B8B99"}>
                    Disponível
                </CaptionItem>
                <CaptionItem cor={"#FBE192"} border={"#F7C52B"}>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>


            <form onSubmit={confirmarSessao}>
                <FormContainer>
                    Nome do Comprador:
                    <input data-test="client-name" placeholder="Digite seu nome..."
                        value={name}
                        onChange={(event) => setName(event.target.value)} 
                        required/>



                    CPF do Comprador:
                    <input data-test="client-cpf" placeholder="Digite seu CPF..."
                        value={cpf}
                        onChange={(event) => setCPF(event.target.value)} 
                        required
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" />

                    <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
                </FormContainer>
            </form>

            <FooterContainer data-test="footer">
                <div>
                    <img src={imgMovie} alt="poster" />
                </div>
                <div>
                    <p>{nameMovie}</p>
                    <p>{weekDay} - {time}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`


const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`