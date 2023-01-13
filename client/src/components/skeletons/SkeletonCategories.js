import ContentLoader from "react-content-loader";

const SkeletonCategories = (props) => (
    <ContentLoader
        speed={2}
        width={300}
        height={65}
        viewBox="0 0 300 65"
        backgroundColor="#f3f3f3"
        foregroundColor="#e3e3e3"
        {...props}>
        <rect x="607" y="67" rx="3" ry="3" width="410" height="6" />
        <rect x="50" y="71" rx="0" ry="0" width="319" height="44" />
        <rect x="8" y="15" rx="0" ry="0" width="280" height="25" />
    </ContentLoader>
);

export default SkeletonCategories;
