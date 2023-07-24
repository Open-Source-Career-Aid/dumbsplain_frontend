import EmojiSlider from "../Components/EmojiSlide";
import PlayerProgress from "../Components/PlayerProgress";

const Test = () => {
    return (
        <div style={{
            overflow: 'visible',
        }}>
            <PlayerProgress
            dq = {3.4}
            score = {4}
             />
            <EmojiSlider />
            <p>
                This is a test page to test out components
            </p>
        </div>

    );
    }

export default Test;