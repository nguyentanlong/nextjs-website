
// import { title } from "process";
import styles from "../../page.module.css";
import { Metadata } from "next";

interface Thuoc {
    params: { blogid: String }
}
export const generateMetadata = ({ params }: Thuoc): Metadata => {
    return {
        title: `web nextjs tấn long , ${params?.blogid}`,
    };
};
export default function Home2({ params }: Thuoc) {
    // const params = useParams();
    console.log(">>> Check thuộc tính: >>", params.blogid);
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                Page Use Parameter {params.blogid}
            </main>
            <footer className={styles.footer}>
                footer
            </footer>
        </div>
    );
}
