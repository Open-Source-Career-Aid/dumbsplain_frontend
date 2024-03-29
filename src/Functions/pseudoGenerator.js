
export default async function pseudoGenerator(text, setStateText, TIME, setLoading, chunksize=4 ) {

    // if setLoading isn't passed, set it to a function that does nothing
    if (!setLoading) {
        setLoading = () => {}
    }
    else {
        setLoading(true)
    }

    let typetext = ''

    // split text into chunks of 4-6 characters
    const splitText = (text) => {
        const textArray = text.split('')
        const textChunks = []
        let chunk = ''
        textArray.forEach((letter, index) => {
            chunk += letter
            if (index % chunksize === 0 && index !== 0) {
                textChunks.push(chunk)
                chunk = ''
            }
        })
        textChunks.push(chunk)
        return textChunks
    }

    const chunks = splitText(text)

    async function updatestate(text, setStateText) {
        setStateText(text)
        await new Promise(r => setTimeout(r, Math.random()*TIME*1000));
    }

    for (let i = 0; i < chunks.length; i++) {
        typetext = typetext + chunks[i]
        await updatestate(typetext, setStateText)
    }

    setLoading(false)
    
}