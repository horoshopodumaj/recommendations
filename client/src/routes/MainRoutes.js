import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import MainPage from "../pages/mainPage";
import AllReviewPage from "../pages/allReviewPage";
import UserPage from "../pages/userPage";
import ReviewPage from "../pages/reviewPage";
import TagsPage from "../pages/tagsPage";
import ContentPage from "../pages/contentPage";
import AdminPage from "../pages/adminPage/AdminPage";
import NotFound from "../pages/notFound/NotFound";
import { selectCategories } from "../store/slices/groupSlice";
import { selectCurrentUser } from "../store/slices/currentUserSlice";
import MainLayout from "../layouts/MainLayout";

function MainRoutes() {
    const categories = useSelector(selectCategories);
    const currentUser = useSelector(selectCurrentUser);

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="" element={<MainPage />} />
                    <Route path="all" element={<AllReviewPage />} />
                    <Route path="profile/:id" element={<UserPage />} />
                    <Route path="review/:id" element={<ReviewPage />} />
                    <Route path="tag/:id" element={<TagsPage />} />
                    {categories.map((category) => (
                        <Route
                            key={category.id}
                            path={`/${category.name.toLowerCase()}`}
                            element={<ContentPage category={category} />}
                        />
                    ))}
                    {currentUser && currentUser.role === "ADMIN" ? (
                        <Route path="admin" element={<AdminPage />} />
                    ) : (
                        <Route path="admin" element={<NotFound />} />
                    )}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
}

export default MainRoutes;
