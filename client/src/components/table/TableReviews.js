import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useState } from "react";

import EditReview from "../editReview/EditReview";

export default function TableReviews({ posts, getUserInfoFunc }) {
    const [postId, setPostId] = useState(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setPostId(null);
        setOpen(false);
    };

    const test = (post) => {
        setPostId(post.id);
        handleOpen();
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>work Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>title</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>image</TableCell>
                            <TableCell>rating</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.workName}</TableCell>
                                <TableCell>{post.group.name}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.description}</TableCell>
                                <TableCell>
                                    <img
                                        src={post.image}
                                        style={{ width: "200px" }}
                                        alt={post.image}
                                    />
                                </TableCell>
                                <TableCell>{post.rating}</TableCell>
                                <TableCell>
                                    <Button onClick={() => test(post)}>Edit</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {postId && (
                <EditReview
                    onClose={handleClose}
                    postId={postId}
                    open={open}
                    posts={posts}
                    getUserInfoFunc={getUserInfoFunc}
                />
            )}
        </>
    );
}
