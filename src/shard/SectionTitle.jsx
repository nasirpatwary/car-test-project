const SectionTitle = ({subTitle, headTitle}) => {
    return (
        <div className="text-center my-8 space-y-1.5">
            <p className="text-black font-semibold">---- {subTitle} ----</p>
            <h2 className="text-2xl font-semibold text-shadow text-black">{headTitle}</h2>
        </div>
    );
};
export default SectionTitle;
