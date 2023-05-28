function Header ({ topic , theme }) {


    return (
        <div className='header'>
            <h1 className='totd' data-theme={theme}>TOPIC OF THE DAY</h1>
            <h1 className='topic' data-theme={theme}>{topic}</h1>
            <h2 className='subtitle' data-theme={theme}>You are Dumber than AI.</h2>
            <h2 className='subtitle' data-theme={theme}>The question is: by how much?</h2>
        </div>
    );
}

export default Header;