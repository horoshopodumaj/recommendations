import { Container } from "@mui/system";
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import CardReviewFull from "../../components/cardReview";
import Header from "../../components/header";
import axios from "axios";
import { URL } from "../../App";
import Footer from "../../components/footer";

export default function ReviewPage() {
    const [post, setPost] = useState([]);
    const [countUserLikes, setCountUserLikes] = useState(0);
    const { id } = useParams();

    console.log(id);

    const getPost = useCallback(async () => {
        try {
            await axios.get(`${URL}/api/review/${id}`).then((response) => {
                setPost(response.data);
                console.log(response.data);
                // setPosts(response.data.reviews.rows);
                // setCountUserLikes(response.data.count);
                // setPostsCount(response.data.reviews.count);
                // setCurrentPage(1);
            });
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        console.log(1);
        const getPost = async () => {
            console.log(2);
            try {
                await axios.get(`${URL}/api/review/${id}`).then((response) => {
                    setPost(response.data);
                    console.log(response.data);
                    // setPosts(response.data.reviews.rows);
                    // setCountUserLikes(response.data.count);
                    // setPostsCount(response.data.reviews.count);
                    // setCurrentPage(1);
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
        console.log(userId);
        try {
            await axios
                .get(`${URL}/api/user/likes/${userId}`)
                .then((response) => setCountUserLikes(response.data.count));
        } catch (error) {
            console.log(error);
        }
    }, []);

    console.log(post);
    return (
        <>
            <Header position={"fixed"} isScrolled={true} boxShadow={"none"} />
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

            <Footer />
        </>
    );
}
