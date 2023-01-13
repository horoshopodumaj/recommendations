import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonTag = (props) => (
    <ContentLoader
        speed={2}
        width={70}
        height={30}
        viewBox="0 0 70 30"
        backgroundColor="#e4e2e2"
        foregroundColor="#d2cbcb"
        {...props}>
        <rect x="607" y="67" rx="3" ry="3" width="410" height="6" />
        <rect x="50" y="71" rx="0" ry="0" width="319" height="44" />
        <rect x="10" y="5" rx="0" ry="0" width="50" height="20" />
    </ContentLoader>
);

export default SkeletonTag;
