import style from "./Spiner.module.scss";

export default function Spinner() {
    return (
        <>
            <div className={style.container}>
                <div className={style.spinner}>
                    <div className={style.dot}></div>
                    <div className={style.dot}></div>
                    <div className={style.dot}></div>
                    <div className={style.dot}></div>
                </div>
            </div>
        </>
    );
}
