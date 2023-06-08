function Header ({ topic , theme }) {


    return (
        <div className='header'>
            <h1 className='totd' data-theme={theme}>TOPIC OF THE DAY</h1>
            <h1 className='topic' data-theme={theme}
            style={{
                textAlign: 'center',
            }}
            >
                {/* {topic} */}
                Something for you to think about.
            </h1>
            <h2 className='subtitle' data-theme={theme}>You are dumber than <span style={{color:'#8CA8FF', fontSize:'1em', padding: '0', fontWeight:'700'}}>AI</span>.</h2>
            <h2 className='subtitle' data-theme={theme}
            style={{
                marginBottom: '1.675em',
            }}
            >The question is: by how much?</h2>
        </div>
    );
}

export default Header;