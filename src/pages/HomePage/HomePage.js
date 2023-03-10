import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios";
import loading from "../../assets/ATB3o.gif"
import Poster from "../../components/Poster"

export default function HomePage() {
   
   const [movie, setMovie] = useState([])

   useEffect(() => {
        const promisse = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies");

        promisse.then(resposta => {
            setMovie(resposta.data)
        })
        promisse.catch(erro => {
            alert("Erro no servidor! Por favor aguarde!")
        })
    }, [])

    if(movie.length === 0){
        return <LoadingImg src={loading} />
    }
   
    return (
        <PageContainer>
            Selecione o filme
            <ListContainer >
               {movie.map(m => <Poster key={m.id} id={m.id} posterURL={m.posterURL} />)}
            </ListContainer>
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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`


const LoadingImg = styled.img `
    width: 60%;
    display: block;
    margin: auto;

    margin-top: 200px;
`