import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
    <ContentLoader
        speed={2}
        width={417}
        height={350}
        viewBox="0 0 417 350"
        backgroundColor="#e4e2e2"
        foregroundColor="#d2cbcb"
        {...props}>
        <rect x="607" y="67" rx="3" ry="3" width="410" height="6" />
        <rect x="78" y="24" rx="0" ry="0" width="319" height="44" />
        <circle cx="37" cy="46" r="30" />
        <rect x="16" y="100" rx="0" ry="0" width="385" height="40" />
        <rect x="17" y="156" rx="0" ry="0" width="385" height="96" />
        <rect x="15" y="271" rx="2" ry="2" width="104" height="27" />
        <rect x="298" y="271" rx="0" ry="0" width="104" height="27" />
    </ContentLoader>
);

export default Skeleton;
