import React, { useContext } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import GlobalContext from "../../contexts/GlobalContext";

export default function TableReviews({ posts }) {
    const { categories } = useContext(GlobalContext);

    return (
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
                            <TableCell>{categories[post.groupId - 1].name}</TableCell>
                            <TableCell>{post.title}</TableCell>
                            <TableCell>{post.description}</TableCell>
                            <TableCell>{post.image}</TableCell>
                            <TableCell>{post.rating}</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
