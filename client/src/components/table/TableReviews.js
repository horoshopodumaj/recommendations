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
import { FormattedMessage } from "react-intl";

import EditReview from "../editReview/EditReview";

export default function TableReviews({ posts, getUserInfoFunc, editOpen }) {
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
            <Button variant="outlined" sx={{ float: "right" }} onClick={editOpen}>
                <FormattedMessage id="close" />
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">id</TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="tableWorkName" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="category" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="tableTitle" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="tableDesc" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="tableImage" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="tableRating" />
                            </TableCell>
                            <TableCell align="center">
                                <FormattedMessage id="edit" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.workName}</TableCell>
                                <TableCell>{post.group.name.toUpperCase()}</TableCell>
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
                                    <Button onClick={() => test(post)}>
                                        <FormattedMessage id="tableEdit" />
                                    </Button>
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
