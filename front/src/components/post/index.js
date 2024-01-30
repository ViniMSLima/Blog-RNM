import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Container
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss';
import axios from 'axios';

export default function Post() {
    var [artigos, setArtigos] = useState([]);

    async function getPosts() {
        const res = await axios.get('http://localhost:8080/api/article')
        setArtigos(res.data);
    }

    async function handleClick(id) {
        try {
            const has = await axios.post(`http://localhost:8080/api/article/like`, {
                articleId: id,
                userId: "65b7bbbd3deb3190b3ae76b6",

            })
            if(has.data.message === "Can't like twice")
            {
                await axios.post(`http://localhost:8080/api/article/dislike`, {
                    articleId: id,
                    userId: "65b7bbbd3deb3190b3ae76b6",   
                })
            }

        }

        catch (error) {
            console.log(error)
        } 
        
        getPosts();
    }

    useEffect(() => {
        getPosts();
    }, [])

    const RenderPosts = () => {
        return artigos.map((artigo) => {
            return (
                <Card key={artigo._id} className={styles.card} >
                    <Card.Title className={styles.card__title}>
                        {artigo.title}
                    </Card.Title>
                    <Card.Body className={styles.card__body}>
                        <Card.Text className={styles.card__body__article}>{artigo.text}</Card.Text>
                        <div className='d-flex align-items-center '>
                            {artigo.likes}<Button variant='light' onClick={() => handleClick(artigo._id)}><AiOutlineLike /></Button>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }
    return (
        <Container>
            <RenderPosts />
        </Container>
    )
}