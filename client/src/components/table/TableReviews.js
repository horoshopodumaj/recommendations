import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/slices/groupSlice";

export default function TableReviews({ posts }) {
    const categories = useSelector(selectCategories);

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
                            <TableCell>
                                <img src={post.image} style={{ width: "200px" }} alt={post.image} />
                            </TableCell>
                            <TableCell>{post.rating}</TableCell>
                            <TableCell>
                                <Button>Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
