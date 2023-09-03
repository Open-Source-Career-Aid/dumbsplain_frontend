import { useEffect } from "react";
import { set } from "react-ga";

export default function CopyTag({ copying , setCopying , theme }) {

    const [text, setText] = useState(null);

    useEffect(() => {
        if (copying) {
            setText('Copying...');
        }
        else {
            setText('Copied!');
        }
    }, [copying]);

    return (
        <>
            <div className="copytag">
                <p
                className={copying ? '' : 'fade-out'}
                >{text}</p>
            </div>
        </>
    )

}