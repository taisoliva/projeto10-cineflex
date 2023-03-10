import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import loading from "../../assets/ATB3o.gif"
import Session from "../../components/Session"


export default function SessionsPage({nameMovie, setNameMovie, imgMovie, setImgMovie}) {

    const { idFilme } = useParams()
    const [days, setDays] = useState([])
    


    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)

        promisse.then((resposta) => {
            setDays(resposta.data.days)
            setNameMovie(resposta.data.title)
            setImgMovie(resposta.data.posterURL)

         })

        promisse.catch(<LoadingImg src={loading} />)

    }, [])


    if (days.length === 0) {
        return <LoadingImg src={loading} />
    }


    return (
        <PageContainer>
            Selecione o horário
            <div>
                {days.map((day) => 
                    <Session key={day.id}
                        idDay={day.id}
                        weekDay={day.weekday}
                        date={day.date}
                        showtimes={day.showtimes} />
                )}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={imgMovie} alt="poster" />
                </div>
                <div>
                    <p>{nameMovie}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
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
const LoadingImg = styled.img`
    width: 60%;
    display: block;
    margin: auto;

    margin-top: 200px;
`