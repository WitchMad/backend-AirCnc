import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import { Link } from 'react-router-dom';
import './styles.css';
import api from '../../services/api';

export default function New({ history }){
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [msg, setMsg] = useState('');

    const preview = useMemo(
        () => {
            return thumbnail ? URL.createObjectURL(thumbnail) : null;
        }, [thumbnail]
    );

    async function handleSubmit(event){
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');
        if((thumbnail !== '') && (company !== '') && (techs !== '')){
            data.append('thumbnail', thumbnail);
            data.append('company', company);
            data.append('techs', techs);
            data.append('price', price);

            const response = await api.post('/spots', data, {
                headers:{ user_id }
            });

            console.log(response);

            history.push('/dashboard');
        }else{
            setMsg('Há campos vazios!');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{backgroundImage: `url(${preview})`}}
            className={thumbnail ? "has-thumbnail" : ""}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>
            <p className="msg">{msg}</p>
            <label htmlFor="company">EMPRESA *</label>
            <input 
            type="text"
            placeholder="Sua empresa incrível"  
            id="company"
            value={company}
            onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
            type="text"
            placeholder="Quais tecnologias usam"  
            id="techs"
            value={techs}
            onChange={event => setTechs(event.target.value)}
            /> 

            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
            <input 
            type="text"
            placeholder="Valor cobrado por dia"  
            id="price"
            value={price}
            onChange={event => setPrice(event.target.value)}
            />
            <button type="submit" className="btn">Cadastrar</button>
            <Link to="/dashboard">
            <button className="btn-secondary">Voltar</button>
            </Link>
        </form>
    )
}