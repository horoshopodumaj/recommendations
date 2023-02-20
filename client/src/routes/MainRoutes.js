import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import MainPage from "../pages/mainPage";
import { selectCategories } from "../store/slices/groupSlice";
import { selectCurrentUser } from "../store/slices/currentUserSlice";
import MainLayout from "../layouts/MainLayout";
import Loadable from "react-loadable";
import Spinner from "../components/spiner/Spiner";

function MainRoutes() {
    const categories = useSelector(selectCategories);
    const currentUser = useSelector(selectCurrentUser);

    const UserPage = Loadable({
        loader: () => import(/* webpackChunkName: "UserPage" */ "../pages/userPage"),
        loading: () => <Spinner />,
    });

    const AllReviewPage = Loadable({
        loader: () => import(/* webpackChunkName: "AllReviewPage" */ "../pages/allReviewPage"),
        loading: () => <Spinner />,
    });

    const ReviewPage = Loadable({
        loader: () => import(/* webpackChunkName: "ReviewPage" */ "../pages/reviewPage"),
        loading: () => <Spinner />,
    });

    const TagsPage = Loadable({
        loader: () => import(/* webpackChunkName: "TagsPage" */ "../pages/tagsPage"),
        loading: () => <Spinner />,
    });

    const ContentPage = Loadable({
        loader: () => import(/* webpackChunkName: "ContentPage" */ "../pages/contentPage"),
        loading: () => <Spinner />,
    });

    const AdminPage = Loadable({
        loader: () => import(/* webpackChunkName: "AdminPage" */ "../pages/adminPage/AdminPage"),
        loading: () => <Spinner />,
    });

    const NotFound = Loadable({
        loader: () => import(/* webpackChunkName: "NotFound" */ "../pages/notFound/NotFound"),
        loading: () => <Spinner />,
    });

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
