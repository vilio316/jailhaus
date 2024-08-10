type seedStyle = {
    phrase: string,
    service: string,
}

export default function Seeds(props : any){
    let optimus = props.array 
    return(
        <>
            <div>
                <h2>Seed Phrases</h2>
                {optimus.map((item : any[]) => (
                    item.map((seedVal : seedStyle) => (
                        <div key={seedVal.service}>
                            <p>{seedVal.service}</p>
                            <p>{seedVal.phrase}</p>
                        </div>
                    ))
                ))}
            </div>
        </>
    )
}