import { Container } from "@mui/system";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CardReviewFull from "../../components/cardReview";
import axios from "axios";
import { URL } from "../../App";

export default function ReviewPage() {
    const [post, setPost] = useState([]);
    const [countUserLikes, setCountUserLikes] = useState(0);
    const { id } = useParams();

    const getPost = useCallback(async () => {
        try {
            await axios.get(`${URL}/api/review/${id}`).then((response) => {
                setPost(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        const getPost = async () => {
            try {
                await axios.get(`${URL}/api/review/${id}`).then((response) => {
                    setPost(response.data);
                });
            } catch (error) {
                console.log(error);
            }
        };
        console.log(3);
        getPost();
    }, []);

    useEffect(() => {
        getPost();
    }, [getPost]);

    const getUserLikes = useCallback(async (userId) => {
        try {
            await axios
                .get(`${URL}/api/user/likes/${userId}`)
                .then((response) => setCountUserLikes(response.data.count));
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <section className="user_summary">
            <div className="wrapper">
                <Container>
                    {post.id && (
                        <CardReviewFull
                            post={post}
                            countUserLikes={countUserLikes}
                            getUserLikes={getUserLikes}
                        />
                    )}
                </Container>
            </div>
        </section>
    );
}
